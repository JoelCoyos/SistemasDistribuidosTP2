const express = require("express");
const axios = require('axios');
const app = express()
const port = 8080;
const path = require('path');

app.use(express.static(path.join(__dirname, 'public')));


app.get("/", async (req, res) => {
    res.status(200)
    res.sendFile(path.join(__dirname,"public","index.html"))
  })

  app.get('/datos', async (req, res) => {
    try {
        const response = await axios.get('http://172.17.0.3:8081/datos');
        console.log(response)
        res.json(response.data);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});
  
app.listen(port, () => {
    console.log(`Listening at http://localhost:${port}`)
})