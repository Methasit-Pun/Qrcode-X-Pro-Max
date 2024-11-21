const form = document.getElementById('qr-form');
const qrOutput = document.getElementById('qr-output');

const generateQRCodes = async (links) => {
    const response = await fetch('http://localhost:3000/generate', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ links }),
    });

    const result = await response.json();
    if (result.success) {
        displayQRCodes(result.qrCodes);
    } else {
        alert('QR Code generation failed. Please try again.');
    }
};

const displayQRCodes = (qrCodes) => {
    qrOutput.innerHTML = ''; // Clear previous results

    qrCodes.forEach((qr) => {
        const qrDiv = document.createElement('div');
        const qrImage = document.createElement('img');
        const qrText = document.createElement('p');

        qrImage.src = qr.url;
        qrImage.alt = 'QR Code';
        qrText.textContent = qr.link;

        qrDiv.appendChild(qrImage);
        qrDiv.appendChild(qrText);
        qrOutput.appendChild(qrDiv);
    });
};

form.addEventListener('submit', (e) => {
    e.preventDefault();

    const links = document.getElementById('links').value.split('\n');
    generateQRCodes(links);
});
