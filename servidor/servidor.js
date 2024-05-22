const express = require("express");
const nano = require('nano')('http://admin:admin@172.17.0.2:5984'); 
const db = nano.db.use('datos_aleatorios');
const app = express()
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
    console.log("Datos insertados correctamente:", result);
  } catch (error) {
    console.error("Error al insertar datos en la base de datos:", error);
  }
}

setInterval(insertarDatos, 1000); // Insertar datos cada segundo