const express = require('express');
const app = express();
const pgp = require('pg-promise')();
const db = pgp('postgres://qfxwijux:sGtZVyXqp9PIG1EaLpZNdZX9qO1RceyE@mouse.db.elephantsql.com/qfxwijux');

app.use(express.static('public'));

app.get('/data', async (req, res) => {
  try {
    // Query PostgreSQL database to retrieve data for the chart
    const data = await db.any('select emailid as label,count(flight_id) as value from flight_description where result=true group by emailid');

    // Extract labels and values from the retrieved data
    const labels = data.map(item => item.label);
    const values = data.map(item => item.value);

    // Render the chart data as a JSON response
    res.json({ labels, values });
  } catch (error) {
    console.error('Error retrieving data:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.get('/data', (req, res) => {
  res.sendFile(__dirname + '/public/index.html');
});

app.listen(3000, () => {
  console.log('Server is running on http://localhost:3000');
});
