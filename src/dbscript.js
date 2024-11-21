import fs from 'fs';
import path from 'path';

const sourcePath = path.resolve('prisma/dev.db');  // Path to the SQLite file in the project
const targetPath = '/tmp/dev.db';  // Path where SQLite will be stored in Vercel's writable space

// Copy the database to /tmp if it doesn't already exist there
if (!fs.existsSync(targetPath)) {
  fs.copyFileSync(sourcePath, targetPath);
}

process.env.DB_URL = `file:${targetPath}`;