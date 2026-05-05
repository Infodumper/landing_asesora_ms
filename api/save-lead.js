/**
 * api/save-lead.js — Vercel Serverless Function
 * Recibe leads de la web y los procesa (Email, Google Sheets, etc.)
 */

module.exports = async (req, res) => {
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Método no permitido' });
    }

    const { name, contact, message, source } = req.body;

    if (!name || !contact) {
        return res.status(400).json({ error: 'Nombre y contacto son requeridos' });
    }

    try {
        console.log('[LEAD_RECEIVED]', { name, contact, message, source, date: new Date().toISOString() });

        /**
         * AQUÍ: Podríamos integrar con:
         * 1. Google Sheets (usando googleapis, ya configurado en el proyecto)
         * 2. Email (usando Nodemailer o SendGrid)
         * 3. Slack/Discord Webhook
         */

        // Por ahora, simulamos éxito para que el usuario pruebe el flujo "invisible"
        return res.status(200).json({ 
            status: 'success', 
            message: 'Lead capturado correctamente' 
        });

    } catch (error) {
        console.error('[LEAD_ERROR]', error);
        return res.status(500).json({ error: 'Error interno al procesar el lead' });
    }
};
