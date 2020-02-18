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
let executeQuery = function (res, query, next, pagina, sendData) {
    sql.connect(config, function (err) {
        if (err) { //Display error page
            console.log("Error while connecting database :- " + err);
            res.status(500).json({ success: false, message: 'Error while connecting database', error: err });
            return;
        }
        var request = new sql.Request(); // create Request object
        request.query(query, function (err, result) { //Display error page
            if (err) {
                console.log("Error while querying database :- " + err);
                res.status(500).json({ success: false, message: 'Error while querying database', error: err });
                sql.close();
                return;
            }
            /*  res.render('unita',{unita : result.recordset}); //Il vettore con i dati è nel campo recordset (puoi loggare result per verificare)
              res.render('unit',{unita : result.recordset});
            */
            if (sendData) {
                console.log("enter");
                renderizza(pagina, res, result.recordset);
            }
            sql.close();
        });

    });
}

renderizza = function (pagina, res, dati) {
    res.render(pagina, { unita: dati })
}

/* GET home page. */
router.get('/index', function (req, res, next) {
    res.render('index');
});
router.get('/', function (req, res, next) {
    let unita = "select * from dbo.[cr-unit-attributes]";
    executeQuery(res, unita, next, "unita", true);
});
router.get('/unit/:nome', function (req, res, next) {

    let unita = `select * from dbo.[cr-unit-attributes] WHERE Unit = '${req.params.nome}'`;
    executeQuery(res, unita, next, "unit", true);

});

router.post('/', function (req, res, next) {
    // Add a new Unit  
    console.log("ciao");
    let unit = req.body;
    if (!unit) {  //Qui dovremmo testare tutti i campi della richiesta
        res.status(500).json({ success: false, message: 'Error while connecting database', error: err });
        return;
    }
    let sqlInsert = `INSERT INTO dbo.[cr-unit-attributes] (Unit,Cost,Hit_Speed) 
                     VALUES ('${unit.Unit}','${unit.Cost}','${unit.Hit_Speed}')`;
    executeQuery(res, sqlInsert, next, "inserimento", false);
    vett = [];
    vett.push(unit);
    res.render("inserimento", { unita: vett })
});


module.exports = router;
