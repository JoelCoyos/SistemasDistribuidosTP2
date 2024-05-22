const express = require("express");
const nano = require('nano')('http://admin:admin@172.17.0.2:5984'); 
const app = express()
const port = 8080;

// Crear la base de datos "datos_aleatorios"
nano.db.create('datos_aleatorios', function(err, body) {
  if (err) {
    console.error("Error al crear la base de datos 'datos_aleatorios':", err);
  } else {
    console.log("Base de datos 'datos_aleatorios' creada correctamente");
  }
});

function generarDatosAleatorios(){
  return {
    nombre: "Usuario" + Math.floor(Math.random()*1000),
    edad: Math.floor(Math.random()*100),
  };
}



app.get("/datos", (req, res) => {
  // Crear la instancia de la base de datos 'db' utilizando nano.db.use
  const db = nano.db.use('datos_aleatorios');

  // Función para insertar datos en la base de datos
  async function insertarDatos() {
    try {
      const datos = generarDatosAleatorios();
      const result = await db.insert(datos);
      console.log("Datos insertados correctamente:", result);
    } catch (error) {
      console.error("Error al insertar datos en la base de datos:", error);
    }
  }

  // Insertar datos inicialmente y luego cada segundo
  insertarDatos(); // Insertar datos inicialmente
  setInterval(insertarDatos, 1000); // Insertar datos cada segundo

  res.status(200).json({ message: "Generando datos constantemente" });
});



app.get("/", async (req, res) => {
    res.setHeader("Content-Type", "text/html");
    res.status(200);
    res.send("<h1>Hello world</h1>");
  });
  
app.listen(port, () => {
    console.log(`Server is listening at http://localhost:${port}`);
});