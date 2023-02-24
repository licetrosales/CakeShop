let express = require('express');
let app = express();

let router = express.Router();
app.use('/api/', router);

app.get('/', (req, res, next) => {
    res.send("Apple");
});
