import { Mapping } from './autorename';

export function parseMappingArgument(mapping: string): Mapping {
  console.log('parsing mapping', mapping);
  return mapping.split(',').reduce((acc, singleMapping) => {
    const [from, to] = singleMapping.split('=');
    acc[from] = to;
    return acc;
  }, {} as Mapping);
}
