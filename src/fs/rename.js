import { promises as fs } from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const rename = async () => {
  const wrongFilePath = path.join(__dirname, 'files', 'wrongFilename.txt');
  const properFilePath = path.join(__dirname, 'files', 'properFilename.md');

  try {
    await fs.access(wrongFilePath);
    try {
      await fs.access(properFilePath);
      throw new Error('FS operation failed');
    } catch (err) {
      if (err.code === 'ENOENT') {
        await fs.rename(wrongFilePath, properFilePath);
      } else {
        throw err;
      }
    }
  } catch (err) {
    if (err.code === 'ENOENT') {
      throw new Error('FS operation failed');
    } else {
      throw err;
    }
  }
};

await rename();
