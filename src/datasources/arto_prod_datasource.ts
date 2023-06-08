import { Pool } from "pg";
import * as dotenv from 'dotenv';
dotenv.config();

// const dbPort = process.env.DB_PORT;

const pool  = new Pool({
    host : process.env.DB_HOST,        
    port  : 5432,        
    database : process.env.DB_NAME,        
    user : process.env.DB_USER,       
    password : process.env.DB_PASSWORD,    
  });

  export default pool;