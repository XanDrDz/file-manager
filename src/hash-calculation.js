import crypto from 'crypto';
import path from "path";
import {createReadStream} from 'fs';

export const createHash = (currentDirectory, args) => {
    if (!args || args.length === 0) {
        console.log('Missing argument');
        return;
    }

    const algorithm = 'sha256';
    const fileToHash = path.resolve(currentDirectory, args[0]);
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
}