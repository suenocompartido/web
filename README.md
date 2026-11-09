
  # High-fidelity website design

  This is a code bundle for High-fidelity website design. The original project is available at https://www.figma.com/design/Q6lrQwKQA7Xikx2HZq6nwG/High-fidelity-website-design.

  ## Running the code

  Run `npm i` to install the dependencies.

  Run `npm run dev` to start the development server.
  
## Carruseles de imágenes (Google Drive)

Las imágenes de "¿Qué ofrecemos?" y "Próximos eventos" se leen de una carpeta de Google Drive.
Los cambios aparecen en la web en un máximo de ~10 minutos, sin tocar el código.

### Estructura de la carpeta

```
Carpeta raíz (compartida: "Cualquier persona con el enlace" → Lector)
├── servicios/
└── eventos/
```

### Nombres de archivo

| Carpeta     | Formato                              | Ejemplo                                     |
|-------------|--------------------------------------|---------------------------------------------|
| `servicios` | `NN_titulo.jpg`                      | `01_nadie-se-queda-atras.jpg`               |
| `eventos`   | `AAAA-MM-DD_titulo.jpg`              | `2026-12-05_mercadillo-solidario.jpg`       |
| `eventos`   | `AAAA-MM-DD_AAAA-MM-DD_titulo.jpg`   | `2026-12-19_2026-12-21_belen-viviente.jpg`  |

- `NN` es el orden en el carrusel (01, 02, 03…).
- Los eventos se muestran hasta las 23:59 de su fecha (o de la última fecha, si son varios días) y desaparecen solos.
- En el título, los guiones se convierten en espacios. Se usa como descripción de la imagen para lectores de pantalla.
  Si el archivo tiene una "Descripción" en Drive (clic derecho → Información del archivo), se usa esa en su lugar.
- Los archivos que no siguen el formato se ignoran.
- Formatos: JPG, PNG o WebP.

### Configuración (una sola vez)

1. En [Google Cloud Console](https://console.cloud.google.com/), crear un proyecto, activar **Google Drive API**
   y crear una **clave de API** restringida a esa API.
2. En Vercel → Settings → Environment Variables, añadir:
   - `GOOGLE_DRIVE_API_KEY`: la clave de API.
   - `GOOGLE_DRIVE_FOLDER_ID`: el ID de la carpeta raíz (lo que va tras `/folders/` en su enlace).
3. Volver a desplegar.

Si Drive no está configurado o falla, se muestran las imágenes de `src/imports/servicios` y
`src/imports/eventos`, que siguen las mismas reglas de nombre.
