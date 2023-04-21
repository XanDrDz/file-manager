export const DEFAULT_ENCODING = 'utf8';
export const COMMANDS = {
  nwd: 'nwd',
  up: 'up',
  cd: 'cd',
  ls: 'ls',
  cat: 'cat',
  add: 'add',
  rn: 'rn',
  cp: 'cp',
  mv: 'mv',
  rm: 'rm',
  os: 'os',
  hash: 'hash',
  compress: 'compress',
  decompress: 'decompress',
};
export const VALID_COMMANDS = Object.values(COMMANDS);
export const VALID_OS_COMMANDS = ['--EOL', '--cpus', '--homedir', '--username', '--architecture'];