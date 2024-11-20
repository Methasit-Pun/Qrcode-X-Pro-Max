const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const qrGenerator = require('./qr-generator');
const path = require('path');

const app = express();
const PORT = 3000;

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, '../downloads')));

// Routes
app.post('/generate', async (req, res) => {
    const { links } = req.body;

    if (!links || !Array.isArray(links)) {
        return res.status(400).json({ error: 'Invalid input. Provide an array of links.' });
    }

    try {
        const qrCodes = await qrGenerator.generateQRCodes(links);
        res.status(200).json({ success: true, qrCodes });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'QR Code generation failed.' });
    }
});

// Start Server
app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});
