const childProcess = require('child_process');
export function exec(command) {
  return new Promise((resolve, reject) => {
    childProcess.exec(command, (err, result) => {
      if (err) {
        reject(err);
      } else {
        resolve(result && String(result).trim());
      }
    });
  });
};
export function spawn(command, argsarray, envOptions) {
  return new Promise((resolve, reject) => {
    console.log('executing', command, argsarray.join(' '));
    const childProc = childProcess.spawn(
        command, argsarray, envOptions ||
        {env: process.env, cwd: process.cwd()}
    );
    const resultBuffers = [];
    childProc.stdout.on('data', (buffer) => {
      console.log(buffer.toString());
      resultBuffers.push(buffer);
    });
    childProc.stderr.on('data', (buffer) => console.error(buffer.toString()));
    childProc.on('exit', (code, signal) => {
      console.log(`${command} completed with ${code}:${signal}`);
      if (code !== 0) {
        reject(`${command} failed with ${code || signal}`);
      } else {
        resolve(Buffer.concat(resultBuffers).toString().trim());
      }
    });
  });
};
