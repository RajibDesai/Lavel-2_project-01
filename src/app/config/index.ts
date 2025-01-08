import dotenv from 'dotenv';
import path from 'node:path';

dotenv.config({ path: path.join(process.cwd(), '.env') });

console.log('Current Directory:', process.cwd());

export default {
  port: process.env.PORT || 3000,
  database_url: process.env.DB_URL || '',
};
