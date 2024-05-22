
const express = require("express");
const app = express()
const port = 8083;


app.get("/", async (req, res) => {
    res.status(200)
    res.sendFile(path.joiin(__dirname,"public","index.html"))
  })
  
app.listen(port, () => {
    console.log(`Listening at http://localhost:${port}`)
})