const express = require("express");
const app = express()
const port = 8080;


app.get("/", async (req, res) => {
    res.status(200)
    res.sendFile(path.join(__dirname,"public","index.html"))
  })

  app.get('/datos', async (req, res) => {
    try {
        const response = await axios.get('http://servidor:8081/datos');
        console.log(response)
        res.json(response.data);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.post('/insertar', async (req, res) => {
    try {
        const { nombre, edad } = req.body; // Se espera que el cuerpo de la solicitud contenga nombre y edad
        await axios.post('http://servidor:8081/insertar', { nombre, edad });
        res.status(200).json({ message: 'Datos insertados correctamente' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.listen(port, () => {
    console.log(`Server is listening at http://localhost:${port}`);
});