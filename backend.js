'use strict';

const mysql = require('mysql');
const express = require('express');

const app = express();
app.use(express.json());
app.use('/assets', express.static('./assets'));

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'root',
  database: 'car'
});

connection.connect( (error) => {
  if (error) {
    console.log(error);
  } else {
    console.log('mysql server connected');
  }
});


// var car =[
//   { "plate": "MXS-803", "car_brand": "Subaru", "car_model": "Legacy", "color": "pink", "year": 2001 },
//   { "plate": "BFH-682", "car_brand": "Cadillac", "car_model": "CTS", "color": "Yellow", "year": 2004 },
//   { "plate": "QQG-264", "car_brand": "Pontiac", "car_model": "Grand Prix", "color": "Fuscia", "year": 1964 },
//   { "plate": "JUO-705", "car_brand": "Infinity", "car_model": "M", "color": "Crimson", "year": 2004 },
//   { "plate": "CICA-01", "car_brand": "Pontiac", "car_model": "Grand Am", "color": "Aquamarine", "year": 1991 }
// ]

app.get('/', function(req, res){
  res.sendFile(__dirname + '/index.html');
});


app.get('/search', function(req, res){
  
    if (!req.query.plate){ 
      var addToSelect= "";
    } else {
      addToSelect= "WHERE plate = \'" + req.query.plate + "\'";
      };
  
    connection.query(`SELECT plate, car_brand, car_model, color, year FROM licence_plates ${addToSelect}`, 
      
    function(err, carsData){
      if(err){
          console.log(err);
      }
          res.send({"results": "ok",
                    "data": carsData}
            ); 
      });
  });

  app.get('/search/:brand', function(req, res){
    
    var brand = req.params.brand;
    console.log({"brand":brand})
    connection.query(`SELECT plate, car_brand, car_model, color, year FROM licence_plates WHERE car_brand = "${brand}"`, 
    
    function(err, carsData){
        if(err){
            res.send({"status": "error" });
        }
            res.send({"results": "ok",
                       "data": carsData}
); 
        });
});


app.listen(8080);