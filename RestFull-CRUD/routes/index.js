var express = require('express');
var router = express.Router();
var createError = require('http-errors');
var express = require('express');
var router = express.Router();
const sql = require('mssql');

const config = {
  user: '4DD_13',  //Vostro user name
  password: 'xxx123##', //Vostra password
  server: "213.140.22.237",  //Stringa di connessione
  database: '4DD_13', //(Nome del DB)
}
/* GET home page. */
router.get('/', function(req, res, next) {
  let unit = req.body; 
  unit = "select * from dbo.[cr-unit-attributes]";
 
  
  res.render('index', { title: 'Express', unit });
});

module.exports = router;
