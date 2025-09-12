const fs = require('fs');
const path = require('path');
const { promisify } = require('util');

const readdir= promisify(fs.readdir);
const copyFile = promisify(fs.copyFile);

async function revertRepo(commitID){
    const repoPath = path.resolve(process.cwd(), '.plix');
    const commitsPath = path.join(repoPath,'commits', commitID);

    try{
const commitDir= commitsPath;
const files = await readdir(commitDir);
const parentDir=path.resolve(repoPath, '..');
for(const file of files){
    await copyFile(path.join(commitDir, file), path.join(parentDir, file));
       
}
console.log(`Reverted to commit ${commitID}`);
    }catch(err){
        console.error("Error reverting repository:", err);
        throw err;
    }
}

module.exports = {revertRepo};