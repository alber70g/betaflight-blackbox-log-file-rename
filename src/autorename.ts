import { parseHeaders } from './parseheaders';
import debug from 'debug';
import { findUniqueDifferences } from './findUniqueDifferences';
import { renameBlackboxLogs } from './renameBlackboxLogs';

export const log = debug('autorename');

export type Mapping = {
  [from: string]: string;
};

export async function autorename(filePaths: string[], mapping: Mapping) {
  const files: Record<string, Record<string, string>> = {};

  await Promise.all(
    filePaths.map(async (filePath) => {
      const headers = await parseHeaders(filePath, () => {
        log(`parsed ${filePath}`);
      });

      files[filePath] = headers;
    })
  );

  const differences = findUniqueDifferences(files);

  await renameBlackboxLogs(differences, mapping);
}
