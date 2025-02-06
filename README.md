# Banco Eléctronico Argentino (BEA) - MERN Stack

Este proyecto es una aplicación bancaria  para participar en el cohorte Nocountry desarrollada con el stack MERN(MongoDB, Express.js, React, Node.js). Permite a los usuarios gestionar cuentas, realizar transacciones, comprar y vender dólares, entre otras funcionalidades.

## 📌 Características
- Registro e inicio de sesión con autenticación JWT.
- Gestión de cuentas bancarias en pesos y dólares.
- Compra y venta de dólares con límites diarios para usuarios estándar.
- Transferencias entre cuentas.
- Administración de solicitudes de usuario (cancelaciones, soporte técnico, etc.).

## 🛠️ Tecnologías utilizadas
- **Frontend:** React.js (con Tailwind CSS para estilos).
- **Backend:** Node.js con Express.js.
- **Base de datos:** MongoDB (Mongoose).
- **Autenticación:** JSON Web Tokens (JWT).
- **Servicios externos:** OpenExchangeRates API para obtener tasas de cambio.

## 🚀 Enlaces de despliegue

- **Backend**: [BEA-API](https://b-e-a-api.onrender.com)
- **Frontend**: [BEA](https://radiant-crisp-7e2bd3.netlify.app/)

## 🚀 Instalación y configuración
### 1️⃣ Clonar el repositorio
```bash
 git clone https://github.com/No-Country-simulation/c23-96-webapp/tree/main/server.git
 cd c23-96-webapp
```

### 2️⃣ Instalar dependencias
#### Backend
```bash
 cd server
 npm install
```

#### Frontend
```bash
 cd client
 npm install
```

### 3️⃣ Configurar variables de entorno
Crear un archivo `.env` en la carpeta `server` y definir las siguientes variables:
```env
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key
OPEN_EXCHANGE_APP_ID=your_open_exchange_api_key
```
Crear un archivo `.env` en la carpeta `client` y definir las siguientes variables:
```env
REACT_APP_BACKEND_URL=your_backend_url
```
### 4️⃣ Ejecutar el proyecto
#### Iniciar backend
```bash
 cd server
 npm start // npm run dev
```

#### Iniciar frontend
```bash
 cd client
 npm start // npm run dev
```

## 📖 Uso de la API
### Endpoints principales
| Método | Endpoint | Descripción |
|--------|---------|-------------|
| `POST` | `/api/auth/register` | Registrar un usuario |
| `POST` | `/api/auth/login` | Iniciar sesión |
| `GET` | `/api/accounts/:id` | Obtener información de una cuenta |
| `POST` | `/api/transactions/buy-dollars/:Account` | Comprar dólares |
| `POST` | `/api/transactions/sell-dollars/:Account` | Vender dólares |
| `DELETE` | `/api/offers/:id` | Eliminar una oferta |

## 📌 Posibles mejoras a implementar
- Implementación de notificaciones en tiempo real con WebSockets.
- implementación de sistema de peticiones de usuario y comunicación con soporte técnico.

## 📄 Licencia
Este proyecto está bajo la licencia MIT. ¡Puedes usarlo, modificarlo libremente! 

## 📝 Autores
- **Alejandro Perren** - [GitHub](https://github.com/AlejandroPerren) - [LinkedIn](www.linkedin.com/in/ale-perren-52094a214) 
- **Moisarm** - [GitHub](https://github.com/Moisarm)