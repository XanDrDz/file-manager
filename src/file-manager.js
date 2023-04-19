import { printUserInfo } from './general.js'
import { Transform } from 'stream';
import { homeDir } from './system-info.js';

process.chdir(homeDir);

const args = process.argv.slice(2);
let currentWorkingDirectory = process.cwd();
let currentChunk = ''

await printUserInfo(args)
printCurrentWorkingDirectory()

const transform = async () => {
  const stream = new Transform({
      transform(chunk, encoding, callback) {
        currentChunk = chunk.toString()
        callback();
        printCurrentWorkingDirectory()
      }
    });
  
    process.stdin.pipe(stream);
};
await transform();

function printCurrentWorkingDirectory() {
    console.log(`You are currently in ${currentWorkingDirectory}`);
}
