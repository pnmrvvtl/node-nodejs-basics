import { promises as fs } from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const copy = async () => {
  const srcFolder = path.join(__dirname, 'files');
  const destFolder = path.join(__dirname, 'files_copy');

  try {
    await fs.access(srcFolder);
    try {
      await fs.access(destFolder);
      throw new Error('FS operation failed');
    } catch (err) {
      if (err.code === 'ENOENT') {
        await fs.mkdir(destFolder);
        const files = await fs.readdir(srcFolder);
        for (const file of files) {
          const srcFilePath = path.join(srcFolder, file);
          const destFilePath = path.join(destFolder, file);
          await fs.copyFile(srcFilePath, destFilePath);
        }
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

await copy();
