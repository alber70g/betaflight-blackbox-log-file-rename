import glob from 'glob';
import { renameBlackboxLogs } from './renameBlackboxLogs';
import { autorename } from './autorename';
import { parseMappingArgument } from './parseMappingArgument';

const HELP_PADDING = 25;

async function main() {
  const path = process.argv[1];
  const command = process.argv[2] as string | undefined;
  console.log(command, process.argv);

  if (!command || process.argv.length < 3) {
    console.log(
      'Usage: ' +
        `\n${path} rename <headerflags> <fileglob>` +
        `\n${path} autorename <mapping> <fileglob>` +
        `        ${'mapping example:'} "simplified_d_gain=slider_d,simplified_pi_gain=slider_pi"` +
        `\n\n${'autorename example:'.padEnd(
          HELP_PADDING,
          ' '
        )} autorename "simplified_d_gain=slider_d,simplified_pi_gain=slider_pi" "*.bfl"`
    );
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
          'WARNING: No mapping provided, files will not change. Continuing with analysis'
        );
      }
      await autorename(files, mapping);
      break;
    }
  }
}

main().catch(console.error);
