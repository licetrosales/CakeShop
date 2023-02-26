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
router.get('/search', (req, res, next) => {
    let searchObject = {
        "id": req.query.id,
        "name": req.query.name
    };
    cakeRepo.search(searchObject, (data) => {
        res.status(200).json({
            "status": 200,
            "statusText": "OK",
            "message": "All cakes retrieved",
            "data": data
        });
    }, (err) => {
        next(err);
    });
});

router.get('/:id', (req, res, next) => {

    cakeRepo.getById(req.params.id, (data) => {
        if (data) {
            res.status(200).json({
                "status": 200,
                "statusText": "OK",
                "message": "All cakes retrieved",
                "data": data
            });
        } else {
            res.status(404).json({
                "status": 404,
                "statusText": "Not found",
                "message": "Cake '" + req.params.id + "' could not be found.",
                "error": {
                    "code": "NOT FOUND",
                    "message": "Cake '" + req.params.id + "' could not be found."
                }
            });
        }
    });
});



var server = app.listen(5000, () => {
    console.log("Node server is running on http://localhost:5000..");
});