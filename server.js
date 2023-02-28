const express = require('express');
const axios = require('axios');
const cors = require('cors');

const app = express();
app.use(cors(
  {
    origin: 'http://localhost:3000',
    credentials: true
  }
));

require('dotenv').config()
const API_KEY = process.env.APIKEY; // your API key
const currentDate = new Date();
const year = currentDate.getFullYear();
const month = ('0' + (currentDate.getMonth() + 1)).slice(-2); // add leading zero and slice last 2 digits
const day = ('0' + currentDate.getDate()).slice(-2); // add leading zero and slice last 2 digits
const SEASON_YEAR = `${year}`; // the NHL season year
const SCHEDULE_Month = `${month}`; // the month of the season
const SEASON_DATE = `${day}`; // the date of the season
const FORMAT = 'json'; // response format


app.get('/api/sportsdata', async (req, res) => {
  try {
    const response = await axios.get(`http://api.sportradar.us/nhl/trial/v7/en/games/${SEASON_YEAR}/${SCHEDULE_Month}/${SEASON_DATE}/schedule.${FORMAT}?api_key=${API_KEY}`);
    res.send(response.data);
  } catch (error) {
    console.error(error);
    res.status(500).send('Error retrieving game schedule from Sportradar API');
  }
});

app.listen(3001, () => console.log('Server started on port 3001'));
