const express = require('express'); 
const app = express(); 
const Joi = require('joi'); 
const db = require("./database.js");
const md5 = require("md5")



app.use(express.json()); //reconocer los objetos como json
app.use('/public', express.static('views')); 

var bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const port = process.env.PORT || 5001; //process.env es una variable global injectada por node, aca seteamos el puerto
app.listen(port, ()=> console.log(`en puerto ${port}...`));


const students = []


//READ
app.get('/', (req,res) =>{

 res.writeHead(302, { 'Location': 'public/home.html'});
 res.end();  //respuesta

})



app.get("/api/students", (req, res, next) => {
    var sql = "select * from students"
    var params = []
    db.all(sql, params, (err, rows) => {
        if (err) {
          res.status(400).json({"error":err.message});
          return;
        }
        res.json(rows)
      });
});

/*app.get("/api/students/:id", (req, res, next) => {
    var sql = "select * from students where id = ?"
    var params = [req.params.id]
    db.get(sql, params, (err, row) => {
        if (err) {
          res.status(400).json({"error":err.message});
          return;
        }
        res.json({
            "message":"success",
            "data":row
        })
      });
});*/

/*app.post('/api/students', async (req, res) => {
	const student = req.body;
	students.push(student);
	res.send();
	console.log('llego', students);
})*/


app.post("/api/students/", (req, res, next) => {
    var errors=[]
    if (!req.body.email){
        errors.push("No email specified");
    }
    if (errors.length){
        res.status(400).json({"error":errors.join(",")});
        return;
    }
    var data = {
        name: req.body.name,
        lastname: req.body.lastname,
        email : md5(req.body.email),
        phone: req.body.phone,
        payment: req.body.payment,
        bdate: req.body.bdate,
        country: req.body.country,
        city: req.body.city,
        career: req.body.career
    }
    var sql ='INSERT INTO students (name, lastname, email, phone, payment, bdate, country, city, career) VALUES (?,?,?,?,?,?,?,?,?)'
    var params =[data.name, data.lastname, data.email, data.phone, data.payment, data.bdate, data.country, data.city, data.career]
    db.run(sql, params, function (err, result) {
        if (err){
            res.status(400).json({"error": err.message})
            return;
        }
        res.json({
            "message": "success",
            "data": data,
            "id" : this.lastID
        })
    });
})


