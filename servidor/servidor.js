const express = require("express");
const cors = require('cors')
const nano = require('nano')('http://admin:admin@basededatos:5984'); 
const app = express()
const cors = require('cors')
const port = 8081;

// Crear la base de datos "datos_aleatorios"
nano.db.create('datos_aleatorios', function(err, body) {
  if (err) {
    console.error("Error al crear la base de datos 'datos_aleatorios':", err);
  } else {
    console.log("Base de datos 'datos_aleatorios' creada correctamente");
  }
});

function generarDatoAleatorios(){
  return {
    nombre: "Usuario" + Math.floor(Math.random()*1000),
    edad: Math.floor(Math.random()*100),
  };
}

app.get("/datos", async (req, res) => {
  try
  {
    console.log("Recibio pedido datos")
    const datos = await db.list({include_docs:true});
    res.json(datos);
  }
  catch(error)
  {
    res.status(500).json({error:error.message});
  }
});




// Función para insertar datos en la base de datos
async function insertarDatos() {
  try {
    const datos = generarDatoAleatorios();
    const result = await db.insert(datos);
    //console.log("Datos insertados correctamente:");
  } catch (error) {
    console.error("Error al insertar datos en la base de datos: (servidor.js)", error);
  }
}
app.post("/insertar", async (req,res) => {
  try{
    const { nombre, edad } = req.body;
    const result = await db.insert({ nombre, edad });
    console.log("Datos insertados manualmente correctamente", { nombre, edad });
    res.status(200).json({ message: "Datos insertados correctamente"});

  } catch (error) {
    console.error("Error al insertar datos en la base de datos: (servidor) ", error);
    res.status(500).json({ error: "Error al insertar datos en la base de datos(servidor)" });0

  }
});

app.listen(port, async () => {
  try {
      await createDatabase();
  } catch (error) {
      console.error('Failed to initialize server:', error.message);
  }
});