let fs = require('fs');

const FILE_NAME = './logs/log.txt';

let logRepo = {
    write: (data, resolve, reject) => {
        let toWrite = "*".repeat(80) + '\r\n';
        toWrite += "Date/Time: " + new Date().toLocaleDateString()+ '\r\n';
        toWrite += "Exception Info: " + JSON.stringify(data) + '\r\n';
        toWrite += "*".repeat(80) + '\r\n';
        fs.writeFile(FILE_NAME, toWrite.toString(), (err) =>{
            reject(err)});
        resolve(toWrite);
    },
};

module.exports = logRepo;