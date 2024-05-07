const express = require("express");
const app = express();
const mysql = require("mysql");
const cors = require ("cors");

app.use (cors());
app.use(express.json());

const db = mysql.createConnection({
    host:"localhost",
    user:"clientusr",
    password: "Cl13ntusr1",
    database:"usuarios"
})
app.listen(3001, () => {
    console.log("Corriendo en el puerto 3001")
} )  

app.post ("/create", (req,res) => {
    const nombre =  req.body.nombre;
    const edad =  req.body.edad;
    const pais =  req.body.pais;
    const cargo =  req.body.cargo;
    const antiguedad =  req.body.antiguedad;
    
    db.query('insert into empleados(nombre,edad,pais,cargo,antiguedad) VALUES (?,?,?,?,?)', [nombre,edad,pais,cargo,antiguedad],
    (err,result) => {
        if (err) {
            console.log(err);
        }else {
            res.send(result)
        }
    }
);

});

app.get("/empleados", (req,res) => {
    db.query('select * from empleados',
    (err,result) => {
        if(err) {
            console.log(err);
        }else{
            res.send(result);
        }
    }
    )
})

app.put ("/update", (req,res) => {
    const id = req.body.id
    const nombre =  req.body.nombre;
    const edad =  req.body.edad;
    const pais =  req.body.pais;
    const cargo =  req.body.cargo;
    const antiguedad =  req.body.antiguedad;
    
    db.query('update empleados set nombre= ?,edad = ?,pais = ?,cargo= ?,antiguedad= ? WHERE id =?', [nombre,edad,pais,cargo,antiguedad,id],
    (err,result) => {
        if (err) {
            console.log(err);
        }else {
            res.send(result)
        }
    }
);

});

app.delete ("/delete/:id", (req,res) => {
    const id = req.params.id
      
    db.query('delete from empleados WHERE id =?', id,
    (err,result) => {
        if (err) {
            console.log(err);
        }else {
            res.send(result)
        }
    }
);

});