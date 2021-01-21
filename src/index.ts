#!/usr/bin/env node
/* eslint-disable no-console */
import meow from "meow";
import { EOL } from "os";
import getHelp, { commonFlags, chalk } from "meow-helper";
import type { ExtendedAnyFlags } from "meow-helper";
import rmUp, { Options } from "rm-up";
import { readFileSync } from "fs";
import { join } from "path";
import figures from "figures";

const OK = chalk.green(figures.tick);
const INFO = chalk.blue(figures.info);
const WARN = chalk.yellow(figures.warning);
const BULLET = chalk.cyan(figures.bullet);

const command = "rm-up";
const pkg = JSON.parse(readFileSync(join(__dirname, "../package.json"), { encoding: "utf8" }));
const flags: ExtendedAnyFlags = {
  cwd: { alias: "c", type: "string", desc: "Set the current working directory for relative paths." },
  force: { alias: "f", type: "boolean", desc: "Ignore errors if paths do not exist." },
  stop: { alias: "s", type: "string", desc: "Path to stop searching empty directories up. 'stop' dir is excluded and not deleted." },
  dry: { alias: "d", type: "boolean", desc: "Dry run without deleting any files." },
  log: { alias: "l", type: "boolean", desc: "Show logging." },
  verbose: { alias: "v", type: "boolean", desc: "Show extra infromation." },
  deleteInitial: {
    type: "boolean",
    desc:
      "Delete target path (bottom directory) even it is non-empty directory. For example even if 'c' directory of 'a/b/c' has some files in it, 'c' will be deleted.",
  },
  ...commonFlags,
};
const args = {
  "path...": "(optional) Files or directories to delete and search their empty parent directories up. If not given, cwd is used.",
};

const examples = [
  chalk`${command} {yellow --stop . --cwd /path/to/project} {cyan generated/lib/math generated/util/helper}`,
  "",
  "Using above command deletes following directories if they are empty:",
  "  /path/to/project/generated/lib/math",
  "  /path/to/project/generated/lib",
  "  /path/to/project/generated",

  "  /path/to/project/generated/util/helper",
  "  /path/to/project/generated/util",
  "  /path/to/project/generated",
];

const cli = meow(getHelp({ flags, args, command, pkg, examples }), { flags, pkg, allowUnknownFlags: false });

const cwd = (cli.flags.cwd ?? process.cwd()) as string;
const dirs = cli.input.length > 0 ? cli.input : cwd;
const deletedTitle = cli.flags.dry ? "Without dry option following directories would be deleted:" : "Deleted directories are:";

if (cli.flags.dry) cli.flags.verbose = true;
if (cli.flags.verbose) cli.flags.log = true;

rmUp(dirs, cli.flags as Options)
  .then((deletedDirs) => {
    if (cli.flags.dry) console.log(`${WARN} Dry run. No files will be deleted.`);
    if (cli.flags.verbose) console.log(`${INFO} CWD: ${cwd}`);

    if (cli.flags.log) {
      if (deletedDirs.length > 0) console.log(`${OK} ${deletedTitle}${EOL}    ${BULLET} ${deletedDirs.join(`${EOL}    ${BULLET} `)}`);
      else console.log(`${INFO} No empty directoies found.`);
    }
    process.exit();
  })
  .catch((err) => {
    console.error(err);
    process.exit(1);
  });
