# 🎮 Buscaminas - React + Vite

Un juego de Buscaminas completo desarrollado con React, TypeScript y Vite, estilizado con TailwindCSS.

## 🚀 Características

- ✅ Tablero de 10x10 con 15 minas
- ✅ Clic izquierdo para revelar celdas
- ✅ Clic derecho para marcar/desmarcar banderas 🚩
- ✅ Lógica de revelación automática (flood fill) para celdas vacías
- ✅ Detección de victoria y derrota
- ✅ Interfaz moderna con TailwindCSS
- ✅ TypeScript para mayor seguridad de tipos
- ✅ Sin dependencias externas para la lógica del juego

## 📋 Requisitos Previos

- Node.js (versión 18 o superior)
- npm o yarn

## 🛠️ Instalación

1. Clona el repositorio o navega al directorio del proyecto:
```bash
cd Buscaminas-React-Proyecto
```

2. Instala las dependencias:
```bash
npm install
```

## 🎯 Uso

### Desarrollo Local

Para ejecutar el proyecto en modo desarrollo:

```bash
npm run dev
```

El juego estará disponible en `http://localhost:5173` (o el puerto que Vite asigne).

### Compilar para Producción

Para crear una build de producción:

```bash
npm run build
```

Los archivos compilados estarán en la carpeta `dist`.

### Vista Previa de Producción

Para previsualizar la build de producción:

```bash
npm run preview
```

## 🌐 Despliegue en Vercel

### Opción 1: Despliegue desde GitHub

1. **Sube tu código a GitHub:**
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git remote add origin <tu-repositorio-github>
   git push -u origin main
   ```

2. **Conecta con Vercel:**
   - Ve a [vercel.com](https://vercel.com)
   - Inicia sesión con tu cuenta de GitHub
   - Haz clic en "New Project"
   - Importa tu repositorio de GitHub
   - Vercel detectará automáticamente que es un proyecto Vite
   - Haz clic en "Deploy"

3. **Configuración automática:**
   - Vercel detectará automáticamente:
     - **Framework Preset:** Vite
     - **Build Command:** `npm run build`
     - **Output Directory:** `dist`
     - **Install Command:** `npm install`

### Opción 2: Despliegue con Vercel CLI

1. **Instala Vercel CLI:**
   ```bash
   npm i -g vercel
   ```

2. **Despliega:**
   ```bash
   vercel
   ```

3. **Sigue las instrucciones:**
   - Inicia sesión o crea una cuenta
   - Confirma la configuración del proyecto
   - Vercel desplegará tu aplicación

### Opción 3: Configuración Manual en Vercel

Si necesitas configurar manualmente:

1. Ve a tu proyecto en Vercel
2. Ve a Settings → General
3. Configura:
   - **Framework Preset:** Vite
   - **Build Command:** `npm run build`
   - **Output Directory:** `dist`
   - **Install Command:** `npm install`
   - **Root Directory:** `./` (o deja vacío)

## 📁 Estructura del Proyecto

```
Buscaminas-React-Proyecto/
├── src/
│   ├── components/
│   │   ├── Board.tsx      # Componente principal del tablero
│   │   └── Cell.tsx        # Componente de celda individual
│   ├── hooks/
│   │   └── useMinesweeper.ts  # Hook con toda la lógica del juego
│   ├── App.tsx             # Componente raíz de la aplicación
│   ├── main.tsx            # Punto de entrada
│   └── index.css           # Estilos globales con TailwindCSS
├── index.html
├── package.json
├── vite.config.ts
├── tsconfig.json
├── tailwind.config.js
└── README.md
```

## 🎮 Cómo Jugar

1. **Revelar celda:** Haz clic izquierdo en una celda para revelarla
2. **Marcar bandera:** Haz clic derecho en una celda para marcarla con una bandera 🚩
3. **Objetivo:** Revela todas las celdas que no tienen minas
4. **Victoria:** Se gana cuando todas las celdas sin minas están reveladas
5. **Derrota:** Se pierde si haces clic en una celda con mina 💣

## 🛠️ Tecnologías Utilizadas

- **React 18** - Biblioteca de UI
- **TypeScript** - Tipado estático
- **Vite** - Build tool y dev server
- **TailwindCSS** - Framework de CSS utility-first
- **ESLint** - Linter para código JavaScript/TypeScript

## 📝 Scripts Disponibles

- `npm run dev` - Inicia el servidor de desarrollo
- `npm run build` - Compila el proyecto para producción
- `npm run preview` - Previsualiza la build de producción
- `npm run lint` - Ejecuta el linter

## 🐛 Solución de Problemas

### El proyecto no compila

- Asegúrate de tener Node.js 18+ instalado
- Elimina `node_modules` y `package-lock.json`, luego ejecuta `npm install` nuevamente

### Errores de TypeScript

- Verifica que todos los archivos `.ts` y `.tsx` estén en la carpeta `src`
- Ejecuta `npm run build` para ver errores detallados

### Problemas con TailwindCSS

- Verifica que `tailwind.config.js` tenga la configuración correcta
- Asegúrate de que `index.css` importe las directivas de Tailwind

## 📄 Licencia

Este proyecto es de código abierto y está disponible para uso personal y educativo.

---

¡Disfruta jugando Buscaminas! 🎉

