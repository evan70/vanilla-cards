// Handle form submissions
document.querySelectorAll('form').forEach(form => {
    form.addEventListener('submit', (event) => {
        event.preventDefault();
        alert('Form submitted!');
    });
});
