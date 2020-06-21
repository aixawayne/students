var sqlite3 = require('sqlite3').verbose()
var md5 = require('md5')

const DBSOURCE = "db.sqlite"

let db = new sqlite3.Database(DBSOURCE, (err) => {
    if (err) {
      // Cannot open database
      console.error(err.message)
      throw err
    }else{
        console.log('Connected to the SQLite database.')
        db.run(`CREATE TABLE students (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name text, 
            lastname text, 
            email text UNIQUE, 
            phone text,
            payment text, 
            bdate text, 
            country text, 
            city text,  
            career text, 
            CONSTRAINT email_unique UNIQUE (email)
            )`,
        (err) => {
            if (err) {
                // Table already created
            }else{
                // Table just created, creating some rows
                var insert = 'INSERT INTO students (name, lastname, email, phone, payment, bdate, country, city, career) VALUES (?,?,?,?,?,?,?,?,?)'
                db.run(insert, ["Aixa","Halac",md5("aixa.halac@gmail.com"),"01131274981","credit6","1991-01-02","Argentina","Bs As","Fullstack"])
                db.run(insert, ["Pablo","Fernandez",md5("pablo@gmail.com"),"01131276666","cash","1989-01-08","Argentina","Bs As","DataScience"])
            }
        });  
    }
});


module.exports = db
