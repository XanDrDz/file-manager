import { printUserInfo } from './user.js'
import { Transform } from 'stream';
import {checkOS, homeDir} from './system-info.js';
import readline from 'readline';
import { getUpperDirectory } from './navigation.js';
import { getUserName } from './user.js';
import { COMMANDS } from './commands.js';
import { printAllFiles } from './navigation.js'
import {readAndPrint, addFile, rename, copy, moveFile, deleteFile} from './basic-operations.js'
import path from 'path';
import fs from 'fs'
import {createHash} from "./hash-calculation.js";
import {compressFile, decompressFile} from "./compress-decompress.js";

process.chdir(homeDir);

let currentWorkingDirectory = process.cwd();
let newPath = '';
let currentDirectory = process.cwd();
const goodbyeMsg = `Thank you for using File Manager, ${getUserName()}, goodbye!`;

await printUserInfo()
console.log(`You are currently in ${currentDirectory}`)

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

rl.on('line', (input) => {
  const [command, ...args] = input.split(' ');
  switch (command) {
    case COMMANDS.nwd:
      console.log(`You are currently in ${currentDirectory}`);
      break;
    case COMMANDS.up:
      currentDirectory = getUpperDirectory(currentDirectory)
      break;
    case COMMANDS.cd:
      const tempNewPath = path.resolve(currentDirectory, args[0]);
      fs.access(tempNewPath, (err) => {
        if (err) {
          console.log('Invalid input');
        } else {
          currentDirectory = tempNewPath;
          console.log(`You are currently in ${currentDirectory}`);
        }
      });
      break;
    case COMMANDS.ls:
      printAllFiles(currentDirectory)
      break;
    case COMMANDS.cat:
      readAndPrint(currentDirectory, args)
      break;
    case COMMANDS.add:
      addFile(currentDirectory, args)
      break;
    case COMMANDS.rn:
      rename(currentDirectory, args)
      break;
    case COMMANDS.cp:
      copy(currentDirectory, args)
      break;
    case COMMANDS.mv:
      moveFile(currentDirectory, args)
      break;
    case COMMANDS.rm:
      deleteFile(currentDirectory, args)
      break;
    case COMMANDS.os:
      checkOS(args)
      break;
    case COMMANDS.compress:
      compressFile(currentDirectory, args)
      break;
    case COMMANDS.decompress:
      decompressFile(currentDirectory, args)
      break;
    case COMMANDS.hash:
      createHash(currentDirectory, args)
      break;
    case '.exit':
      console.log(goodbyeMsg);
      process.exit();
  }
})

rl.on('SIGINT', function () {
  console.log(goodbyeMsg);
  process.exit();
});
