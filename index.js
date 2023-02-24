let express = require('express');
let app = express();

let router = express.Router();
app.use('/api/', router);

app.get('/', (req, res, next) => {
    res.send("Apple");
});

var server = app.listen(5000, () => {
    console.log("Node server is running on http://localhost:5000..");
});