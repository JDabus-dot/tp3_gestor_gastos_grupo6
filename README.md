# Trabajo Práctico N°3:
Bienvenid@ al repositorio del Trabajo Práctico N°3 para la asignatura de Programación 3. En este proyecto el Grupo 6 ha desarrollado un Gestor de Gastos Personal, una aplicación web interactiva organizada con Flexbox que permite registrar, visualizar, filtrar y administrar gastos personales mediante JavaScript, localStorage y jQuery.
Github Page:

## 🎯 Objetivos del TP
* Manipulación del DOM: Utilizar JavaScript para crear, modificar y eliminar elementos HTML de forma dinámica en respuesta a las acciones del usuario.
* Persistencia de datos: Implementar localStorage para que los gastos registrados se conserven aunque se cierre o recargue la página.
* Organización visual: Estructurar la interfaz con Flexbox, separando claramente las zonas de formulario, lista y resumen.
* Modularización: Dividir la lógica en archivos JS y CSS independientes por funcionalidad, favoreciendo la legibilidad y el mantenimiento del código.
* Colaboración: Mantener un historial de commits organizado y una gestión de ramas efectiva mediante Git y GitHub.

## 🎯 Objetivos del Gestor de Gastos
Brindar a los usuarios una herramienta simple e intuitiva para registrar y controlar sus gastos personales en tiempo real, sin necesidad de conexión a internet ni cuentas externas.
Permitir el seguimiento detallado de los gastos mediante categorías, fechas y montos, ofreciendo un resumen actualizado automáticamente que facilite la toma de decisiones financieras cotidianas.

## 👥 Integrantes - Grupo 6
* Julieta Dabús
* Alejandro Lucas Baldres
* Julian Riedinger
* Marianela Belardinelli
* Clara Zivano
* Matías F. Ledesma González

## 📋 Organización
### División del Trabajo
**Julieta Dabús — Setup base + Formulario de gasto**

Crea el repo, rama dev, estructura de carpetas, favicon y README.md
Layout Flexbox principal en index.html (las zonas: formulario | lista | panel derecho)
Variables CSS, reset y tipografía en index.css
Formulario con campos: nombre, monto, categoría (select), fecha
Validaciones con feedback visual
Evento submit que guarda en localStorage y dispara re-render de la lista


**Alejandro Baldres — Gestión de categorías**

Página separada con su propio HTML y nav de regreso al index
Formulario para agregar categorías nuevas
Lista de categorías con botón eliminar (no elimina si hay gastos asociados, muestra mensaje)
Edición inline del nombre de una categoría
Persiste en localStorage 


**Julián Riedinger — Lista de transacciones (render + eliminar)**

Renderiza la lista de gastos desde localStorage como tarjetas o filas
Cada ítem muestra: nombre, categoría, monto, fecha, botón eliminar
Eliminar actualiza localStorage y recalcula el total en tiempo real
Función renderizarGastos() exportada y usada por otros módulos


**Marianela Belardinelli — Filtros de transacciones**

Barra de filtros: por categoría (select), por rango de fechas (dos inputs date), búsqueda por texto
Botón "limpiar filtros"
Filtra sobre el array en memoria y llama a renderizarGastos() con el subconjunto filtrado


**Clara Zivano — Estadísticas y resumen**

Total acumulado, cantidad de gastos, promedio por gasto
Se recalcula cada vez que cambia localStorage (evento storage + llamado directo)
Gasto más alto y más reciente destacados


**Matías Ledesma — Edición de gastos**

Modal para editar un gasto existente (pre-carga el formulario con los datos)
Botón "editar" en cada ítem de la lista
Notificaciones visuales para confirmación de edición: "Gasto editado exitosamente"


## 🛠️ Tecnologías Utilizadas
* HTML5
* CSS3
* JavaScript
* jQuery
* Flexbox
* Git / GitHub

## Metodologías utilizadas
Esta sección define el flujo de trabajo y las convenciones de nomenclatura para la gestión de ramas en el proyecto, asegurando un historial limpio y una integración controlada a través de GitHub.
### Estructura de Ramas Principales
El proyecto se rige por dos ramas estables de larga duración:
* Main: Es la rama principal del proyecto. Contiene la versión lista para entregar, por lo que sólo debe recibir código que haya sido probado y aprobado.
* Dev: Es la rama de integración. Aquí se consolidan todas las funcionalidades y correcciones antes de pasar a la rama principal. Es el entorno de desarrollo activo.

### Convenciones para Ramas Personales
Cada integrante del grupo trabajará en ramas creadas a partir de Dev. El nombre de estas ramas debe seguir una estructura específica según el propósito de la tarea:

A. Nuevas Funcionalidades (Features) Si la tarea consiste en agregar una nueva característica o componente al proyecto:
* Formato: feature/agregado-Iniciales
* Ejemplo: feature/formulario-JD

B. Corrección de Errores (Fixes) Si la tarea consiste en solucionar un error o realizar un ajuste técnico:
* Formato: fix/correccion-Iniciales
* Ejemplo: fix/validaciones-JD

C. Documentación (Docs) Si la tarea consiste en generar o modificar documentación:
* Formato: docs/descripcion-Iniciales
* Ejemplo: docs/readme-ALL

## Resumen de Flujo de Trabajo
1. Estar posicionado en Dev y hacer un git pull para tener lo último.
2. Crear la rama personal: git checkout -b feature/mi-tarea-AB
3. Realizar los cambios y hacer commit.
4. Subir la rama al repositorio remoto: git push --set-upstream origin feature/mi-tarea-AB
5. Abrir el Pull Request en GitHub hacia la rama Dev.
6. Realizar el Merge a la rama Dev.
7. Una vez que el código de Dev esté estabilizado y listo para generar el entregable,
   realizar el Pull Request a Main.
