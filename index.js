let express = require('express');
let app = express();

let router = express.Router();
app.use('/api/', router);

let cakes = [
    {"id": 1, "name": "Mango"},
    {"id": 2, "name": "Apple"},
    {"id": 3, "name": "Cinamon"}
];

app.get('/', (req, res, next) => {
    res.send(cakes);
});

var server = app.listen(5000, () => {
    console.log("Node server is running on http://localhost:5000..");
});