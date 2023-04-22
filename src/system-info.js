import os from 'os'

export const homeDir = os.homedir(); 
export const username = os.userInfo().username;
export const cpus = os.cpus();



export const checkOS = (args) => {

    if (!args || args.length === 0) {
        console.log('Missing argument');
        return;
    }

    switch(args[0]){
        case "--eol":
        case "--EOL":
            console.log(`EOL:${JSON.stringify(os.EOL)}`);
            break;
        case "--cpus":
        case "--CPUS":
            const res = os.cpus().map((elem)=>({
                Model:elem.model,
                'Clock rate':`${elem.speed/1000} GHz`
            }))
            console.log(`Amount of CPUS: ${os.cpus().length}`);
            console.table(res);
            break;
        case "--homedir":
        case "--HOMEDIR":
            console.log(`Current home directory: ${os.homedir()}`);
            break;
        case "--username":
        case "--USERNAME":
            console.log(`Current system user name: ${os.userInfo().username}`);
            break;
        case "--architecture":
        case "--ARCHITECTURE":
            console.log(`CPU architecture : ${process.arch}`);
            break;
        default:
            console.log('Unknown OS command. Please write correct command');
    }
}