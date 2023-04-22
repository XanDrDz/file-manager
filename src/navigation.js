import fs from 'fs';
import path from 'path';

export const getUpperDirectory = (currentDirectory) => {
    const parent = path.dirname(currentDirectory);
    if (parent !== currentDirectory && parent !== '/') {
      currentDirectory = parent;
      console.log(`You are currently in ${currentDirectory}`);
      return currentDirectory
    } else {
      console.log(`You can't go any higher than ${currentDirectory}`);
      return currentDirectory
    }
}

export const printAllFiles = async (currentDirectory) => {
  let files = await fs.promises.readdir(currentDirectory, {withFileTypes:true})
  let sortedFiles = files.sort((a,b) => a.isFile() - b.isFile())
  let res = sortedFiles.map((elem)=> ({Name: elem.name, Type: elem.isFile() ? 'file' : 'directory'}))
  console.table(res)
}

// export const changeDir = (currentDirectory, args) => {
//   const newPath = path.resolve(currentDirectory, args[0]);
//   fs.access(newPath, (err) => {
//     if (err) {
//       console.log('Invalid input');
//     } else {
//       currentDirectory = newPath;
//       console.log(`You are currently in ${currentDirectory}`);
//       return currentDirectory
//     }
//   });
// }
