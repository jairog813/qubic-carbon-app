app.get('/api/flight-price', async (req, res) => {
    try {
        const response = await axios.get('https://kiwi-com.p.rapidapi.com/flights/search', {
            headers: {
                'X-RapidAPI-Key': KIWI_API_KEY,
                'X-RapidAPI-Host': 'kiwi-com.p.rapidapi.com'
            },
            params: {
                from: 'JFK',
                to: 'LHR',
                departure: '2025-05-27',
                adults: 1,
                currency: 'USD'
            }
        });
        console.log(response.data); // Log the response for debugging
        const flight = response.data.results ? response.data.results[0] : response.data.data[0];
        res.json({ route: 'NYC to London', price: flight.price });
    } catch (error) {
        console.error(error.response ? error.response.data : error.message);
        res.status(500).json({ error: 'Failed to fetch flight price' });
    }
});