const { google } = require('googleapis');

/**
 * api/save-cart.js
 * Vercel Serverless Function
 * Guarda el estado del carrito en Google Sheets al cerrarse el modal.
 */

module.exports = async (req, res) => {
    // CORS headers for local testing via Live Server (if needed)
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

    const { items, total, origin } = req.body;

    const SERVICE_ACCOUNT = process.env.GOOGLE_SERVICE_ACCOUNT_JSON;
    const SPREADSHEET_ID = '1HBI5Ter9wrzfhmveu9kWGZsFDFzdS7aIx5E4scVC_A8';

    try {
        const timestamp = new Date().toLocaleString('es-AR', { timeZone: 'America/Argentina/Buenos_Aires' });
        
        let details = items.map(i => `${i.qty}x ${i.name} (${i.code}) [$${(i.price * i.qty).toLocaleString('es-AR')}]`).join('\n');
        
        if (items.length === 0) {
            details = 'Carrito vaciado / Sin ítems';
        }
        
        if (SERVICE_ACCOUNT) {
            try {
                const credentials = JSON.parse(SERVICE_ACCOUNT);
                const auth = new google.auth.GoogleAuth({
                    credentials,
                    scopes: ['https://www.googleapis.com/auth/spreadsheets'],
                });
                const sheets = google.sheets({ version: 'v4', auth });

                await sheets.spreadsheets.values.append({
                    spreadsheetId: SPREADSHEET_ID,
                    range: 'A:E',
                    valueInputOption: 'USER_ENTERED',
                    requestBody: {
                        values: [[timestamp, items.length, `$ ${total.toLocaleString('es-AR')}`, details, origin]],
                    },
                });
                console.log('[CART_SAVED] Successfully appended to sheet.');
            } catch (err) {
                console.error('[SHEETS_ERROR_CART]', err.message);
            }
        }

        return res.status(200).json({ status: 'success' });
    } catch (error) {
        console.error('[CART_ERROR]', error);
        return res.status(500).json({ error: 'Error interno' });
    }
};
