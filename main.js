const contactoForm = document.getElementById('contacto-form');
const inputNombre = document.getElementById('inputNombre');
const inputApellido = document.getElementById('inputApellido');
const inputTelefono = document.getElementById('inputTelefono');
const bodyTabla = document.getElementById('body-tabla');
let contactos = [];


function agregarContacto(nombre, apellido, telefono) {
    contactos.push({
        nombre,
        apellido: apellido,
        telefono: telefono,
    })
}

function eliminarContacto(indice) {
    contactos.splice(indice, 1);
    mostrarContactos();
}

function mostrarContactos() {
    bodyTabla.innerHTML = '';
    contactos.forEach(function (contacto, indice) {
        bodyTabla.innerHTML += `<tr>
        <th scope="row">${indice + 1}</th>
        <td>${contacto.nombre}</td>
        <td>${contacto.apellido}</td>
        <td>${contacto.telefono}</td>
        <td>
        <button class="btn btn-warning" onclick="editarContacto(${indice})">Editar</button>
        <button class="btn btn-danger" onclick="eliminarContacto(${indice})">Eliminar</button>        
        </td>
        </tr>`
    })
    guardarContactosStorage();
}

function editarContacto(indice) {
    contactos[indice].nombre = prompt('Ingresa un nuevo nombre.', 'Nuevo nombre');
    contactos[indice].apellido = prompt('Ingresa un nuevo apellido.', 'Nuevo apellido');
    contactos[indice].telefono = prompt('Ingresa un nuevo telefono.', 'Nuevo telefono');
    mostrarContactos();
}

function editarContactoPrompt(indice, nombre, apellido, telefono) {
    contactos[indice].nombre = nombre;
    contactos[indice].apellido = apellido;
    contactos[indice].telefono = telefono;

    mostrarContactos();
}

contactoForm.addEventListener('submit', function (event) {
    event.preventDefault();

    if (inputNombre.value.trim() !== '' && inputApellido.value.trim() !== '' && inputTelefono.value.trim() !== '') {

        bodyTabla.innerHTML = '';

        agregarContacto(inputNombre.value, inputApellido.value, inputTelefono.value);

        mostrarContactos();

        event.target.reset();
    } else {
        alert('Los 3 campos son obligatorios');
    }
});

function guardarContactosStorage() {
    const contactosGuardar = JSON.stringify(contactos);
    localStorage.setItem('contactos', contactosGuardar);
}

function obtenerContactosStorage() {
    const contactosStorage = localStorage.getItem('contactos');
    if (contactosStorage == null) {
        contactos = [];
    } else {
        contactos = JSON.parse(contactosStorage);
    } 
}

obtenerContactosStorage()
mostrarContactos();