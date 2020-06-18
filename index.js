const express = require('express'); 
const app = express(); 
const Joi = require('joi'); 


app.use(express.json()); //reconocer los objetos como json
//app.use('/public', express.static('views')); 

const port = process.env.PORT || 5001; //process.env es una variable global injectada por node, aca seteamos el puerto
app.listen(port, ()=> console.log(`en puerto ${port}...`));


const students = [

{id: 1, name: 'Aixa', last:'Halac', email:'aixa@gmail.com', phone:'111111', career: 2, bdate: '020119991', country:'arg', city:'bsas', payment:'credit', installments:3},

{id: 2, name: 'Juan', last:'Costa', email:'juan@gmail.com', phone:'22222', career: 2, bdate: '31051989', country:'arg', city:'cordoba', payment:'debit', installments:0},

{id: 3, name: 'Pablo', last:'Fernandez', email:'pablo@gmail.com', phone:'33333', career: 1, bdate: '02061992', country:'arg', city:'la plata', payment:'cash', installments:0}
]


//READ
app.get('/', (req,res) =>{

 res.writeHead(302, { 'Location': 'public/home.html'});
 res.end();  //respuesta

})



app.get('/api/students', (req,res)=>{ 

	res.send(students);

})

app.get('/api/students/:id', (req,res) =>{ 

	const student = students.find(c => c.id === parseInt(req.params.id));
	if(!student)res.status(404).send('student not found'); 
	res.send(student); 

})


