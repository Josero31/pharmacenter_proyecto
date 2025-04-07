# 📂 Estructura del Proyecto

Este proyecto está organizado en las siguientes carpetas:

---

## 📁 `backend/`
Contiene todo el **código del servidor** (API).

- **`src/`**: Código fuente del backend.
  - **`app.js`** (o **`main.py`**): Archivo principal donde se configura y levanta el servidor.
  - **`controllers/`**: Funciones que controlan la lógica de cada ruta (por ejemplo: manejo de login, registro, etc.).
  - **`models/`**: Definición de las estructuras de datos o esquemas de la base de datos (por ejemplo: modelo de usuario).
  - **`routes/`**: Define los endpoints de la API (por ejemplo: rutas de autenticación).
  - **`utils/`**: Funciones auxiliares (por ejemplo: encriptar contraseñas).
- **`package.json`**: Archivo de configuración de Node.js (dependencias, scripts, etc.).
- **`Dockerfile`**: Archivo para contenerizar el backend con Docker.

---

## 📁 `frontend/`
Contiene todo el **código del cliente** (lo que ve el usuario).

- **`public/`**: Archivos públicos como el `index.html`, imágenes, etc.
- **`src/`**: Código fuente del frontend.
  - **`components/`**: Componentes reutilizables (por ejemplo: botones, inputs, headers).
  - **`pages/`**: Páginas principales de la app (por ejemplo: Login, Home, Dashboard).
  - **`App.jsx`**: Archivo principal donde se configura la navegación entre páginas.
- **`package.json`**: Archivo de configuración del frontend (React, Vite, etc.).
- **`Dockerfile`**: Archivo para contenerizar el frontend con Docker.

---

## 📁 `database/`
Contiene todo lo relacionado con la **base de datos**.

- **`init.sql`**: Script para crear las tablas y poblar datos iniciales.
- **`Dockerfile`**: (Opcional) Archivo para contenerizar la base de datos.

---

## 📁 `docs/`
Contiene la **documentación** del proyecto.

- **`README.md`**: Manual técnico o instrucciones de despliegue.
- **`planificación-sprint1.docx`**: Documentos importantes de planificación.

---

## 📄 Archivos raíz

- **`docker-compose.yml`**: Archivo que orquesta todos los servicios (backend, frontend, base de datos).
- **`.gitignore`**: Define qué archivos deben ser ignorados por Git.
- **`README.md`**: Archivo principal de documentación del proyecto.

### DOCKER 🐳🐳🐳

# **📦 PharmaCenter - Docker Setup Guide**  
*Para el equipo de desarrollo*  

---

## **🚀 Instalación y Uso con Docker**  
**Requisitos:**  
- Docker instalado ([Descargar aquí](https://www.docker.com/get-started))  
- Docker Compose (viene con Docker Desktop)  

### **1. Clonar el repositorio**  
```bash
git clone https://github.com/Josero31/pharmacenter_proyecto.git
cd pharmacenter_proyecto
```

### **2. Iniciar los contenedores**  
```bash
docker-compose up --build
```  
**Servicios disponibles:**  
- **Frontend:** `http://localhost`  
- **Backend (API):** `http://localhost:3000`  
- **PostgreSQL:** Puerto `5432` (usuario: `pharma_user`, contraseña: `pharma_password123`)  

---

## **🔧 Estructura del Proyecto**  
```bash
pharmacenter_proyecto/
├── backend/          # API con Node.js y Express
├── frontend/         # Interfaz web (HTML/JS básico o React/Vue si escalan)
├── database/         # Scripts SQL iniciales
└── docker-compose.yml # Configuración de contenedores
```

---

## **📌 Reglas para Desarrollo**  

### **1. ¿Cuándo crear una nueva API?**  
✅ **Sí:**  
- Nuevas entidades (Ej: `Reportes`, `Proveedores`)  
- Funcionalidades complejas (Ej: `Exportar PDF`)  
- Microservicios independientes  

❌ **No:**  
- Endpoints simples (usar rutas existentes en `server.js`)  
- Consultas CRUD básicas (extender `userRoutes.js`)  

### **2. Dependencias permitidas** 
# **Se discutira en caso de que necesitemos mas**
**Backend (`package.json`):**  
```json
"dependencies": {
  "express": "^4.x",
  "pg": "^8.x",       # PostgreSQL
  "cors": "^2.x",     # Permisos CORS
  "dotenv": "^16.x"   # Variables de entorno
},
"devDependencies": {
  "nodemon": "^3.x"   # Solo desarrollo
}
```

**Frontend (`package.json` si usan React/Vue):**  
```json
"dependencies": {
  "react": "^18.x",
  "axios": "^1.x"     # Para llamadas API
}
```

---

## **🔍 Pruebas de Funcionalidades**  

### **1. Login**  
**Endpoint:** `POST /api/login`  
**Cuerpo de ejemplo:**  
```json
{
  "email": "admin@pharmacenter.com",
  "password": "secreto123"
}
```

### **2. Navegación**  
- Usar `fetch` en el frontend para cargar datos:  
```javascript
fetch('http://localhost:3000/api/medicamentos')
  .then(res => res.json())
  .then(data => console.log(data));
```

### **3. Inventario**  
**Endpoints:**  
- `GET /api/medicamentos` → Listar todos  
- `POST /api/medicamentos` → Añadir nuevo  
- `PUT /api/medicamentos/:id` → Actualizar  

---


🔗 **Documentación útil:**  
- [Docker Compose](https://docs.docker.com/compose/)  
- [Express.js](https://expressjs.com/)  
- [PostgreSQL](https://www.postgresql.org/docs/)

  ### **ENDPOINTS MAS DETALLADOS**
# **📋 API Endpoints & Frontend Calls - PharmaCenter**

## **🔗 Backend API Endpoints (Actuales)**

### **1. Autenticación**
```javascript
POST    /api/login          // Login de usuario
POST    /api/logout         // Cerrar sesión
```

### **2. Usuarios**
```javascript
GET     /api/usuarios       // Listar todos los usuarios
GET     /api/usuarios/:id   // Obtener usuario específico
POST    /api/usuarios       // Crear nuevo usuario
PUT     /api/usuarios/:id   // Actualizar usuario
DELETE  /api/usuarios/:id   // Eliminar usuario
```

### **3. Medicamentos**
```javascript
GET     /api/medicamentos              // Listar todos
GET     /api/medicamentos/:id          // Detalles de medicamento
POST    /api/medicamentos              // Añadir nuevo
PUT     /api/medicamentos/:id          // Actualizar
DELETE  /api/medicamentos/:id          // Eliminar
GET     /api/medicamentos/vencimiento  // Listar por fecha de vencimiento
```

### **4. Ventas**
```javascript
POST    /api/ventas               // Registrar nueva venta
GET     /api/ventas/:id           // Detalles de venta
GET     /api/ventas/usuario/:id   // Ventas por usuario
```

### **5. Reportes**
```javascript
GET     /api/reportes/stock-bajo    // Medicamentos con stock bajo
POST    /api/reportes/generar-pdf   // Generar reporte PDF
```


---

## **📌 Notas Importantes**
1. **URL Base**: Todas las llamadas usan `http://localhost:3000` en desarrollo
2. **Errores**: Siempre verificar `response.ok` antes de procesar datos
3. **CORS**: El backend ya tiene configurado CORS para aceptar peticiones del frontend


--- 

**Equipo PharmaCenter © 2025**
