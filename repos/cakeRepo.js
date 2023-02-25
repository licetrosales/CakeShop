let cakeRepo = {
    get: (resolve, reject) => {
       fs.readFile(FILE_NAME, (err, data) => {
         if(err) {
             reject(err);
         }  else {
             resolve(JSON.parse(data));
         }
       });
    }
};
module.exports = cakeRepo;