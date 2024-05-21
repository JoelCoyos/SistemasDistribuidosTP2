async function cargarDatos()
{
    const response = await fetch("http:servidor:8080/datos");
    const result = await response.json();
}