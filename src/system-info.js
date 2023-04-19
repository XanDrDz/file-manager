import os from 'os'

export const homeDir = os.homedir(); 
export const username = os.userInfo().username;
export const cpus = os.cpus();