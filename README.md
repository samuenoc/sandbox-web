# Code Sandbox

Code Sandbox es un entorno de desarrollo open source interactivo en línea que permite escribir, editar y visualizar código HTML, CSS y JavaScript en tiempo real. Este proyecto está diseñado para ofrecer una experiencia fluida y moderna para desarrolladores y estudiantes.

## 🚀 Cómo Empezar

Sigue estos pasos para ejecutar el proyecto en tu máquina local:

### 1. Clonar el Repositorio
Primero, descarga el código fuente clonando el repositorio o descargando el archivo ZIP.

```bash
git clone https://github.com/samuenoc/sandbox-web.git
cd code-sandbox
```

### 2. Instalar Dependencias
Instala las dependencias necesarias del proyecto utilizando npm. Asegúrate de tener Node.js instalado.

```bash
npm install
```

### 3. Ejecutar el Servidor de Desarrollo
Inicia el servidor local para ver la aplicación en tu navegador.

```bash
npm run dev
```

La aplicación estará disponible generalmente en `http://localhost:5173`.

### 4. Calidad de Código (Linting)
Para asegurar que el código sigue las mejores prácticas y no contiene errores, puedes ejecutar el comando de linting:

```bash
npm run lint
```

Si no hay errores, el comando terminará silenciosamente o mostrará advertencias menores. Si hay errores, se mostrarán en la consola.

### 5. Hooks de Git (Husky)
Este proyecto utiliza **Husky** para gestionar los hooks de Git. Se ha configurado un `pre-commit` hook que ejecuta automáticamente el linter antes de cada commit.

- Si el linter encuentra errores, el commit será rechazado.
- Esto asegura que solo se suba código limpio y sin errores al repositorio.

---

## 📂 Estructura del Proyecto

El proyecto está organizado de la siguiente manera dentro de la carpeta `src`:

- **`assets/`**: Contiene archivos estáticos como imágenes y estilos globales.
- **`components/`**: Componentes reutilizables de React.
  - **`Documentation/`**: Componentes relacionados con la página de documentación (Acordeón, Página principal).
  - **`Editor/`**: Componentes del editor de código (Monaco Editor).
  - **`Layout/`**: Estructura principal de la aplicación (Layout shell).
  - **`Preview/`**: Componente para la vista previa en vivo del código.
  - **`Sandbox/`**: Lógica central que une el editor y la vista previa.
  - **`Sidebar/`**: Barra lateral de navegación y herramientas.
- **`context/`**: Contextos de React para el manejo de estado global (ej. `ThemeContext` para el modo oscuro/claro).
- **`data/`**: Archivos de datos estáticos, como la configuración del menú (`context.json`).
- **`hooks/`**: Custom hooks para lógica reutilizable.
- **`themes/`**: Definiciones de temas para el editor.
- **`types/`**: Definiciones de tipos de TypeScript.
- **`App.tsx`**: Componente raíz que maneja el enrutamiento.
- **`main.tsx`**: Punto de entrada de la aplicación.

---

## 🛠️ Tecnologías Utilizadas

Este proyecto utiliza un stack moderno y eficiente:

### Frontend
- **React 18**: Biblioteca principal para la interfaz de usuario.
- **TypeScript**: Superset de JavaScript que añade tipado estático para un código más robusto.
- **Vite**: Herramienta de construcción (bundler) extremadamente rápida.
- **Tailwind CSS**: Framework de CSS utilitario para un diseño rápido y responsivo.
- **React Router**: Para la navegación y manejo de rutas (SPA).
- **Monaco Editor**: El potente editor de código que impulsa VS Code, integrado para la edición en vivo.
- **Lucide React**: Colección de iconos ligeros y consistentes.
- **SweetAlert2**: Para alertas y modales elegantes.

### Herramientas de Desarrollo
- **ESLint**: Para mantener la calidad y consistencia del código.
- **PostCSS**: Para el procesamiento de CSS.

---

¡Disfruta codificando en tu propio Sandbox! 🚀
