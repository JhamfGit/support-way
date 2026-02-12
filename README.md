# 🚀 Support Way - Sistema de Gestión de Tiempos de Soporte Técnico

Una aplicación web moderna y visualmente atractiva para medir y visualizar en tiempo real el flujo completo de servicios técnicos en campo, desde la salida del técnico hasta su regreso a la oficina.

![Support Way](https://img.shields.io/badge/version-1.0.0-blue.svg)
![React](https://img.shields.io/badge/React-18.3-61DAFB?logo=react)
![Vite](https://img.shields.io/badge/Vite-7.3-646CFF?logo=vite)

## ✨ Características Principales

### 👨‍🔧 Vista de Técnico

- **Asignación de Soporte**: Formulario intuitivo para registrar técnico, cliente, tipo de soporte y hora programada
- **Cronómetro en Tiempo Real**: Visualización del tiempo transcurrido desde el inicio del soporte
- **Flujo de Estados Completo**:
  - 📌 Asignación de soporte
  - 🚗 Salida hacia el sitio (con selección de medio de transporte)
  - 📍 Llegada al sitio
  - 🛠️ Trabajo en sitio
  - ✅ Finalización del soporte
  - 🏢 Regreso a oficina
- **Línea de Tiempo Visual**: Timeline interactivo que muestra el progreso del soporte
- **Indicadores de Estado**: Badges de colores y animaciones según el estado actual
- **Reporte Automático**: Generación instantánea de reporte al completar el soporte

### 📊 Vista de Administrador

- **Dashboard de Métricas**:
  - Total de soportes realizados
  - Tiempo promedio total
  - Tiempo promedio de desplazamiento
  - Técnico más eficiente
- **Sistema de Filtros**:
  - Por técnico
  - Por cliente
  - Por rango de fechas
- **Comparativa de Técnicos**: Gráfico visual con ranking de eficiencia
- **Historial Completo**: Tabla con todos los soportes realizados
- **Datos de Demostración**: Sistema automático de datos demo para pruebas

### 📈 Reportes Detallados

- ⏱️ Tiempo de desplazamiento ida
- 🛠️ Tiempo total en sitio
- 🚙 Tiempo de desplazamiento regreso
- ⏰ Tiempo total de la operación
- 📊 Gráficos comparativos de barras
- 🕐 Registro detallado de horarios

## 🎨 Diseño

- **Estilo SaaS Moderno**: Dashboard profesional con gradientes vibrantes
- **Glassmorphism**: Efectos de cristal esmerilado en componentes clave
- **Animaciones Suaves**: Transiciones fluidas entre estados
- **Responsive**: Totalmente adaptable a móvil, tablet y escritorio
- **Paleta de Colores**:
  - Primario: Índigo/Púrpura (#4F46E5)
  - Éxito: Cian (#4FACFE)
  - Advertencia: Rosa/Naranja (#F093FB)
  - Info: Amarillo/Rosa (#FA709A)

## 🚀 Inicio Rápido

### Prerrequisitos

- Node.js 18+ instalado
- npm o yarn

### Instalación

```bash
# Clonar el repositorio (si aplica)
cd support-way

# Instalar dependencias
npm install

# Iniciar servidor de desarrollo
npm run dev
```

La aplicación estará disponible en `http://localhost:5173/`

### Comandos Disponibles

```bash
# Desarrollo
npm run dev          # Inicia el servidor de desarrollo

# Producción
npm run build        # Construye la aplicación para producción
npm run preview      # Previsualiza el build de producción

# Linting
npm run lint         # Ejecuta el linter
```

## 📁 Estructura del Proyecto

```
support-way/
├── src/
│   ├── components/
│   │   ├── TechnicianView.jsx      # Vista principal del técnico
│   │   ├── TechnicianView.css
│   │   ├── SupportForm.jsx         # Formulario de asignación
│   │   ├── SupportForm.css
│   │   ├── SupportTracker.jsx      # Rastreador en tiempo real
│   │   ├── SupportTracker.css
│   │   ├── SupportReport.jsx       # Reporte automático
│   │   ├── SupportReport.css
│   │   ├── AdminView.jsx           # Panel administrativo
│   │   └── AdminView.css
│   ├── App.jsx                     # Componente principal
│   ├── App.css
│   ├── index.css                   # Sistema de diseño global
│   └── main.jsx                    # Punto de entrada
├── index.html
├── package.json
└── README.md
```

## 🎯 Flujo de Uso

### Para Técnicos

1. **Asignar Soporte**: Completa el formulario con tus datos, cliente y tipo de soporte
2. **Salir**: Presiona "Salir hacia soporte" y selecciona tu medio de transporte
3. **Llegar**: Al llegar al sitio, presiona "Llegué al sitio"
4. **Trabajar**: El cronómetro registra automáticamente tu tiempo en sitio
5. **Finalizar**: Cuando termines, presiona "Finalizar soporte"
6. **Regresar**: Al llegar a la oficina, presiona "Llegué a oficina"
7. **Ver Reporte**: Automáticamente se genera un reporte completo con todos los tiempos

### Para Administradores

1. **Ver Métricas**: Revisa las estadísticas generales en la parte superior
2. **Filtrar**: Usa los filtros para buscar soportes específicos
3. **Comparar**: Analiza el rendimiento de los técnicos en el gráfico comparativo
4. **Revisar Historial**: Consulta todos los soportes en la tabla detallada

## 🛠️ Tecnologías Utilizadas

- **React 18.3**: Biblioteca de UI
- **Vite 7.3**: Build tool y dev server
- **CSS3**: Estilos con variables CSS y animaciones
- **Google Fonts (Inter)**: Tipografía moderna

## 🎨 Sistema de Diseño

El proyecto incluye un sistema de diseño completo en `src/index.css` con:

- **Variables CSS**: Colores, espaciados, sombras, radios
- **Componentes Reutilizables**: Botones, cards, badges, formularios
- **Grid System**: Sistema de grillas responsive
- **Utilidades**: Clases helper para spacing, flexbox, etc.
- **Animaciones**: fadeIn, slideIn, pulse, bounce

## 📊 Características Técnicas

### Estado y Datos

- **Estado Local**: Manejo con React hooks (useState, useEffect, useMemo)
- **Cálculos Automáticos**: Métricas calculadas en tiempo real
- **Timestamps**: Registro preciso de todos los eventos
- **Datos Demo**: Generación automática de 12 soportes de ejemplo

### Cronómetro

- Actualización cada segundo
- Formato HH:MM:SS
- Cálculo automático de diferencias de tiempo

### Métricas Calculadas

- Tiempo promedio por técnico
- Técnico más eficiente (menor tiempo promedio)
- Tiempos de desplazamiento vs trabajo
- Totales y promedios generales

## 🎯 Próximas Mejoras Sugeridas

- [ ] **Persistencia de Datos**: LocalStorage o base de datos
- [ ] **Exportar a PDF**: Generación de reportes en PDF
- [ ] **Notificaciones**: Alertas de tiempo excedido
- [ ] **Indicador Semáforo**: Verde/Amarillo/Rojo según tiempo esperado
- [ ] **Gráficos Avanzados**: Chart.js o Recharts para visualizaciones
- [ ] **Autenticación**: Login para técnicos y administradores
- [ ] **API Backend**: Integración con servidor Node.js/Express
- [ ] **PWA**: Convertir en Progressive Web App
- [ ] **Modo Offline**: Funcionamiento sin conexión

## 📱 Responsive Design

La aplicación está completamente optimizada para:

- 📱 **Móviles**: 320px - 767px
- 📱 **Tablets**: 768px - 1023px
- 💻 **Desktop**: 1024px+

## 🎨 Paleta de Colores

```css
/* Primarios */
--color-primary: #4F46E5        /* Índigo */
--color-success: #10B981        /* Verde */
--color-warning: #F59E0B        /* Ámbar */
--color-danger: #EF4444         /* Rojo */
--color-info: #3B82F6           /* Azul */

/* Gradientes */
Púrpura: linear-gradient(135deg, #667EEA 0%, #764BA2 100%)
Cian: linear-gradient(135deg, #4FACFE 0%, #00F2FE 100%)
Rosa: linear-gradient(135deg, #F093FB 0%, #F5576C 100%)
Amarillo: linear-gradient(135deg, #FA709A 0%, #FEE140 100%)
```

## 🤝 Contribución

Este es un proyecto de demostración. Para mejoras:

1. Fork el proyecto
2. Crea una rama (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

## 📄 Licencia

Este proyecto es de código abierto y está disponible bajo la licencia MIT.

## 👨‍💻 Autor

Desarrollado con ❤️ para optimizar la gestión de tiempos de soporte técnico

---

**Support Way** - Transformando la gestión de soporte técnico en campo 🚀
