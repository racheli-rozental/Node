const express = require('express');
const axios = require('axios');  
const app = express();
const port = 3000;

const RENDER_API_TOKEN = 'rnd_tcaEZoVnJeUhNZnwFDFSwWkk6ZLd';

app.get('/apps', async (req, res) => {
    try {
        const response = await axios.get('https://api.render.com/v1/services?includePreviews=true&limit=20', {
            headers: {
                'authorization': `Bearer ${RENDER_API_TOKEN}`,
                'Accept': 'application/json'
            }
        });
        const projectNames = response.data.map(service => service.service.name);  
        
        res.json(projectNames);  
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error fetching projects from Render' });
    }
});

app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});
