let fs = require('fs');

const FILE_NAME = "./assets/cakes.json";

let cakeRepo = {
    get: (resolve, reject) => {
       fs.readFile(FILE_NAME, (err, data) => {
         if(err) {
             reject(err);
         }  else {
             resolve(JSON.parse(data));
         }
       });
    },

    getById: (id, resolve, reject) => {
        fs.readFile(FILE_NAME, (err, data) => {
            if (err) {
                reject(err);
            } else {
                let request = JSON.parse(data).find(p => p.id == id);
                resolve(request);
            }
        });
    }
};
module.exports = cakeRepo;