import debug from 'debug';

const log = debug('findUniqueDifferences');

const MIN_TAB_WIDTH = 40;

// return a key-value pair of the unique differences
// key is the header name
// value is an array of objects
// each object has one key-value pair
// key is the filepath
// value is the header value
export function findUniqueDifferences(
  files: Record<string, Record<string, string>>
) {
  const uniqueDifferences: Record<string, Record<string, string[]>> = {};

  Object.entries(files).forEach(([filePath, headers]) => {
    Object.entries(headers).forEach(([headerName, headerValue]) => {
      headerName = headerName.split('H ')[1].split(':')[0].trim();
      if (!uniqueDifferences[headerName]) {
        uniqueDifferences[headerName] = {};
      }

      if (!uniqueDifferences[headerName][headerValue]) {
        uniqueDifferences[headerName][headerValue] = [];
      }

      uniqueDifferences[headerName][headerValue].push(filePath);
    });
  });

  Object.entries(uniqueDifferences).forEach(([headerName, headerValues]) => {
    if (Object.keys(headerValues).length === 1) {
      delete uniqueDifferences[headerName];
    }
  });

  log('uniqueDifferences', uniqueDifferences);
  console.log(
    'Found differences in the following headers:',
    '\n',
    Object.keys(uniqueDifferences)
      .map((d) => {
        return {
          header: d,
          values: uniqueDifferences[d],
        };
      })
      .map(({ header, values }) => {
        return `${header.padEnd(MIN_TAB_WIDTH, ' ')}: ${Object.keys(
          values
        ).join(', ')}`;
      })
      .join('\n')
  );

  return uniqueDifferences;
}
