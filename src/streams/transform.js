import { Transform } from 'stream';

const transform = async () => {
  const reverseTransform = new Transform({
    transform(chunk, encoding, callback) {
      const reversed = chunk.toString().split('').reverse().join('');
      callback(null, reversed);
    }
  });

  process.stdin.pipe(reverseTransform).pipe(process.stdout);

  reverseTransform.on('error', (err) => {
    console.error('Error during transformation:', err.message);
  });
};

await transform();
