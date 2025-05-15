document.addEventListener('DOMContentLoaded', async () => {
  const params = new URLSearchParams(window.location.search);
  const id = params.get('id');

  if (!id) {
    alert('ID de medicamento no proporcionado.');
    return;
  }

  try {
    const response = await fetch(`http://localhost:3000/api/medicamentos/${id}`);
    if (!response.ok) {
      throw new Error('No se pudo obtener el medicamento');
    }

    const producto = await response.json();

    // Usar nombres exactos de la API
    document.getElementById('producto-nombre').textContent = producto.nombre ?? 'Sin nombre';
    document.getElementById('producto-descripcion').textContent = producto.proveedor ?? 'Sin proveedor';

    // Actualizar el precio
    const precio = Number(producto.precio);
    document.getElementById('producto-precio').textContent = isNaN(precio) ? 'Precio no disponible' : `$${precio.toFixed(2)}`;

    // Actualizar cantidad
    const cantidad = Number(producto.cantidadinventario);
    document.getElementById('producto-cantidad').textContent = isNaN(cantidad) || cantidad <= 0 ? 'Cantidad no disponible' : `${cantidad} unidades disponibles`;

    // Actualizar la imagen
    const img = document.getElementById('producto-img');
    if (producto.imagenurl && producto.imagenurl.trim() !== '') {
      img.src = producto.imagenurl;
      img.alt = producto.nombre;
    } else {
      img.src = 'https://cdn-icons-png.freepik.com/512/10809/10809585.png'; 
      img.alt = 'Imagen no disponible';
    }

  } catch (error) {
    console.error('Error al cargar el medicamento:', error.message);
    alert('Error al cargar el medicamento: ' + error.message);
  }
});



