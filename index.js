let express = require('express');
let app = express();
let cakeRepo = require('./repos/cakeRepo');

let router = express.Router();
let errorHelper = require('./helpers/errorHelpers');
app.use(express.json());

app.use('/api/', router);

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
                "message": "Cake retrieved.",
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

router.post('/', (req, res, next) => {
    cakeRepo.insert(req.body, (data) => {
        res.status(201).json({
            "status": 201,
            "statusTest": "Created",
            "message": "New Cake Added.",
            "data": data
        });
    }, (err) => {
        next(err);
    });
});

router.put('/:id', (req, res, next) => {
    cakeRepo.getById(req.params.id, (data) => {
        if (data) {
            cakeRepo.update(req.body, req.params.id, (data) => {
                res.status(200).json({
                    "status": 200,
                    "statusText": "OK",
                    "message": "Cake '" + req.params.id + "' updated.",
                    "data": data
                });
            });
        } else {
            res.status(404).json(
                {
                    "status": 404,
                    "statusText": "Not found",
                    "message": "Cake '" + req.params.id + "' could not be found.",
                    "error": {
                        "code": "NOT FOUND",
                        "message": "Cake '" + req.params.id + "' could not be found."
                    }
                }
            );
        }
    }, (err) => {
        next(err);
    });
});

router.delete('/:id', (req, res, next) => {
    cakeRepo.getById(req.params.id, (data) => {
        if (data) {
            cakeRepo.delete(req.params.id, (data) => {
                res.status(200).json({
                    "status": 200,
                    "statusText": "OK",
                    "message": "Cake '" + req.params.id + "' is deleted.",
                    "data": "Cake '" + req.params.id + "' is deleted."
                });
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

router.patch('/:id', (req, res, next) => {
    cakeRepo.getById(req.params.id, (data) => {
        if(data){
       cakeRepo.update(req.body, req.params.id, (data) => {
          res.status(200).json({
              "status": 200,
              "statusText": "OK",
              "message": "Cake '" + req.params.id + "' patched.",
              "data":data
          }) ;
       });
        }
    });
});


app.use(errorHelper.logErrorsConsole);
app.use(errorHelper.clientErrorHandler);
app.use(errorHelper.errorHandler);

var server = app.listen(5000, () => {
    console.log("Node server is running on http://localhost:5000..");
});