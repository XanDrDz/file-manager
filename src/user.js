import os from "os"

export let UNKNOWN_USER = 'Anonymous'
export const currentUser = process.argv.slice(2).at(-1)
export let USER = ''

export const printUserInfo = async () => {
    const username = getUserName();
    const welcomeMsg = `Welcome to the File Manager, ${username}!\n`;

    console.log(welcomeMsg)
    console.log(`${username}, please print commands and wait for result \n`)
}

export const getUserName = () => {
    process.chdir(os.homedir())
    if (currentUser && currentUser.includes('--username=')){
        USER = currentUser.split('=').at(-1) 
        return USER
    }else{
        UNKNOWN_USER = USER
        return USER
    }
}


