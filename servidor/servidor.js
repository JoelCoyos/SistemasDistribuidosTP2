const express = require("express");
const cors = require('cors')
const nano = require('nano')('http://admin:admin@172.17.0.2:5984'); 
const app = express()
const port = 8081;
let db;

app.use(express.json())
app.use(cors());

async function createDatabase() {
      try {
          await nano.db.create('datos_aleatorios');
          db = nano.use('datos_aleatorios');
          console.log("Base de datos 'datos_aleatorios' creada correctamente");
          return;
      } catch (error) {
        console.error("Error al crear la base de datos 'datos_aleatorios':", error);
      }
 }

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
    //console.log("Datos insertados correctamente:");
  } catch (error) {
    console.error("Error al insertar datos en la base de datos: (servidor.js)", error);
  }
}
app.post("/insertar", async (req,res) => {
  try{
    console("Tratando de insertar")
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
      insertarDatos();
      console.log(`Server is running on port ${port}`);
      setInterval(insertarDatos,1000);
  } catch (error) {
      console.error('Failed to initialize server:', error.message);
  }
});