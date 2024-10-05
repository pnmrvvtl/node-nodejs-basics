import { Worker } from 'worker_threads';
import os from 'os';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const performCalculations = async () => {
  const numCores = os.cpus().length;

  const createWorker = (index, numberToSend) => {
    return new Promise((resolve) => {
      const worker = new Worker(path.join(__dirname, 'worker.js'));

      worker.postMessage(numberToSend);

      worker.on('message', (data) => {
        resolve({ status: 'resolved', data });
      });

      worker.on('error', () => {
        resolve({ status: 'error', data: null });
      });

      worker.on('exit', (code) => {
        if (code !== 0) {
          resolve({ status: 'error', data: null });
        }
      });
    });
  };

  const workerPromises = [];

  for (let i = 0; i < numCores; i++) {
    const numberToSend = 10 + i;
    workerPromises.push(createWorker(i, numberToSend));
  }

  const resolvedResults = await Promise.all(workerPromises);
  console.log(resolvedResults);
};

await performCalculations();
