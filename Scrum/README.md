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

---
