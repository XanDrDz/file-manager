import { printUserInfo } from './general.js'
import { Transform } from 'stream';
import { printCurrentWorkingDirectory } from './navigation.js'

const args = process.argv.slice(2);
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