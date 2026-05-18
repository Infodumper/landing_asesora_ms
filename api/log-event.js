const { google } = require('googleapis');

/**
 * api/log-event.js
 * Vercel Serverless Function
 * Registra eventos individuales del carrito (telemetría) en una pestaña "Eventos" de Google Sheets.
 */

module.exports = async (req, res) => {
    // Cabeceras CORS
    res.setHeader('Access-Control-Allow-Credentials', true);
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
    res.setHeader(
        'Access-Control-Allow-Headers',
        'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
    );

    if (req.method === 'OPTIONS') {
        return res.status(200).end();
    }

    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Método no permitido' });
    }

    let body = req.body;
    if (typeof body === 'string') {
        try {
            body = JSON.parse(body);
        } catch (e) {
            console.error('[TELEMETRY] Error parsing text body:', e.message);
            return res.status(400).json({ error: 'Payload malformado' });
        }
    }

    const { clientId, eventType, productCode, productName, price, qty, origin } = body || {};

    if (!clientId || !eventType) {
        return res.status(400).json({ error: 'Campos requeridos faltantes (clientId, eventType)' });
    }

    const SERVICE_ACCOUNT = process.env.GOOGLE_SERVICE_ACCOUNT_JSON;
    const SPREADSHEET_ID = process.env.GOOGLE_SPREADSHEET_ID;

    try {
        const timestamp = new Date().toLocaleString('es-AR', { timeZone: 'America/Argentina/Buenos_Aires' });
        
        // Detección de IP y ubicación desde cabeceras de Vercel
        const ip = req.headers['x-real-ip'] || req.headers['x-forwarded-for'] || 'IP Desconocida';
        const city = req.headers['x-vercel-ip-city'] ? decodeURIComponent(req.headers['x-vercel-ip-city']) : '';
        const country = req.headers['x-vercel-ip-country'] || '';
        const location = city ? `${ip} (${city}, ${country})` : ip;

        if (SERVICE_ACCOUNT) {
            try {
                const credentials = JSON.parse(SERVICE_ACCOUNT);
                const auth = new google.auth.GoogleAuth({
                    credentials,
                    scopes: ['https://www.googleapis.com/auth/spreadsheets'],
                });
                const sheets = google.sheets({ version: 'v4', auth });

                // 1. Obtener información de las hojas existentes
                const spreadsheet = await sheets.spreadsheets.get({ spreadsheetId: SPREADSHEET_ID });
                const sheetsList = spreadsheet.data.sheets || [];
                const sheetExists = sheetsList.some(s => s.properties.title === 'Eventos');

                // 2. Crear la pestaña "Eventos" dinámicamente si no existe
                if (!sheetExists) {
                    await sheets.spreadsheets.batchUpdate({
                        spreadsheetId: SPREADSHEET_ID,
                        requestBody: {
                            requests: [
                                {
                                    addSheet: {
                                        properties: {
                                            title: 'Eventos',
                                            gridProperties: {
                                                frozenRowCount: 1
                                            }
                                        }
                                    }
                                }
                            ]
                        }
                    });

                    // Agregar las cabeceras a la pestaña recién creada
                    await sheets.spreadsheets.values.update({
                        spreadsheetId: SPREADSHEET_ID,
                        range: 'Eventos!A1:I1',
                        valueInputOption: 'USER_ENTERED',
                        requestBody: {
                            values: [[
                                'Fecha y Hora',
                                'ID Cliente',
                                'IP / Ubicación',
                                'Tipo de Evento',
                                'Código Producto',
                                'Nombre Producto',
                                'Cantidad / Delta',
                                'Precio Unitario',
                                'Página de Origen'
                            ]]
                        }
                    });
                    console.log('[TELEMETRY_SHEET] Creada pestaña "Eventos" con cabeceras.');
                }

                // 3. Añadir la fila con los datos de telemetría del evento
                await sheets.spreadsheets.values.append({
                    spreadsheetId: SPREADSHEET_ID,
                    range: 'Eventos!A:I',
                    valueInputOption: 'USER_ENTERED',
                    requestBody: {
                        values: [[
                            timestamp,
                            clientId,
                            location,
                            eventType,
                            productCode || 'N/A',
                            productName || 'N/A',
                            qty !== undefined && qty !== null ? qty : 'N/A',
                            price !== undefined && price !== null ? `$ ${price.toLocaleString('es-AR')}` : 'N/A',
                            origin || 'N/A'
                        ]],
                    },
                });
                console.log(`[TELEMETRY_EVENT] Registrado evento "${eventType}" con éxito en Sheets.`);
            } catch (err) {
                console.error('[SHEETS_ERROR_TELEMETRY]', err.message);
                return res.status(500).json({ error: 'Error de Drive: ' + err.message });
            }
        } else {
            console.warn('[TELEMETRY_SAVE] No se encontró GOOGLE_SERVICE_ACCOUNT_JSON.');
        }

        return res.status(200).json({ status: 'success' });
    } catch (error) {
        console.error('[TELEMETRY_ERROR]', error);
        return res.status(500).json({ error: 'Error interno' });
    }
};
