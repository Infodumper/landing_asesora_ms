const { google } = require('googleapis');

/**
 * api/save-lead.js — Vercel Serverless Function
 * Recibe leads de la web y los guarda en Google Sheets y notifica vía Telegram.
 */

module.exports = async (req, res) => {
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Método no permitido' });
    }

    const { name, contact, message, source } = req.body;

    if (!name || !contact) {
        return res.status(400).json({ error: 'Nombre y contacto son requeridos' });
    }

    const SERVICE_ACCOUNT = process.env.GOOGLE_SERVICE_ACCOUNT_JSON;
    const SPREADSHEET_ID = process.env.GOOGLE_SHEETS_ID;

    try {
        const timestamp = new Date().toLocaleString('es-AR', { timeZone: 'America/Argentina/Buenos_Aires' });
        console.log('[LEAD_RECEIVED]', { name, contact, message, source, timestamp });

        // 1. Guardar en Google Sheets (si está configurado)
        if (SERVICE_ACCOUNT && SPREADSHEET_ID) {
            try {
                const credentials = JSON.parse(SERVICE_ACCOUNT);
                const auth = new google.auth.GoogleAuth({
                    credentials,
                    scopes: ['https://www.googleapis.com/auth/spreadsheets'],
                });
                const sheets = google.sheets({ version: 'v4', auth });

                await sheets.spreadsheets.values.append({
                    spreadsheetId: SPREADSHEET_ID,
                    range: 'Leads!A:E',
                    valueInputOption: 'USER_ENTERED',
                    requestBody: {
                        values: [[timestamp, name, contact, source, message]],
                    },
                });
                console.log('[SHEETS_SUCCESS]');
            } catch (err) {
                console.error('[SHEETS_ERROR]', err.message);
            }
        }

        return res.status(200).json({ 
            status: 'success', 
            message: 'Lead capturado correctamente' 
        });

    } catch (error) {
        console.error('[LEAD_ERROR]', error);
        return res.status(500).json({ error: 'Error interno al procesar el lead' });
    }
};
