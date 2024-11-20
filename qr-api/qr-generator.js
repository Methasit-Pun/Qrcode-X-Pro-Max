const QRCode = require('qrcode');
const path = require('path');
const fs = require('fs');

const downloadsDir = path.join(__dirname, '../downloads');

// Ensure downloads directory exists
if (!fs.existsSync(downloadsDir)) {
    fs.mkdirSync(downloadsDir);
}

const generateQRCodes = async (links) => {
    const qrCodes = [];

    for (let i = 0; i < links.length; i++) {
        const link = links[i].trim();
        if (link === '') continue; // Skip empty links

        const filename = `qr-code-${i + 1}.png`;
        const filepath = path.join(downloadsDir, filename);

        await QRCode.toFile(filepath, link, {
            width: 300,
            margin: 2,
        });

        qrCodes.push({
            link,
            filename,
            url: `http://localhost:3000/${filename}`, // Serve files statically
        });
    }

    return qrCodes;
};

module.exports = { generateQRCodes };
