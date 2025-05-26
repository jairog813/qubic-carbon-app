const express = require('express');
const cors = require('cors');
const axios = require('axios');
const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

// Skyscanner API setup (replace with your RapidAPI key)
const SKYSCANNER_API_KEY = 'your-real-rapidapi-key';

// Endpoint for live carbon credit price (placeholder)
app.get('/api/carbon-price', async (req, res) => {
    try {
        // Placeholder until you sign up for a real API
        res.json({ price: 15 }); // Mock price: $15/tonne
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch carbon price' });
    }
});

// Endpoint for live airline ticket price (NYC to London)
app.get('/api/flight-price', async (req, res) => {
    try {
        const response = await axios.get('https://skyscanner-skyscanner-flight-search-v1.p.rapidapi.com/apiservices/browsequotes/v1.0/US/USD/en-US/JFK-sky/LHR-sky/anytime', {
            headers: {
                'X-RapidAPI-Key': SKYSCANNER_API_KEY,
                'X-RapidAPI-Host': 'skyscanner-skyscanner-flight-search-v1.p.rapidapi.com'
            }
        });
        const price = response.data.Quotes[0]?.MinPrice || 450; // Fallback to $450 if API fails
        res.json({ route: 'NYC to London', price: price });
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch flight price' });
    }
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});