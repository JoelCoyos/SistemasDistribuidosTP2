const express = require("express");
//const axios = require("axios")

const app = express()
const port = 8080;

//app.get("/datos",async (req,res)=>
//{
  //Agarrar los datos de la base de datos
//});


app.get("/", async (req, res) => {
    res.setHeader("Content-Type", "text/html");
    res.status(200);
    res.send("<h1>Hello world</h1>");
  });
  
app.listen(port, () => {
    console.log(`Server is listening at http://localhost:${port}`);
});