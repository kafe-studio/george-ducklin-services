const express = require('express');
const nodemailer = require('nodemailer');
const { google } = require('googleapis');

const router = express.Router();

// Configure your Google Calendar API
const calendar = google.calendar('v3');

// Endpoint to handle reservation submissions
router.post('/reservations', (req, res) => {
    const reservation = req.body;
    // Logic to save reservation in the database goes here

    // Sending confirmation email
    sendConfirmationEmail(reservation.email, reservation)
        .then(() => res.status(201).send('Reservation created and email sent.'))
        .catch((error) => res.status(500).send('Error sending email:', error));
});

// Function to send confirmation email
const sendConfirmationEmail = (email, reservation) => {
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'your-email@gmail.com', // Your email
            pass: 'your-email-password' // Your email password
        }
    });

    const mailOptions = {
        from: 'your-email@gmail.com',
        to: email,
        subject: 'Reservation Confirmation',
        text: `Your reservation for ${reservation.date} at ${reservation.time} has been confirmed!`
    };

    return transporter.sendMail(mailOptions);
};

// Endpoint to create a Google Calendar event for the reservation
router.post('/calendar', (req, res) => {
    const event = {
        summary: 'Reservation',
        description: 'Reservation details',
        start: {
            dateTime: req.body.startTime,
            timeZone: 'UTC'
        },
        end: {
            dateTime: req.body.endTime,
            timeZone: 'UTC'
        },
    };

    calendar.events.insert({
        auth: 'YOUR_GOOGLE_CALENDAR_API_KEY', // Your Google Calendar API key
        calendarId: 'primary',
        resource: event,
    }, (err, event) => {
        if (err) {
            return res.status(500).send('Error creating calendar event: ' + err);
        }
        res.status(200).send('Calendar event created: ' + event.data.htmlLink);
    });
});

module.exports = router;