const express = require('express');
const bodyParser = require('body-parser');
const axios = require('axios');

const app = express();
const PORT = process.env.PORT || 3000;

// Parse incoming request body
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Firebase Database URL (replace this with your actual URL)
const FIREBASE_URL = 'https://your-project-id.firebaseio.com/your-data-path.json';

// Endpoint to receive SIM800L data
app.post('/post-data', async (req, res) => {
    try {
        console.log('Received data:', req.body);

        // Forward the data to Firebase
        const response = await axios.post(FIREBASE_URL, req.body);

        console.log('Forwarded to Firebase:', response.data);

        res.status(200).send('Data forwarded to Firebase.');
    } catch (error) {
        console.error('Error forwarding to Firebase:', error.message);
        res.status(500).send('Error forwarding to Firebase.');
    }
});

// Start server
app.listen(PORT, () => {
    console.log(`Proxy server listening on port ${PORT}`);
});