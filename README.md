# Gestión de Videojuegos

## Endpoints

### Health
- `GET /health`: Verificar el estado de la API.

### Videogame
- `POST /videogame`: Crear un nuevo videojuego.
- `GET /videogame`: Obtener todos los videojuegos.
- `GET /videogame/:id`: Obtener un videojuego específico por ID.
- `PATCH /videogame/:id`: Actualizar un videojuego específico por ID.
- `DELETE /videogame/:id`: Eliminar un videojuego específico por ID.

## Pruebas de Carga y Estrés

Utilizamos [k6](https://k6.io/) para las pruebas de carga y estrés.

### Requisitos
- [k6](https://k6.io/docs/getting-started/installation/) instalado en tu sistema.
- La aplicación debe estar ejecutándose (`npm run start:dev`).

### Ejecutar Pruebas de Carga
Este script simula una carga moderada de hasta 100 usuarios concurrentes.

```bash
npm run k6:load
```

### Ejecutar Pruebas de Estrés
Este script simula una carga pesada, escalando hasta 300 usuarios concurrentes para probar los límites del sistema.

```bash
npm run k6:stress
```

### Notas
- Los resultados se enviarán a la nube de k6 (configurado en el script).
- Asegúrate de haber iniciado sesión en k6 cloud si es necesario (`k6 login cloud`).
