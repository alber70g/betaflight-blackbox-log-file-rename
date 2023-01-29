import readline from 'readline';
import fs from 'fs';

export async function readBflFileHeaders(
  filePath: string,
  onHeader: (line: string) => void,
  onLast: () => void
): Promise<void> {
  return new Promise((resolve, reject) => {
    const rl = readline.createInterface({
      input: fs.createReadStream(filePath),
      output: process.stdout,
      terminal: false,
    });

    rl.on('line', function readLine(line) {
      if (line.startsWith('H')) {
        onHeader(line);
      } else {
        onLast();
        resolve();
        rl.removeAllListeners();
        rl.close();
      }
    });
  });
}
