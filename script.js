// script.js

// Form Handling
function handleSubmit(event) {
    event.preventDefault(); // Prevent default form submission

    // Get form data
    const formData = new FormData(event.target);
    const data = Object.fromEntries(formData);

    // Display form data in console (for debug purposes)
    console.log(data);

    // Send email notification
    sendEmailNotification(data);
}

// Email Notification
function sendEmailNotification(data) {
    // Here you would typically integrate with an email service.
    console.log('Email would be sent with the following data:', data);
}

// Attach handler to form
const form = document.querySelector('form');
if (form) {
    form.addEventListener('submit', handleSubmit);
} else {
    console.error('Form not found.');
}