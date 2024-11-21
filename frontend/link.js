const specialMessageLink = document.getElementById('features');

// Add a hover event listener
specialMessageLink.addEventListener('mouseover', () => {
    console.log('Hint: Visit the FAQ for detailed answers!'); // Logs a message to the console
});

// Add a click event listener for additional action
specialMessageLink.addEventListener('click', (event) => {
    alert('Redirecting to our FAQ page for more information.');
});
