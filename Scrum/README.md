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



## **🔧 Estructura del Proyecto**  
```bash
pharmacenter_proyecto/
├── backend/          # API con Node.js y Express
├── frontend/         # Interfaz web (HTML/JS básico o React/Vue si escalan)
├── database/         # Scripts SQL iniciales
└── docker-compose.yml # Configuración de contenedores
```
## **endpoints** CRUD medicamentos 


Método	Ruta	Acción
GET	/api/medicamentos	Listar todos los medicamentos
GET	/api/medicamentos/:id	Obtener un medicamento específico
POST	/api/medicamentos	Crear un nuevo medicamento
PUT	/api/medicamentos/:id	Actualizar un medicamento
DELETE	/api/medicamentos/:id	Eliminar un medicamento

🔗 **Documentación útil:**  
- [Docker Compose](https://docs.docker.com/compose/)  
- [Express.js](https://expressjs.com/)  
- [PostgreSQL](https://www.postgresql.org/docs/)



**Equipo PharmaCenter © 2025**
