// Selectors
const form = document.getElementById('qr-form');
const qrOutput = document.getElementById('qr-output');

// Function to create QR codes
const generateQRCodes = (links) => {
    qrOutput.innerHTML = ''; // Clear previous results

    links.forEach((link, index) => {
        if (link.trim() === '') return; // Skip empty lines

        const qrCodeDiv = document.createElement('div');
        const qrCanvas = document.createElement('canvas');
        const qrText = document.createElement('p');
        qrText.textContent = `QR ${index + 1}`;

        // Generate QR code
        const qr = new QRious({
            element: qrCanvas,
            value: link.trim(),
            size: 150,
        });

        qrCodeDiv.appendChild(qrCanvas);
        qrCodeDiv.appendChild(qrText);
        qrOutput.appendChild(qrCodeDiv);
    });
};

// Event Listener
form.addEventListener('submit', (e) => {
    e.preventDefault();

    const links = document.getElementById('links').value.split('\n');
    generateQRCodes(links);
});
