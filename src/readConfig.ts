import { readFileSync } from 'fs';

export type ConfigFile = {
  mappings: Record<string, string>;
};

let config: ConfigFile | undefined = undefined;

export function readConfig(): ConfigFile | undefined {
  if (config) {
    return config;
  }

  try {
    config = JSON.parse(
      readFileSync('blackbox-rename.json', 'utf8')
    ) as ConfigFile;
  } catch (error) {
    console.error('Config file not found or invalid: ', (error as any).message);
  }

  return config;
}
