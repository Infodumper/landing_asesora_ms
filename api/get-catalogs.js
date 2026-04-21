const { google } = require('googleapis');

/**
 * Skill: catalog_manager
 * Este endpoint se encarga de consultar Google Drive, listar los archivos de una carpeta
 * y devolver el último catálogo disponible para cada línea de producto.
 */
module.exports = async (req, res) => {
  // Configuración desde variables de entorno (Vercel)
  const FOLDER_ID = process.env.GOOGLE_DRIVE_FOLDER_ID;
  const SERVICE_ACCOUNT = process.env.GOOGLE_SERVICE_ACCOUNT_JSON;

  if (!FOLDER_ID || !SERVICE_ACCOUNT) {
    return res.status(500).json({ 
      error: 'Faltan variables de entorno: GOOGLE_DRIVE_FOLDER_ID o GOOGLE_SERVICE_ACCOUNT_JSON' 
    });
  }

  try {
    const credentials = JSON.parse(SERVICE_ACCOUNT);
    const auth = new google.auth.GoogleAuth({
      credentials,
      scopes: ['https://www.googleapis.com/auth/drive.readonly'],
    });

    const drive = google.drive({ version: 'v3', auth });

    // 1. Listar archivos de la carpeta principal
    let response = await drive.files.list({
      q: `'${FOLDER_ID}' in parents and trashed = false`,
      fields: 'files(id, name, webContentLink, webViewLink, thumbnailLink, modifiedTime, mimeType)',
      orderBy: 'modifiedTime desc',
    });

    let files = response.data.files || [];
    const detectedFolders = [];

    // Función para escanear carpetas recursivamente (hasta 2 niveles)
    async function scanFolder(folderId, folderPath = "", depth = 0) {
      if (depth > 2) return;

      const subFoldersQuery = await drive.files.list({
        q: `'${folderId}' in parents and mimeType = 'application/vnd.google-apps.folder' and trashed = false`,
        fields: 'files(id, name)',
      });

      for (const folder of (subFoldersQuery.data.files || [])) {
        const normalizedName = folder.name.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").trim();
        detectedFolders.push(folderPath + folder.name);

        const subResponse = await drive.files.list({
          q: `'${folder.id}' in parents and trashed = false`,
          fields: 'files(id, name, webContentLink, webViewLink, thumbnailLink, modifiedTime, mimeType)',
          orderBy: 'modifiedTime desc',
        });

        if (subResponse.data.files) {
          const enrichedFiles = subResponse.data.files.map(f => ({ 
            ...f, 
            folderName: normalizedName 
          }));
          files = [...files, ...enrichedFiles];
        }

        // Si esta carpeta no es una de las "finales", buscamos dentro por si están anidadas
        if (normalizedName !== 'maquillaje' && normalizedName !== 'peluqueria') {
          await scanFolder(folder.id, folderPath + folder.name + "/", depth + 1);
        }
      }
    }

    await scanFolder(FOLDER_ID);

    const latestByLine = {};
    const carouselImages = [];
    const maquillajeImages = [];
    const peluqueriaImages = [];

    files.forEach(file => {
      // Normalizamos el nombre: minúsculas y quitar acentos
      const fileName = file.name.toLowerCase()
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "");
      
      const isPdf = file.mimeType === 'application/pdf';
      const isImg = file.mimeType.startsWith('image/');
      const fileThumb = file.thumbnailLink ? file.thumbnailLink.replace(/=s\d+/, '=s1000') : `https://drive.google.com/thumbnail?id=${file.id}&sz=w1000`;

      // Maquillaje (Subcarpeta)
      if (file.folderName === 'maquillaje' && isImg) {
          maquillajeImages.push({
              name: fileName,
              url: fileThumb,
              order: parseInt(fileName.match(/\d+/) || [99])[0]
          });
          return;
      }

      // Peluquería (Subcarpeta)
      if (file.folderName === 'peluqueria' && isImg) {
          peluqueriaImages.push({
              name: fileName,
              url: fileThumb,
              order: parseInt(fileName.match(/\d+/) || [99])[0]
          });
          return;
      }

      // Carrusel
      if (fileName.includes('carousel') && isImg) {
          carouselImages.push({
              name: fileName,
              url: fileThumb,
              order: parseInt(fileName.match(/\d+/) || [99])[0]
          });
          return;
      }

      let category = 'otros';
      if (fileName.includes('natura'))                 category = 'natura';
      else if (fileName.includes('avon'))              category = 'avon';
      else if (fileName.includes('mary') || fileName.includes('kay')) category = 'marykay';
      else if (fileName.includes('bagues'))            category = 'bagues';
      else if (fileName.includes('millanel'))          category = 'millanel';
      else if (fileName.includes('joya') || fileName.includes('perla') || fileName.includes('negra')) category = 'joyas';
      else if (fileName.includes('construccion'))      category = 'construccion';
      else if (fileName.includes('belleza') || fileName.includes('perfu')) category = 'belleza';

      if (!latestByLine[category]) {
        latestByLine[category] = { modified: file.modifiedTime };
      }

      if (isPdf && !latestByLine[category].viewLink) {
        latestByLine[category].id = file.id;
        latestByLine[category].name = file.name;
        latestByLine[category].viewLink = file.webViewLink;
        latestByLine[category].downloadLink = file.webContentLink;
      }

      if (isImg) {
        latestByLine[category].thumbnail = fileThumb;
      } else if (isPdf && !latestByLine[category].thumbnail) {
        latestByLine[category].thumbnail = fileThumb;
      }
    });

    // Ordenar imágenes
    carouselImages.sort((a, b) => a.order - b.order);
    maquillajeImages.sort((a, b) => a.order - b.order);
    peluqueriaImages.sort((a, b) => a.order - b.order);

    // Cachear respuesta por 5 minutos para optimizar carga
    res.setHeader('Cache-Control', 's-maxage=300, stale-while-revalidate');
    res.status(200).json({
      status: 'success',
      data: {
          catalogs: latestByLine,
          carousel: carouselImages,
          maquillaje: maquillajeImages,
          peluqueria: peluqueriaImages
      }
    });

  } catch (error) {
    console.error('[DRIVE_ERROR]', error);
    res.status(500).json({ 
      status: 'error', 
      message: 'Error al conectar con Google Drive API',
      details: error.message 
    });
  }
};
