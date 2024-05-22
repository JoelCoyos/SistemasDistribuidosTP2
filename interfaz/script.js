async function cargarDatos()
{
    const response = await fetch("http:servidor:8080/datos")
    const result = await response.json();
    const datos = document.getElementById("data")
    datos.innerHTML = ""
    result.rows.array.forEach(row => {
        const li = document.createElement("li");
        li.textContent = row.doc.value;
        datos.appendChild(li)
    })
}

document.getElementById('insertForm').addEventListener('submit', async (event) => {
    event.preventDefault();
    const value = document.getElementById('value').value;
    const response = await fetch('http://servidor:8082/insert', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ value: parseInt(value, 10) })
    });
    const result = await response.json();
    console.log(result);
    cargarDatos();
});

//cargarDatos()