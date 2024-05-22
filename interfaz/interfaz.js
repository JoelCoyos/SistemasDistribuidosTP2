const express = require("express");

//const db = nano.db.use("datos_aleatorios"); //usa la base de datos llamada datos_aleatorios, para probar aunque lo prolijo seria create

const nano = require('nano')('http://localhost:5984'); //en internet figura que hay que poner http://admin:admin@localhost:5984
const app = express()
const port = 8080;

nano.db.list((err, body) => { //no iria pero es para ver si se realizo la conexion y arroja error
  if (err) {
    console.error("Error al listar las bases de datos:", err);
  } else {
    console.log("Bases de datos disponibles:", body);
  }
});

function generarDatosAleatorios(){
  return {
    nombre: "Usuario" + Math.floor(Math.random()*1000),
    edad: Math.floor(Math.random()*100),
  };
}

app.get("/datos",async (req,res)=>
{
  const datos = generarDatosAleatorios();
  try{
    const result = await db.insert(datos);
    res.status(200).json(result);
  } catch (error){
    res.status(500).json({ error: "Error al insertar datos en la base de datos"});
  }
});


app.get("/", async (req, res) => {
    res.setHeader("Content-Type", "text/html");
    res.status(200);
    res.send("<h1>Hello world</h1>");
  });
  
app.listen(port, () => {
    console.log(`Server is listening at http://localhost:${port}`);
});