document.addEventListener('DOMContentLoaded', () => {
    const insertForm = document.getElementById('insert');
    const dataElement = document.getElementById('data');

    insertForm.addEventListener('submit', async (event) => {
        event.preventDefault();

        const nombreInput = document.getElementById('nombre');
        const edadInput = document.getElementById('edad');

        const nombre = nombreInput.value.trim();
        const edad = parseInt(edadInput.value);

        if (nombre === '' || isNaN(edad)) {
            alert('Por favor, introduce un nombre válido y una edad numérica.');
            return;
        }

        try {
            const response = await fetch('/insertar', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({nombre:nombre,edad:edad })
            });

            if (!response.ok) {
                throw new Error('Error al insertar datos.');
            }

            nombreInput.value = '';
            edadInput.value = '';
        } catch (error) {
            console.error('Error al insertar datos:', error);
            alert('Se produjo un error al insertar datos. Por favor, inténtalo de nuevo.');
        }
    });





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
});