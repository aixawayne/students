const express = require('express'); 
const app = express(); 
const Joi = require('joi'); 


app.use(express.json()); //reconocer los objetos como json
app.use('/public', express.static('views')); 

const port = process.env.PORT || 5001; //process.env es una variable global injectada por node, aca seteamos el puerto
app.listen(port, ()=> console.log(`en puerto ${port}...`));


const students = [

{name: 'Aixa', lastname:'Halac', email:'aixa@gmail.com', phone:'111111', payment: 'credit3', bdate: '1111-11-11', country:'arg', city:'bsas', career:'frontreact'},

{name: 'Juan', lastname:'Costa', email:'juan@gmail.com', phone:'111111', payment: 'cash', bdate: '1111-11-11', country:'arg', city:'bsas', career:'datascience'},

{name: 'Pablo', lastname:'Fernandez', email:'pabo@gmail.com', phone:'111111', payment: 'debit', bdate: '1111-11-11', country:'arg', city:'bsas', career:'frontreact'},
]


//READ
app.get('/', (req,res) =>{

 res.writeHead(302, { 'Location': 'public/home.html'});
 res.end();  //respuesta

})



app.get('/api/students', (req,res)=>{ 

	res.send(students);

})

/*app.get('/api/students/:id', (req,res) =>{ 

	const student = students.find(c => c.id === parseInt(req.params.id));
	if(!student)res.status(404).send('student not found'); 
	res.send(student); 

})*/

app.post('/api/students', async (req, res) => {
	const student = req.body;
	students.push(student);
	res.send();
	console.log('llego', students);
})


