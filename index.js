let express = require('express');
let app = express();

let router = express.Router();
app.use('/api/', router);

let cakeRepo = require('./repos/cakeRepo');


router.get('/', (req, res, next) => {
    cakeRepo.get(function (data) {
        res.status(200).json({
            "status": 200,
            "statusText": "OK",
            "message": "All cakes retrieved",
            "data": data
        });
    }, function (err) {
        next(err);
    });

});

var server = app.listen(5000, () => {
    console.log("Node server is running on http://localhost:5000..");
});