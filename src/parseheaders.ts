import { readBflFileHeaders } from './read-bfl-file-headers';
import debug from 'debug';

const log = debug('parseheaders');

const HEADER_REGEX = /^H.*?:/;

export async function parseHeaders(filePath: string, onLast: () => void) {
  const headers: Record<string, string> = {};

  await readBflFileHeaders(
    filePath,
    (line) => {
      if (HEADER_REGEX.test(line)) {
        const headerName = line.match(HEADER_REGEX)?.[0];
        if (!headerName) {
          return;
        }

        headers[headerName] = line.split(headerName)[1].trim();
        log(`${filePath}: ${headerName}: ${headers[headerName]}`);
      }
    },
    onLast
  );


  return headers;
}
