const express = require("express")
//const axios = require("axios")

const app = express()
const port = 8083;

//app.get("/datos",async (req,res)=>
//{
  //Agarrar los datos de la base de datos
//});


app.get("/", async (req, res) => {
    res.status(200)
    res.sendFile(path.joiin(__dirname,"public","index.html"))
  })
  
app.listen(port, () => {
    console.log(`Listening at http://localhost:${port}`)
})