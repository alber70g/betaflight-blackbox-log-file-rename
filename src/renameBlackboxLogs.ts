import fs from 'fs/promises';
import { Mapping } from './autorename';
import { readConfig } from './readConfig';
import { clone, forEach } from 'rambda';

type FilePath = string;
type Header = string;
type Value = string;
type Differences = {
  [header: Header]: {
    [value: Value]: FilePath[];
  };
};

type DifferencesPerFile = {
  [filePath: FilePath]: Record<Header, Value>;
};

export function convertToValuesPerFile(
  differences: Differences
): DifferencesPerFile {
  const valuesPerFile: Record<FilePath, Record<Header, Value>> = {};

  forEach((valuePaths, header) => {
    forEach((paths, value) => {
      forEach((path) => {
        valuesPerFile[path] = {
          ...valuesPerFile[path],
          [header]: value,
        };
      }, paths);
    }, valuePaths);
  }, differences);

  return valuesPerFile;
}

export async function renameBlackboxLogs(
  differences: Differences,
  mapping: Mapping
) {
  if (Object.keys(mapping).length === 0) {
    console.log('No mapping provided, files will not change');
    console.log(
      'Pass a mapping to rename files, e.g. "simplified_d_gain=slider_d,simplified_pi_gain=slider_pi"'
    );
    const oldCommand = clone(process.argv);
    oldCommand.splice(
      3,
      0,
      '"simplified_d_gain=slider_d,simplified_pi_gain=slider_pi"'
    );
    console.log(`E.g.: ${oldCommand.join(' ')}`);
    return;
  }

  forEach((headers, filepath) => {
    const newFileName = Object.keys(mapping).reduce(
      (newFileName, headerKey) => {
        const filenameHeader = mapping[headerKey];
        return `${newFileName}_${filenameHeader}-${headers[headerKey]}`;
      },
      filepath.replace('.BFL', '')
    );
    console.log(`Renaming ${filepath} to ${newFileName}.bfl`);
  }, convertToValuesPerFile(differences));
}
