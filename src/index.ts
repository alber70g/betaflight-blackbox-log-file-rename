import path from "path";
import glob from "glob";

async function main() {
  const [command, ...rest] = process.argv.splice(2);
  const [fileglob, ...headerflags] = rest.reverse();
  const files = glob.sync(fileglob, { cwd: process.cwd()})

  console.log(`Running '${command}' for ${files.join(', ')}`)

  switch (command) {
    case "rename":
      files.forEach()

  }
}

main().catch(console.error);
