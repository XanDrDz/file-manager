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

let currentDirectory = process.cwd();
const goodbyeMsg = `Thank you for using File Manager, ${getUserName()}, goodbye!`;

await printUserInfo()
printCurrentDirectory()

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

function printCurrentDirectory () {
  console.log(`You are currently in ${currentDirectory}`)
}

rl.on('line', (input) => {
  const [command, ...args] = input.trim().split(' ');
  switch (command) {
    case COMMANDS.nwd:
      printCurrentDirectory();
      break;
    case COMMANDS.up:
      currentDirectory = getUpperDirectory(currentDirectory)
      break;
    case COMMANDS.cd:
      if (!args || args.length === 0) {
        console.log('Missing argument');
        return;
      }
      const tempNewPath = path.resolve(currentDirectory, args[0]);
      fs.access(tempNewPath, (err) => {
        if (err) {
          console.log('Invalid input');
          printCurrentDirectory()
        } else {
          currentDirectory = tempNewPath;
          console.log(`You are currently in ${currentDirectory}`);
        }
      });
      break;
    case COMMANDS.ls:
      printAllFiles(currentDirectory)
      printCurrentDirectory()
      break;
    case COMMANDS.cat:
      readAndPrint(currentDirectory, args)
      printCurrentDirectory()
      break;
    case COMMANDS.add:
      addFile(currentDirectory, args)
      printCurrentDirectory()
      break;
    case COMMANDS.rn:
      rename(currentDirectory, args)
      printCurrentDirectory()
      break;
    case COMMANDS.cp:
      copy(currentDirectory, args)
      printCurrentDirectory()
      break;
    case COMMANDS.mv:
      moveFile(currentDirectory, args)
      printCurrentDirectory()
      break;
    case COMMANDS.rm:
      deleteFile(currentDirectory, args)
      printCurrentDirectory()
      break;
    case COMMANDS.os:
      checkOS(args)
      printCurrentDirectory()
      break;
    case COMMANDS.compress:
      compressFile(currentDirectory, args)
      printCurrentDirectory()
      break;
    case COMMANDS.decompress:
      decompressFile(currentDirectory, args)
      printCurrentDirectory()
      break;
    case COMMANDS.hash:
      createHash(currentDirectory, args)
      printCurrentDirectory()
      break;
    case '.exit':
      console.log(goodbyeMsg);
      process.exit();
      break;
    default:
      console.log('Incorrect command. Please enter correct command and proceed');
  }
})

rl.on('SIGINT', function () {
  console.log(goodbyeMsg);
  process.exit();
});
