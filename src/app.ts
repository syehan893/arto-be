import express from 'express';
import { Pool } from 'pg';

const app = express();
const port = 3000;


const pool  = new Pool({
    host : 'arto-prod.coqcsdzvxeet.ap-southeast-1.rds.amazonaws.com',        
    port  : 5432,        
    database : 'arto-dev',        
    user : 'postgres',       
    password : 'meteologi200',    
  })


app.get('/api/data', async (req, res) => {
  try {

    const query = 'SELECT * FROM users';

    const { rows } = await pool.query(query);

    res.json(rows);
  } catch (error) {
    console.error('Error executing query:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});


app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
