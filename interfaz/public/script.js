async function cargarDatos()
{
    const response = await fetch('/datos')
    const result = await response.json();
    const datos = document.getElementById("data")
    datos.innerHTML = ""
    result.rows.forEach(row => {
        const li = document.createElement("li");
        li.textContent = `Nombre: ${row.doc.nombre}, Edad: ${row.doc.edad}`;
        datos.appendChild(li)
    })
}

cargarDatos()