import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename)



export const printUserInfo = async (args) => {
    const username = args.find(arg => arg.startsWith('--username=')).split('=')[1];
    const welcomeMsg = `Welcome to the File Manager, ${username}!\n`;
    const goodbyeMsg = `Thank you for using File Manager, ${username}, goodbye!`;

    console.log(welcomeMsg)

    process.on('SIGINT', function () {
        console.log(goodbyeMsg);
        process.exit();
    });
    
    process.stdin.on('data', function (data) {
        if (data.toString().trim() === '.exit') {
          console.log(goodbyeMsg);
          process.exit();
        }
      });
}


