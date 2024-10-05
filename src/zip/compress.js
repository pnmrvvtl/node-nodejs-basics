import { createReadStream, createWriteStream } from 'fs';
import { createGzip } from 'zlib';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const compress = async () => {
  const filePath = path.join(__dirname, 'files', 'fileToCompress.txt');
  const compressedFilePath = path.join(__dirname, 'files', 'archive.gz');

  const readStream = createReadStream(filePath);
  const writeStream = createWriteStream(compressedFilePath);
  const gzip = createGzip();

  readStream.pipe(gzip).pipe(writeStream);

  writeStream.on('finish', () => {
    console.log('File successfully compressed.');
  });

  writeStream.on('error', (err) => {
    console.error('Error during compression:', err.message);
  });
};

await compress();
