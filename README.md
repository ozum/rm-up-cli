# rm-up-cli

Delete files or empty directories and their empty parents from bottom to up.

<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->

- [Installation](#installation)
- [Synopsis](#synopsis)
- [Details](#details)
- [Related](#related)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

# Installation

```sh
$ npm install -g rm-up
```

# Synopsis

Install globally to access rm-up from everywhere.

```sh
$ rm-up generated/util/math
```

```sh
$ rm-up generated/util/math generated/util/helper --cwd /path/to/project
```

```sh
$ rm-up --help
```

# Details

Deletes files or empty directories and their empty parents from bottom to up. First deletes given files or directories, then checks whether their parent directories are empty and deletes them if empty. Then checks parent's parents and so on.

It's direction is reverse of rm -rf or deltree command.

Ignores system junk files such as .DS_Store and Thumbs.db.

```
       USAGE

  $ rm-up [options] <path>...

     ARGUMENTS

  <path>... (optional) Files or directories to delete and search their empty parent directories up. If not given, cwd is used.

      OPTIONS

  -c --cwd            Set the current working directory for relative paths.
  -f --force          Ignore errors if paths do not exist.
  -s --stop           Path to stop searching empty directories up. 'stop' dir is excluded and not deleted.
  -d --dry            Dry run without deleting any files.
  -l --log            Show logging.
  -v --verbose        Show extra infromation.
     --deleteInitial  Delete target path (bottom directory) even it is non-empty directory. For example even if 'c' directory of 'a/b/c' has some files in it, 'c' will be deleted.
     --help           Show help.
     --version        Show version.

      EXAMPLES

  $ rm-up --stop . --cwd /path/to/project generated/lib/math generated/util/helper

  Using above command deletes following directories if they are empty:
    /path/to/project/generated/lib/math
    /path/to/project/generated/lib
    /path/to/project/generated
    /path/to/project/generated/util/helper
    /path/to/project/generated/util
    /path/to/project/generated
```

Please see [rm-up](https://github.com/ozum/rm-up) for details.

# Related

- [rm-up](https://github.com/ozum/rm-up): API for this CLI.

<!-- usage -->

<!-- commands -->
