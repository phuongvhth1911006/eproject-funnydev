var express = require("express");
var app = express();
const PORT = process.env.PORT || 5000;
var mssql = require('mssql');
const config = {
    server: '210.245.95.62',
    user: 'sa',
    password: 'z@GH7ytQ',
    database: 'T1911E'
};
app.listen(PORT,function () {
    console.log('Server is running..!');
});
app.use(express.static('public'));
app.set('view engine','ejs');
mssql.connect(config,function (err) {
    if(err) console.log(err);
});
var db = new mssql.Request();
//routing -- định tuyến
app.get('/',function (req,res) {
    res.render('test');
});