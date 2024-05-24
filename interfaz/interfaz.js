const express = require("express");
const bodyParser = require('body-parser')
const axios = require("axios")
const path = require('path')
const app = express()
app.use(bodyParser.json());
const port = 8080;

app.use(express.static(path.join(__dirname, 'public')));

app.get("/", async (req, res) => {
    res.status(200)
    res.sendFile(path.join(__dirname,"public","index.html"))
  })

app.get('/datos', async (req, res) => {
    try {
        console.log("Pidiendo datos...")
        const response = await axios.get('http://172.17.0.3:8081/datos');
        res.json(response.data);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.post('/insertar', async (req, res) => {
    try {
        console.log("Llega aca???")
        const { nombre, edad } = req.body; // Se espera que el cuerpo de la solicitud contenga nombre y edad
        await axios.post('http://172.17.0.3:8081/insertar',
        {
            nombre:nombre,
            edad:edad
        });
        res.status(200).json({ message: 'Datos insertados correctamente' });
    } catch (error) {
        console.log(error.message)
        res.status(500).json({ error: error.message });
    }
});

app.listen(port, () => {
    console.log(`Server is listening at http://localhost:${port}`);
});