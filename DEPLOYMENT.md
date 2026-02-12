# 🚀 Guía de Despliegue - Support Way

Esta guía te ayudará a desplegar Support Way en diferentes plataformas.

---

## 📋 Tabla de Contenidos

1. [Preparación](#preparación)
2. [Build de Producción](#build-de-producción)
3. [Despliegue en Vercel](#despliegue-en-vercel)
4. [Despliegue en Netlify](#despliegue-en-netlify)
5. [Despliegue en GitHub Pages](#despliegue-en-github-pages)
6. [Despliegue en Servidor Propio](#despliegue-en-servidor-propio)
7. [Variables de Entorno](#variables-de-entorno)
8. [Optimizaciones](#optimizaciones)

---

## 🔧 Preparación

### 1. Verificar que todo funcione localmente

```bash
# Instalar dependencias
npm install

# Ejecutar en desarrollo
npm run dev

# Verificar que no haya errores
npm run lint
```

### 2. Actualizar configuración

Verifica que `vite.config.js` esté correctamente configurado:

```javascript
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  base: '/', // Cambiar si se despliega en subdirectorio
})
```

---

## 📦 Build de Producción

### Crear build optimizado

```bash
npm run build
```

Esto generará una carpeta `dist/` con los archivos optimizados.

### Previsualizar build

```bash
npm run preview
```

Abre `http://localhost:4173/` para ver el build de producción.

---

## ☁️ Despliegue en Vercel

### Opción 1: Desde la interfaz web

1. Ve a [vercel.com](https://vercel.com)
2. Conecta tu repositorio de GitHub
3. Vercel detectará automáticamente que es un proyecto Vite
4. Click en "Deploy"

### Opción 2: Desde CLI

```bash
# Instalar Vercel CLI
npm install -g vercel

# Login
vercel login

# Desplegar
vercel

# Desplegar a producción
vercel --prod
```

### Configuración (vercel.json)

```json
{
  "buildCommand": "npm run build",
  "outputDirectory": "dist",
  "framework": "vite"
}
```

---

## 🎯 Despliegue en Netlify

### Opción 1: Drag & Drop

1. Ejecuta `npm run build`
2. Ve a [netlify.com](https://netlify.com)
3. Arrastra la carpeta `dist/` a Netlify

### Opción 2: Desde Git

1. Conecta tu repositorio en Netlify
2. Configuración:
   - **Build command**: `npm run build`
   - **Publish directory**: `dist`
3. Click en "Deploy"

### Opción 3: Netlify CLI

```bash
# Instalar Netlify CLI
npm install -g netlify-cli

# Login
netlify login

# Inicializar
netlify init

# Desplegar
netlify deploy --prod
```

### Configuración (netlify.toml)

```toml
[build]
  command = "npm run build"
  publish = "dist"

[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200
```

---

## 📄 Despliegue en GitHub Pages

### 1. Actualizar vite.config.js

```javascript
export default defineConfig({
  plugins: [react()],
  base: '/support-way/', // Nombre de tu repositorio
})
```

### 2. Instalar gh-pages

```bash
npm install --save-dev gh-pages
```

### 3. Agregar scripts en package.json

```json
{
  "scripts": {
    "predeploy": "npm run build",
    "deploy": "gh-pages -d dist"
  }
}
```

### 4. Desplegar

```bash
npm run deploy
```

### 5. Configurar GitHub Pages

1. Ve a Settings → Pages en tu repositorio
2. Selecciona la rama `gh-pages`
3. Click en "Save"

Tu app estará en: `https://tu-usuario.github.io/support-way/`

---

## 🖥️ Despliegue en Servidor Propio

### Opción 1: Nginx

1. **Build de la aplicación**
```bash
npm run build
```

2. **Copiar archivos al servidor**
```bash
scp -r dist/* usuario@servidor:/var/www/support-way/
```

3. **Configurar Nginx**
```nginx
server {
    listen 80;
    server_name support-way.tudominio.com;
    root /var/www/support-way;
    index index.html;

    location / {
        try_files $uri $uri/ /index.html;
    }

    # Caché para assets estáticos
    location ~* \.(js|css|png|jpg|jpeg|gif|ico|svg|woff|woff2)$ {
        expires 1y;
        add_header Cache-Control "public, immutable";
    }
}
```

4. **Reiniciar Nginx**
```bash
sudo systemctl restart nginx
```

### Opción 2: Apache

1. **Copiar archivos**
```bash
scp -r dist/* usuario@servidor:/var/www/html/support-way/
```

2. **Crear .htaccess**
```apache
<IfModule mod_rewrite.c>
  RewriteEngine On
  RewriteBase /support-way/
  RewriteRule ^index\.html$ - [L]
  RewriteCond %{REQUEST_FILENAME} !-f
  RewriteCond %{REQUEST_FILENAME} !-d
  RewriteRule . /support-way/index.html [L]
</IfModule>
```

### Opción 3: Docker

1. **Crear Dockerfile**
```dockerfile
FROM node:18-alpine as build
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

FROM nginx:alpine
COPY --from=build /app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
```

2. **Crear nginx.conf**
```nginx
server {
    listen 80;
    location / {
        root /usr/share/nginx/html;
        index index.html;
        try_files $uri $uri/ /index.html;
    }
}
```

3. **Build y ejecutar**
```bash
docker build -t support-way .
docker run -d -p 80:80 support-way
```

---

## 🔐 Variables de Entorno

Para futuras versiones con backend:

### Crear archivo .env

```env
VITE_API_URL=https://api.support-way.com
VITE_APP_NAME=Support Way
VITE_APP_VERSION=1.0.0
```

### Usar en el código

```javascript
const apiUrl = import.meta.env.VITE_API_URL;
```

### Configurar en plataformas

**Vercel/Netlify:**
- Agregar en Settings → Environment Variables

**GitHub Actions:**
```yaml
env:
  VITE_API_URL: ${{ secrets.API_URL }}
```

---

## ⚡ Optimizaciones

### 1. Comprimir Assets

```bash
# Instalar plugin de compresión
npm install --save-dev vite-plugin-compression
```

```javascript
// vite.config.js
import compression from 'vite-plugin-compression'

export default defineConfig({
  plugins: [
    react(),
    compression({
      algorithm: 'gzip',
      ext: '.gz',
    })
  ],
})
```

### 2. Analizar Bundle

```bash
# Instalar plugin de análisis
npm install --save-dev rollup-plugin-visualizer
```

```javascript
// vite.config.js
import { visualizer } from 'rollup-plugin-visualizer'

export default defineConfig({
  plugins: [
    react(),
    visualizer({
      open: true,
      gzipSize: true,
    })
  ],
})
```

### 3. Lazy Loading de Componentes

```javascript
import { lazy, Suspense } from 'react'

const AdminView = lazy(() => import('./components/AdminView'))

function App() {
  return (
    <Suspense fallback={<div>Cargando...</div>}>
      <AdminView />
    </Suspense>
  )
}
```

### 4. PWA (Progressive Web App)

```bash
npm install --save-dev vite-plugin-pwa
```

```javascript
// vite.config.js
import { VitePWA } from 'vite-plugin-pwa'

export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      manifest: {
        name: 'Support Way',
        short_name: 'Support Way',
        description: 'Gestión de Tiempos de Soporte',
        theme_color: '#4F46E5',
        icons: [
          {
            src: 'icon-192.png',
            sizes: '192x192',
            type: 'image/png'
          },
          {
            src: 'icon-512.png',
            sizes: '512x512',
            type: 'image/png'
          }
        ]
      }
    })
  ],
})
```

---

## 🔍 Verificación Post-Despliegue

### Checklist

- [ ] La aplicación carga correctamente
- [ ] No hay errores en la consola
- [ ] Todas las rutas funcionan
- [ ] Los estilos se cargan correctamente
- [ ] Las animaciones funcionan
- [ ] Responsive en móvil/tablet/desktop
- [ ] Tiempos de carga < 3 segundos
- [ ] SEO básico configurado

### Herramientas de Testing

- **Lighthouse**: Auditoría de performance
- **GTmetrix**: Análisis de velocidad
- **WebPageTest**: Testing detallado
- **Mobile-Friendly Test**: Google

---

## 🆘 Solución de Problemas

### Rutas no funcionan (404)

**Problema**: Al recargar la página en una ruta específica, aparece 404.

**Solución**: Configurar rewrites en el servidor (ver secciones de Nginx/Apache).

### Assets no cargan

**Problema**: CSS/JS no se cargan después del despliegue.

**Solución**: Verificar la configuración de `base` en `vite.config.js`.

### Build falla

**Problema**: Error durante `npm run build`.

**Solución**:
```bash
# Limpiar caché
rm -rf node_modules
rm package-lock.json
npm install
npm run build
```

---

## 📊 Monitoreo

### Opciones de Monitoreo

1. **Google Analytics**: Seguimiento de usuarios
2. **Sentry**: Monitoreo de errores
3. **LogRocket**: Grabación de sesiones
4. **Vercel Analytics**: Analytics integrado

---

## 🎉 ¡Listo!

Tu aplicación Support Way está ahora desplegada y lista para usar en producción.

**URLs de ejemplo:**
- Vercel: `https://support-way.vercel.app`
- Netlify: `https://support-way.netlify.app`
- GitHub Pages: `https://usuario.github.io/support-way`

---

**Support Way** - Desplegado y listo para optimizar tu gestión de soporte 🚀
