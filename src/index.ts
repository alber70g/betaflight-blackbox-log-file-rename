#!/usr/bin/env node

import glob from 'glob';
import { autorename } from './autorename';
import { parseMappingArgument } from './parseMappingArgument';

const HELP_PADDING = 25;

async function main() {
  const path = process.argv[1].split('/').pop()!;
  const command = process.argv[2] as string | undefined;

  if (!command || process.argv.length < 3) {
    showHelp(path);
    process.exit(1);
  }
  switch (command) {
    case 'autorename': {
      const fileglob = process.argv[process.argv.length - 1];
      const files = glob.sync(fileglob, { cwd: process.cwd() });
      let mapping = {};
      if (process.argv[3].includes('=')) {
        mapping = parseMappingArgument(process.argv[3] as string);
      } else {
        console.log(
          'INFO: No mapping provided, files will not change. Continuing with analysis'
        );
      }
      await autorename(files, mapping);
      break;
    }
    default: {
      console.log(`Unknown command: ${command}`);
      showHelp(path);
      process.exit(1);
    }
  }
}

function showHelp(path: string) {
  console.log(
    'Usage: ' +
      `${path} autorename <mapping> --dry <fileglob>` +
      `\n  mapping example: "simplified_d_gain=slider_d,simplified_pi_gain=slider_pi"` +
      `\n\nautorename example: \n  ${path} autorename "simplified_d_gain=slider_d,simplified_pi_gain=slider_pi" "*.bfl"`
  );
}

main().catch(console.error);
