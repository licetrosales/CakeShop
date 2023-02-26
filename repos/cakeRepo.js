let fs = require('fs');

const FILE_NAME = "./assets/cakes.json";

let cakeRepo = {
    get: (resolve, reject) => {
        fs.readFile(FILE_NAME, (err, data) => {
            if (err) {
                reject(err);
            } else {
                resolve(JSON.parse(data));
            }
        });
    },
    search: (searchObject, resolve, reject) => {
        fs.readFile(FILE_NAME, (err, data) => {
            if (err) {
                reject(err);
            } else {
                let cakes = JSON.parse(data);
                if (searchObject) {
                    cakes = cakes.filter(
                        p => (searchObject.id ? p.id == searchObject.id : true) &&
                            (searchObject.name ? p.name.toLowerCase().indexOf(searchObject.name.toLowerCase()) >= 0 : true)
                    );
                }
                resolve(cakes);
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
    },

};
module.exports = cakeRepo;