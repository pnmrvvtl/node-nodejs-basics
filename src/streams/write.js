import { createWriteStream } from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const write = async () => {
  const filePath = path.join(__dirname, 'files', 'fileToWrite.txt');
  const writableStream = createWriteStream(filePath, { encoding: 'utf8' });

  process.stdin.pipe(writableStream);

  writableStream.on('finish', () => {
    console.log('Data has been written to the file.');
  });

  writableStream.on('error', (err) => {
    console.error('Error writing to file:', err.message);
  });
};

await write();
