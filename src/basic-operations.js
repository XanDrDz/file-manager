import { createReadStream, createWriteStream } from 'fs';
import { Writable } from 'stream';
import fs from 'fs'
import path from 'path';


export const readAndPrint = (currentDirectory, args) => {
    if (!args || args.length === 0) {
        console.log('Missing argument');
        return;
    }

    const filePath = path.resolve(currentDirectory, args[0]);

    const readStream = createReadStream(filePath, { encoding: 'utf8' });

    readStream.on('data', (chunk) => {
        process.stdout.write(chunk);
    });

    readStream.on('error', (err) => {
        console.log(`Failed to read file: ${err}`);
    });
}

export const addFile = (currentDirectory, args) => {
    if (!args || args.length === 0) {
        console.log('Missing argument');
        return;
    }

    const fileName = args[0];
    const filePath = path.resolve(currentDirectory, fileName);
    fs.writeFile(filePath, '', (err) => {
        if (err) {
            console.log('Operation failed');
        } else {
            console.log(`File ${fileName} created`);
        }
    });
}

export const rename = (currentDirectory, args) => {
    if (!args || args.length === 0) {
        console.log('Missing argument');
        return;
    }

    const oldPath = path.resolve(currentDirectory, args[0]);
    const newPath = path.resolve(currentDirectory, args[1]);
    fs.rename(oldPath, newPath, (err) => {
        if (err) {
            console.log('Operation failed');
        } else {
            console.log(`${args[0]} renamed to ${args[1]}`);
        }
    });
}

export const copy = (currentDirectory, args) => {
    if (!args || args.length === 0) {
        console.log('Missing argument');
        return;
    }

    const sourceFileName = path.basename(args[0]);
    const destinationFilePath = path.join(args[1], sourceFileName);


    const source = createReadStream(path.resolve(currentDirectory, args[0]));
    const destination = createWriteStream(path.resolve(currentDirectory, destinationFilePath));
    source.on('error', (error) => {
      console.log(`Operation failed beacause on sourcec stream ${error}`);
    });
    destination.on('error', (error) => {
      console.log(`Operation failed beacause on destination stream ${error}`);
    });
    destination.on('close', () => {
      console.log(`${args[0]} copied to ${args[1]}`);
    });
    source.pipe(destination);
}

export const move = (currentDirectory, args) => {
    if (!args || args.length === 0) {
        console.log('Missing argument');
        return;
    }

    const sourceFileName = path.basename(args[0]);
    const destinationFilePath = path.join(args[1], sourceFileName);

    const source = createReadStream(path.resolve(currentDirectory, args[0]));
    const destination = createWriteStream(path.resolve(currentDirectory, destinationFilePath));
    source.on('error', (error) => {
      console.log(`Operation failed beacause on sourcec stream ${error}`);
    });
    destination.on('error', (error) => {
      console.log(`Operation failed beacause on destination stream ${error}`);
    });
    destination.on('finish', () => {
        fs.unlink(path.resolve(currentDirectory, args[0]), (err) => {
            if (err) {
              console.error(`Error deleting file: ${err}`);
            } else {
              console.log(`${path.resolve(currentDirectory, args[0])} was successfully moved to ${targetDirectory}`);
            }
          });
    })
    source.pipe(destination);
}
