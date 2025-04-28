let currentSlide = 0;
let slides;

// Mostrar slide
function showSlide(index) {
  slides.forEach(slide => slide.classList.remove('active'));
  slides[index].classList.add('active');
}

// Mover carrusel
function moveCarousel(direction) {
  currentSlide += direction;
  if (currentSlide < 0) currentSlide = slides.length - 1;
  if (currentSlide >= slides.length) currentSlide = 0;
  showSlide(currentSlide);
}

// Sidebar
const sidebar = document.getElementById('sidebar');
const openSidebarBtn = document.getElementById('openSidebar');
const closeSidebarBtn = document.getElementById('closeSidebar');
const overlay = document.getElementById('overlay');

openSidebarBtn.onclick = () => {
  sidebar.classList.add('open');
  overlay.classList.add('active');
};

closeSidebarBtn.onclick = () => {
  sidebar.classList.remove('open');
  overlay.classList.remove('active');
};

overlay.onclick = () => {
  sidebar.classList.remove('open');
  overlay.classList.remove('active');
};

// Cargar medicamentos
async function cargarMedicamentos() {
  const loadingMeds = document.getElementById('loadingMedicamentos');
  try {
    const response = await fetch('http://localhost:3000/api/medicamentos');
    const medicamentos = await response.json();
    const catalog = document.getElementById('medCatalog');

    medicamentos.forEach(medicamento => {
      const card = document.createElement('div');
      card.className = 'card';
      card.innerHTML = `
        <h3>${medicamento.nombre}</h3>
        <p>Cantidad: ${medicamento.cantidadinventario}</p>
        <p>Precio: $${medicamento.precio}</p>
        <p>Proveedor: ${medicamento.proveedor}</p>
      `;
      catalog.appendChild(card);
    });

    loadingMeds.style.display = 'none'; // Ocultar el mensaje de "Cargando medicamentos..."
  } catch (error) {
    console.error('Error al cargar medicamentos:', error);
    loadingMeds.innerText = "Error al cargar medicamentos.";
  }
}

// Carrusel medicamentos
function moveMedCarousel(direction) {
  const catalog = document.getElementById('medCatalog');
  const scrollAmount = catalog.clientWidth;
  catalog.scrollBy({
    left: direction * scrollAmount,
    behavior: 'smooth'
  });
}

// Inicializar todo
document.addEventListener('DOMContentLoaded', async () => {
  slides = document.querySelectorAll('.carousel-item');
  showSlide(currentSlide);

  await cargarMedicamentos();

  // Cuando todo esté listo, quitar loader
  document.getElementById('loader').style.display = 'none';
  document.getElementById('content').style.display = 'block';
});
