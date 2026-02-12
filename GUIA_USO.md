# 📖 Guía de Uso Rápido - Support Way

## 🎯 Inicio Rápido

### Para Técnicos

#### 1️⃣ Crear un Nuevo Soporte

1. En la pestaña **"Técnico"**, completa el formulario:
   - **Técnico Asignado**: Tu nombre
   - **Cliente / Sitio**: Nombre del cliente o ubicación
   - **Tipo de Soporte**: Selecciona el tipo (Instalación, Mantenimiento, etc.)
   - **Hora Programada** (opcional): Hora estimada del servicio

2. Presiona **"Iniciar Soporte"**

#### 2️⃣ Registrar Salida

1. Cuando salgas hacia el cliente, presiona **"🚗 Salir hacia soporte"**
2. Selecciona tu medio de transporte:
   - 🏍️ Moto
   - 🚗 Carro
   - 🚌 Transporte Público
   - 🚶 Caminando

#### 3️⃣ Registrar Llegada

1. Al llegar al sitio del cliente, presiona **"📍 Llegué al sitio"**
2. El cronómetro seguirá corriendo automáticamente

#### 4️⃣ Finalizar Trabajo

1. Cuando termines el trabajo, presiona **"✅ Finalizar soporte"**
2. El estado cambiará a "Regresando a oficina"

#### 5️⃣ Registrar Regreso

1. Al llegar a la oficina, presiona **"🏢 Llegué a oficina"**
2. Se generará automáticamente un **reporte completo** con:
   - ⏱️ Tiempo de desplazamiento ida
   - 🛠️ Tiempo total en sitio
   - 🚙 Tiempo de desplazamiento regreso
   - ⏰ Tiempo total de la operación
   - 📊 Gráficos comparativos

#### 6️⃣ Iniciar Nuevo Soporte

1. Desde el reporte, presiona **"➕ Nuevo Soporte"**
2. Regresarás al formulario inicial

---

### Para Administradores

#### 📊 Ver Métricas Generales

En la pestaña **"Administrador"** encontrarás:

- **📋 Soportes Totales**: Cantidad de servicios realizados
- **⏱️ Tiempo Promedio Total**: Duración promedio de los soportes
- **🚗 Tiempo Promedio Desplazamiento**: Tiempo promedio en viajes
- **🏆 Técnico Más Eficiente**: Técnico con mejor tiempo promedio

#### 🔍 Filtrar Soportes

Usa los filtros para buscar soportes específicos:

1. **Por Técnico**: Escribe el nombre del técnico
2. **Por Cliente**: Escribe el nombre del cliente
3. **Por Fecha**: Selecciona rango de fechas (Desde - Hasta)
4. Presiona **"Limpiar Filtros"** para resetear

#### 👥 Comparativa de Técnicos

- Visualiza el ranking de técnicos ordenados por eficiencia
- El técnico #1 tiene el mejor tiempo promedio
- Cada barra muestra:
  - Cantidad de soportes realizados
  - Tiempo promedio

#### 📝 Historial de Soportes

Tabla completa con todos los soportes que incluye:
- Fecha del servicio
- Técnico asignado
- Cliente atendido
- Tipo de soporte
- Medio de transporte utilizado
- Tiempo total
- Estado del soporte

---

## 🎨 Características Visuales

### Cronómetro en Tiempo Real

- Se actualiza cada segundo
- Formato: **HH:MM:SS**
- Visible durante todo el proceso del soporte

### Línea de Tiempo Interactiva

Muestra el progreso del soporte con estados visuales:

- **Gris**: Evento pendiente
- **Amarillo pulsante**: Evento en progreso
- **Verde**: Evento completado

### Indicadores de Estado

Cada estado tiene su propio color y animación:

- 📋 **Asignado**: Azul (Info)
- 🚗 **En camino**: Naranja/Rosa (Warning)
- 🟢 **En sitio**: Cian (Success)
- 🚙 **Regresando**: Naranja/Rosa (Warning)
- ✅ **Completado**: Cian (Success)

### Gráficos de Barras

Los reportes incluyen gráficos animados que muestran:
- Comparación visual de tiempos
- Barras con gradientes de colores
- Valores numéricos en cada barra

---

## 💡 Consejos y Trucos

### Para Técnicos

1. **No olvides registrar cada paso**: Cada botón debe presionarse en el momento exacto para obtener métricas precisas

2. **Revisa el cronómetro**: Mantén un ojo en el tiempo transcurrido para gestionar mejor tu jornada

3. **Verifica el reporte**: Al finalizar, revisa que todos los tiempos sean correctos

### Para Administradores

1. **Usa los filtros**: Combina filtros para análisis más específicos

2. **Identifica patrones**: Observa qué técnicos son más eficientes y en qué tipos de soporte

3. **Analiza tiempos de desplazamiento**: Identifica rutas problemáticas o zonas que requieren más tiempo

4. **Datos de demostración**: Si no hay soportes reales, la app muestra 12 soportes de ejemplo automáticamente

---

## 🚨 Solución de Problemas

### El cronómetro no se actualiza
- Refresca la página (F5)
- Verifica que no haya errores en la consola del navegador

### Los filtros no funcionan
- Asegúrate de escribir correctamente (no distingue mayúsculas/minúsculas)
- Verifica el formato de las fechas

### No veo mis soportes completados
- Cambia a la pestaña "Administrador"
- Verifica que no haya filtros activos

### La aplicación no carga
- Verifica que el servidor esté corriendo: `npm run dev`
- Abre http://localhost:5173/ en tu navegador
- Limpia la caché del navegador

---

## 📱 Uso en Móvil

La aplicación es completamente responsive:

1. **Navegación**: Los tabs se adaptan al ancho de pantalla
2. **Formularios**: Los campos se apilan verticalmente
3. **Tablas**: Scroll horizontal automático
4. **Botones**: Tamaño completo en móvil para fácil acceso

---

## ⌨️ Atajos de Teclado

Actualmente no hay atajos de teclado, pero puedes navegar con:
- **Tab**: Moverse entre campos del formulario
- **Enter**: Enviar formulario
- **Espacio**: Activar botones enfocados

---

## 🔄 Flujo Completo de Ejemplo

```
1. Técnico completa formulario
   ↓
2. Presiona "Salir hacia soporte"
   ↓
3. Selecciona "Carro" como transporte
   ↓
4. Viaja al cliente (cronómetro corriendo)
   ↓
5. Presiona "Llegué al sitio"
   ↓
6. Realiza el trabajo (cronómetro en sitio)
   ↓
7. Presiona "Finalizar soporte"
   ↓
8. Regresa a oficina
   ↓
9. Presiona "Llegué a oficina"
   ↓
10. Ve reporte completo con todos los tiempos
    ↓
11. Presiona "Nuevo Soporte" para continuar
```

---

## 📞 Soporte

Para preguntas o problemas:
- Revisa el README.md principal
- Consulta el código fuente en `/src`
- Verifica la consola del navegador para errores

---

**¡Listo para optimizar tu gestión de soporte técnico! 🚀**
