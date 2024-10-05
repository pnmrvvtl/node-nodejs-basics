import { createReadStream, createWriteStream } from 'fs';
import { createGunzip } from 'zlib';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const decompress = async () => {
  const compressedFilePath = path.join(__dirname, 'files', 'archive.gz');
  const decompressedFilePath = path.join(__dirname, 'files', 'fileToCompress.txt');

  const readStream = createReadStream(compressedFilePath);
  const writeStream = createWriteStream(decompressedFilePath);
  const gunzip = createGunzip();

  readStream.pipe(gunzip).pipe(writeStream);

  writeStream.on('finish', () => {
    console.log('File successfully decompressed.');
  });

  writeStream.on('error', (err) => {
    console.error('Error during decompression:', err.message);
  });
};

await decompress();
