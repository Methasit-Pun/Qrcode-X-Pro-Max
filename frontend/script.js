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
        const qrDiv = document.createElement('div'); // Create a div for each QR code
        qrDiv.classList.add('qr-container'); // Assign the .qr-container class to this div

        const qrImage = document.createElement('img');
        qrImage.src = qr.url;
        qrImage.alt = 'QR Code';

        const qrLink = document.createElement('a');
        qrLink.href = qr.link;
        qrLink.target = '_blank'; // Open the link in a new tab
        qrLink.textContent = qr.link;

        qrDiv.appendChild(qrImage); // Add the QR code image
        qrDiv.appendChild(qrLink); // Add the hyperlink
        qrOutput.appendChild(qrDiv); // Add the container to the output section
    });
};

form.addEventListener('submit', (e) => {
    e.preventDefault();

    const links = document.getElementById('links').value.split('\n');
    generateQRCodes(links);
});
