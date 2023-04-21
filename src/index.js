import { printUserInfo } from './user.js'
import { Transform } from 'stream';
import { homeDir } from './system-info.js';
import readline from 'readline';
import { getUpperDirectory } from './navigation.js';
import { getUserName } from './user.js';
import { COMMANDS } from './commands.js';
import { printAllFiles } from './navigation.js'
import { readAndPrint, addFile, rename, copy, move } from './basic-operations.js'
import path from 'path';
import fs from 'fs'

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
      move(currentDirectory, args)
    case COMMANDS.rm:
      const fileToDelete = path.resolve(currentDirectory, args[0]);
      fs.unlink(fileToDelete, (err) => {
        if (err) {
          console.log('Operation failed');
        } else {
          console.log(`${args[0]} deleted`);
        }
      });
      break;
    case COMMANDS.zip:
      const sourceFolder = path.resolve(currentDirectory, args[0]);
      const zipFileName = `${args[0]}.zip`;
      const destinationZip = createWriteStream(path.resolve(currentDirectory, zipFileName));
      const zip = createBrotliCompress();
      destinationZip.on('error', () => {
        console.log('Operation failed');
      });
      destinationZip.on('close', () => {
        console.log(`${args[0]} zipped to ${zipFileName}`);
      });
      fs.readdir(sourceFolder, (err, files) => {
        if (err) {
          console.log('Operation failed');
        } else {
          files.forEach((file) => {
            const fileToCompress = path.resolve(sourceFolder, file);
            const readStream = createReadStream(fileToCompress);
            readStream.on('error', () => {
              console.log('Operation failed');
            });
            readStream.pipe(zip, { end: false });
          });
          zip.pipe(destinationZip);
          zip.on('end', () => {
            destinationZip.end();
          });
        }
      });
      break;
    case COMMANDS.unzip:
      const zipFilePath = path.resolve(currentDirectory, args[0]);
      const destinationFolder = path.resolve(currentDirectory, args[1]);
      const unzip = createBrotliDecompress();
      const zipReadStream = createReadStream(zipFilePath);
      zipReadStream.on('error', () => {
        console.log('Operation failed');
      });
      unzip.on('error', () => {
        console.log('Operation failed');
      });
      unzip.on('close', () => {
        console.log(`${args[0]} unzipped to ${args[1]}`);
      });
      fs.mkdir(destinationFolder, { recursive: true }, (err) => {
        if (err) {
          console.log('Operation failed');
        } else {
          zipReadStream.pipe(unzip);
          unzip.on('entry', (entry) => {
            const filePath = path.resolve(destinationFolder, entry.name);
            if (entry.isDirectory()) {
              fs.mkdirSync(filePath, { recursive: true });
            } else {
              const writeStream = createWriteStream(filePath);
              writeStream.on('error', () => {
                console.log('Operation failed');
              });
              unzip.pipe(writeStream);
            }
          });
        }
      });
      break;
    case COMMANDS.hash:
      const algorithm = args[0];
      const fileToHash = path.resolve(currentDirectory, args[1]);
      const hash = crypto.createHash(algorithm);
      const readHashStream = createReadStream(fileToHash);
      readHashStream.on('error', () => {
        console.log('Operation failed');
      });
      hash.on('readable', () => {
        const data = hash.read();
        if (data) {
          console.log(data.toString('hex'));
        }
      });
      readHashStream.pipe(hash);
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
