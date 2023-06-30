const express = require('express');
const { Pool } = require('pg');
const app = express();
const pool = new Pool({ connectionString: 'postgres://qfxwijux:sGtZVyXqp9PIG1EaLpZNdZX9qO1RceyE@mouse.db.elephantsql.com/qfxwijux' });
const PORT = 3000; // Choose a suitable port number

app.use(express.static('public')); // Serve static files from the 'public' directory

app.get('/data', async (req, res) => {
  const client = await pool.connect();

  try {
    const result = await client.query('select emailid as label,count(flight_id) as value from flight_description where result=true group by emailid');
    console.log('this is bar data............');
    console.log(result);
    console.log('this is bar data............');
    const data = result.rows;
    res.json(data);
  } catch (error) {
    console.error('Error occurred:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  } finally {
    client.release();
  }
});

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
