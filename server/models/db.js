import { Pool } from 'pg';
import dotenv from 'dotenv';

dotenv.config();

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  max: 2,
  idleTimeoutMillis: 10000,
  connectionTimeoutMillis: 2000
});

export default {
  query(text, params) {
    (async () => {
      const client = await pool.connect();
      try {
        await client.query(text, params);
      } finally {
        client.release();
      }
    })().catch(e => console.log(e.stack));
  }
};
