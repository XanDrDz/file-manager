import { createBrotliCompress, createBrotliDecompress } from 'zlib';
import path from "path";
import fs, {createReadStream, createWriteStream} from "fs";

export const compressFile = (currentDirectory, args) => {
    if (!args || args.length === 0) {
        console.log('Missing argument');
        return;
    }

    if (!args[1]) {
        console.log('Need to write destination path including new filename')
    }

    const sourceFilePath = path.resolve(currentDirectory, args[0])
    const destinationFilePath = path.resolve(currentDirectory, `${args[1]}.br`)

    const readStream = createReadStream(sourceFilePath);
    const writeStream = createWriteStream(destinationFilePath);

    const brotliStream = createBrotliCompress();

    readStream.on('error', (err) => {
        console.error('Reading file error: ', err);
    });
    brotliStream.on('error', (err) => {
        console.error('Compressing file error:  ', err);
    });
    writeStream.on('error', (err) => {
        console.error('Recording file error: ', err);
    });
    writeStream.on('close', () => {
        console.log('Successfully recorded');
    });

    readStream.pipe(brotliStream).pipe(writeStream);
}

export const decompressFile = (currentDirectory, args) => {
    if (!args || args.length === 0) {
        console.log('Missing argument');
        return;
    }

    if (!args[1]) {
        console.log('Need to write destination path including new filename')
    }

    const sourceFilePath = path.resolve(currentDirectory, args[0])
    const destinationFilePath = path.resolve(currentDirectory, args[1])

    const readStream = createReadStream(sourceFilePath);
    const writeStream = createWriteStream(destinationFilePath);

    const brotliStream = createBrotliDecompress();

    readStream.on('error', (err) => {
        console.error('Reading file error: ', err);
    });
    brotliStream.on('error', (err) => {
        console.error('Decompressing file error:  ', err);
    });
    writeStream.on('error', (err) => {
        console.error('Recording file error: ', err);
    });
    writeStream.on('close', () => {
        console.log('Successfully recorded');
    });

    readStream.pipe(brotliStream).pipe(writeStream);
}