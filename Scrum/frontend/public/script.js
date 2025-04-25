// URL base de la API (ajústala según la configuración; 
// recuerda que en docker-compose el backend corre en el puerto 3000)
const API_BASE_URL = 'http://localhost:3000/api';

// Función para obtener y mostrar los medicamentos en la tabla
function fetchMedicamentos() {
  fetch(`${API_BASE_URL}/medicamentos`)
    .then(response => {
      if (!response.ok) {
        throw new Error('Error al obtener medicamentos');
      }
      return response.json();
    })
    .then(data => {
      const tbody = document.querySelector('#medicamentosTable tbody');
      tbody.innerHTML = ''; // Limpiar la tabla antes de agregar
      data.forEach(med => {
        const tr = document.createElement('tr');
        tr.innerHTML = `
          <td>${med.idMedicamento}</td>
          <td>${med.nombre}</td>
          <td>${med.cantidadInventario}</td>
          <td>${med.fechaVencimiento}</td>
          <td>${med.precio}</td>
          <td>${med.proveedor}</td>
          <td><button class="delete-btn" data-id="${med.idMedicamento}">Eliminar</button></td>
        `;
        tbody.appendChild(tr);
      });
    })
    .catch(error => {
      console.error(error);
      alert('Error al cargar los medicamentos');
    });
}

// Función para enviar el formulario y agregar un nuevo medicamento
function setupForm() {
  const form = document.getElementById('addMedicamentoForm');
  form.addEventListener('submit', function(e) {
    e.preventDefault();

    // Recoger datos del formulario
    const newMedicamento = {
      idMedicamento: document.getElementById('idMedicamento').value,
      nombre: document.getElementById('nombre').value,
      cantidadInventario: Number(document.getElementById('cantidadInventario').value),
      fechaVencimiento: document.getElementById('fechaVencimiento').value,
      precio: Number(document.getElementById('precio').value),
      proveedor: document.getElementById('proveedor').value
    };

    // Enviar el nuevo medicamento vía POST
    fetch(`${API_BASE_URL}/medicamentos`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newMedicamento)
    })
    .then(response => {
      if (!response.ok) {
        return response.json().then(errData => {
          throw new Error(errData.error || 'Error al agregar medicamento');
        });
      }
      return response.json();
    })
    .then(() => {
      // Limpiar el formulario
      form.reset();
      // Refrescar la tabla de medicamentos
      fetchMedicamentos();
    })
    .catch(error => {
      console.error(error);
      alert(error.message);
    });
  });
}

// Cuando se carga el documento, inicializar la página
document.addEventListener('DOMContentLoaded', () => {
  fetchMedicamentos();
  setupForm();
});
