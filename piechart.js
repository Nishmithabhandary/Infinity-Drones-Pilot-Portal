const express = require('express');
const app = express();
const pgp = require('pg-promise')();
const db = pgp('postgres://qfxwijux:sGtZVyXqp9PIG1EaLpZNdZX9qO1RceyE@mouse.db.elephantsql.com/qfxwijux');


app.use(express.static('public'));

// Define the route to retrieve the pie chart data
app.get('/data', async (req, res) => {
  try {
    // Query your PostgreSQL database to retrieve data for the pie chart
    const data = await db.any('select damaged_parts as label,count(damaged_parts)as count from crash group by damaged_parts');

    // Render the chart data as a JSON response
    res.json(data);
  } catch (error) {
    console.error('Error retrieving data:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Start the server
app.listen(3000, () => {
  console.log('Server is running on http://localhost:3000');
});
