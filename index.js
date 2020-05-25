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
    var sql_text = "Select ParkID,ParkName,ParkImg1,ParkImg2 From FD_Parks;";
    sql_text += "Select * From FD_Trips";
    db.query(sql_text,function(err,rows){
        res.render('home',{
            parks: rows.recordsets[0],
            trips: rows.recordsets[1]
        });
    });
});
app.get('/park/:ParkID',function (req,res) {
    var ID = req.params.ParkID;
    var sql_text = "Select * From FD_Parks Where ParkID="+ID+";";
    sql_text += "Select * From FD_Trips Where ParkID="+ID+";";
    sql_text += "Select * From FD_Animals Where AnimalID In (Select AnimalID From FD_AnimalPark Where ParkID="+ID+");";
    sql_text += "Select SpecyName From FD_Species Where SpecyID In (Select SpecyID From FD_Animals Where AnimalID In (Select AnimalID From FD_AnimalPark Where ParkID="+ID+"));";
    db.query(sql_text,function(err,rows){
        res.render('parks',{
            parks: rows.recordsets[0],
            trips: rows.recordsets[1],
            animals: rows.recordsets[2],
            species: rows.recordsets[3]
        });
    });
});
app.get('/specy/:SpecyID',function (req,res) {
    var ID = req.params.SpecyID;
    var sql_text = "Select * From FD_Species WHERE SpecyID = "+ID+";";
    sql_text += "Select * From FD_Animals WHERE SpecyID = "+ID+";";
    db.query(sql_text,function(err,rows){
        res.render('species',{
            species: rows.recordsets[0],
            animals: rows.recordsets[1]
        });
    });
});
app.get('/animal/:AnimalID',function (req,res) {
    var ID = req.params.AnimalID;
    var sql_text = "Select * From FD_Animals";
    db.query(sql_text,function(err,rows){
        res.render("animal",{
            animals: rows.recordset,
            id: ID-1
        })
    });
});
app.get('/contact',function (req,res) {
    res.render('contactus');
});

app.get('/test',function (req,res) {
    var sql_text = "Select ParkID,ParkName,ParkImg1,ParkImg2 From FD_Parks;";
    sql_text += "Select * From FD_Trips";
    db.query(sql_text,function(err,rows){
        res.send(
            rows.recordsets
        );
    });
});