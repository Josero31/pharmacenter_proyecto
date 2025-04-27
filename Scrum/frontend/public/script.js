// URL base de la API (ajústala según la configuración; 
// recuerda que en docker-compose el backend corre en el puerto 3000)
const API_BASE_URL = 'http://localhost:3000/api';


// Función para manejar la eliminación
function setupDeleteButtons() {
  document.querySelectorAll('.delete-btn').forEach(button => {
    button.addEventListener('click', function(e) {
      e.stopPropagation();
      const id = this.dataset.id;
      
      if (confirm('¿Estás seguro de querer eliminar este medicamento?')) {
        fetch(`${API_BASE_URL}/medicamentos/${id}`, {
          method: 'DELETE'
        })
        .then(response => {
          if (!response.ok) throw new Error('Error al eliminar');
          return response.json();
        })
        .then(() => {
          alert('Medicamento eliminado correctamente');
          fetchMedicamentos(); // Recargar la tabla
        })
        .catch(error => {
          console.error(error);
          alert('Error al eliminar el medicamento');
        });
      }
    });
  });
}

// Función para obtener y mostrar los medicamentos en la tabla
function fetchMedicamentos() {
  fetch(`${API_BASE_URL}/medicamentos`)
    .then(response => {
      if (!response.ok) throw new Error('Error al obtener medicamentos');
      return response.json();
    })
    .then(data => {
      const tbody = document.querySelector('#medicamentosTable tbody');
      tbody.innerHTML = '';
      
      data.forEach(med => {
        const tr = document.createElement('tr');
        const fechaVencimiento = new Date(med.fechavencimiento);
        const fechaFormateada = fechaVencimiento.toISOString().split('T')[0];

        tr.innerHTML = `
          <td>${med.idmedicamento}</td>
          <td class="editable-cell nombre-cell">
            ${med.nombre}
            <button class="delete-btn" data-id="${med.idmedicamento}" title="Eliminar">🚯</button>
            <button class="edit-btn" data-id="${med.idmedicamento}" data-field="nombre">✏️</button>
          </td>
          <td class="editable-cell">
            ${med.cantidadinventario}
            <button class="edit-btn" data-id="${med.idmedicamento}" data-field="cantidadinventario">✏️</button>
          </td>
          <td class="editable-cell">
            ${fechaFormateada}
            <button class="edit-btn" data-id="${med.idmedicamento}" data-field="fechavencimiento">✏️</button>
          </td>
          <td class="editable-cell">
            ${Number(med.precio)} <!-- Conversión explícita a número -->
            <button class="edit-btn" data-id="${med.idmedicamento}" data-field="precio">✏️</button>
          </td>
          <td class="editable-cell">
            ${med.proveedor}
            <button class="edit-btn" data-id="${med.idmedicamento}" data-field="proveedor">✏️</button>
          </td>
        `;
        
        tbody.appendChild(tr);
      });
      
      enableInlineEditing();
      setupDeleteButtons();
    })
    .catch(error => {
      console.error('Error:', error);
      alert('Error al cargar medicamentos: ' + error.message);
    });
}

// Configurar evento al cargar la página
document.addEventListener('DOMContentLoaded', () => {
  fetchMedicamentos();
  setupForm();
});
// Función para enviar el formulario y agregar un nuevo medicamento
function setupForm() {
  const form = document.getElementById('addMedicamentoForm');
  form.addEventListener('submit', function(e) {
    e.preventDefault();

    // Recoger datos del formulario (sin idMedicamento)
    const newMedicamento = {
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


// Función para activar la edición en línea
function enableInlineEditing() {
  document.querySelectorAll('.edit-btn').forEach(button => {
    button.addEventListener('click', function (e) {
      const td = e.target.parentElement;
      const field = e.target.dataset.field;
      const id = e.target.dataset.id;
      console.log('ID para editar:', id); // 🛠️ Depuración
      const currentValue = td.firstChild.textContent.trim();

      // Reemplazar contenido por input
      const input = document.createElement('input');
      input.type = (field === 'precio' || field === 'cantidadInventario') ? 'number' : 'text';
      input.value = currentValue;
      input.style.width = '80%';

      td.innerHTML = '';
      td.appendChild(input);
      input.focus();

      // Guardar al salir del input o presionar Enter
      const saveChanges = () => {
        const newValue = input.value;
        fetch(`${API_BASE_URL}/medicamentos/${id}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            [field]: field === 'precio' || field === 'cantidadInventario' ? Number(newValue) : newValue
          })
        })
        
        .then(response => {
          if (!response.ok) throw new Error('Error al actualizar');
          return response.json();
        })
        .then(() => fetchMedicamentos()) // Recargar tabla
        .catch(err => alert(err.message));
      };

      input.addEventListener('blur', saveChanges);
      input.addEventListener('keydown', e => {
        if (e.key === 'Enter') {
          input.blur(); // Disparará blur -> guarda
        }
      });
    });
  });
}

