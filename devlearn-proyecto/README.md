# 🐍⚡ DevLearn — Plataforma de Cursos de Programación

> Aprende a programar de cero a senior. 100% gratuito, sin registro, sin backend.

**🌐 Demo en vivo:** [https://axelram03.github.io/cursos](https://axelram03.github.io/cursos)

---

## 📋 Índice

- [¿Qué es DevLearn?](#qué-es-devlearn)
- [Cursos incluidos](#cursos-incluidos)
- [Estructura del proyecto](#estructura-del-proyecto)
- [Cómo correrlo localmente](#cómo-correrlo-localmente)
- [Cómo subir cambios a GitHub](#cómo-subir-cambios-a-github)
- [Cómo agregar una lección nueva](#cómo-agregar-una-lección-nueva)
- [Branches del proyecto](#branches-del-proyecto)
- [Tecnologías usadas](#tecnologías-usadas)

---

## ¿Qué es DevLearn?

DevLearn es una plataforma web estática (sin servidor, sin base de datos) que ofrece cursos completos de programación con:

- ✅ Editor de código integrado con botón "Ejecutar"
- ✅ Progreso guardado automáticamente en el navegador (localStorage)
- ✅ Ejercicios con solución ocultable
- ✅ Certificado al completar cada curso
- ✅ Filtros por categoría
- ✅ Diseño responsive (funciona en móvil)

---

## 📚 Cursos incluidos

| Curso | Categoría | Lecciones | Ejercicios |
|-------|-----------|-----------|------------|
| Python | Backend | 12 | 45 |
| JavaScript | Web | 10 | 38 |
| HTML & CSS | Web | 10 | 30 |
| SQL | Bases de datos | 10 | 40 |
| Kubernetes | DevOps / Cloud | 10 | 28 |
| Microsoft Azure | Cloud | 10 | 24 |
| Oracle Cloud (OCNE) | Cloud | 8 | 20 |
| Oracle WebLogic | Backend | 8 | 16 |
| Bases de Datos | Datos | 10 | 32 |

---

## 📁 Estructura del proyecto

```
cursos/                          ← raíz del repositorio
│
├── index.html                   ← página principal (toda la UI)
│
├── src/
│   ├── css/
│   │   └── main.css             ← todos los estilos
│   └── js/
│       ├── data.js              ← cursos, módulos y contenido de lecciones
│       └── app.js               ← toda la lógica de la aplicación
│
├── .github/
│   └── workflows/
│       └── deploy.yml           ← GitHub Actions: auto-deploy a Pages
│
├── .gitignore
├── README.md                    ← este archivo
└── BRANCHES.md                  ← documentación de ramas
```

### Descripción de cada archivo

#### `index.html`
El esqueleto HTML de toda la aplicación. Contiene:
- La barra de navegación
- La vista Home (hero + grid de cursos)
- La vista Mi Ruta (progreso)
- La vista Course (sidebar + área de lección)
- El modal del certificado
- Los `<script>` que cargan `data.js` y `app.js`

#### `src/css/main.css`
Todos los estilos en un solo archivo. Usa variables CSS (`--bg`, `--ac`, etc.) para mantener consistencia del tema oscuro.

#### `src/js/data.js`
Contiene dos objetos globales:
- `COURSES`: array con los 9 cursos (id, título, módulos, lecciones)
- `LESSONS`: objeto donde cada clave es el ID de una lección y el valor es su contenido completo (HTML, código, ejercicios)

#### `src/js/app.js`
Toda la lógica: navegación entre vistas, renderizado de cursos y lecciones, progreso, editor de código simulado y certificado.

#### `.github/workflows/deploy.yml`
Workflow de GitHub Actions que se ejecuta automáticamente en cada `git push` a `main` y despliega el sitio en GitHub Pages.

---

## 🖥️ Cómo correrlo localmente

No necesitas instalar nada. Solo abre el archivo en tu navegador:

```bash
# Opción 1: abrir directo (puede tener limitaciones de CORS)
open index.html

# Opción 2 (recomendada): servidor local con Python
python3 -m http.server 8080
# Luego abre: http://localhost:8080

# Opción 3: con Node.js
npx serve .
# Luego abre: http://localhost:3000

# Opción 4: extensión Live Server en VS Code
# Clic derecho en index.html → "Open with Live Server"
```

---

## 🚀 Cómo subir cambios a GitHub

### Primera vez (clonar y configurar)

```bash
# 1. Clonar el repositorio
git clone https://github.com/AxelRam03/cursos.git
cd cursos

# 2. Verificar que tienes los archivos
ls -la

# 3. Ver en qué rama estás
git branch
```

### Flujo de trabajo normal

```bash
# 1. Asegúrate de estar en main y tener lo último
git checkout main
git pull origin main

# 2. Haz tus cambios (editar archivos, agregar lecciones, etc.)

# 3. Ver qué archivos cambiaste
git status

# 4. Agregar todos los cambios
git add .

# 5. Crear un commit con descripción clara
git commit -m "feat: agrega lección py-07 sobre diccionarios"

# 6. Subir a GitHub
git push origin main

# ✅ GitHub Actions desplegará automáticamente en ~1-2 minutos
# Ver progreso en: https://github.com/AxelRam03/cursos/actions
```

### Mensajes de commit recomendados

```
feat: agrega nueva lección o curso
fix: corrige un error en el código
style: cambios visuales o de CSS
docs: actualiza documentación
content: agrega o mejora contenido de lecciones
```

---

## ➕ Cómo agregar una lección nueva

### Paso 1: Agregar la lección al módulo en `data.js`

Encuentra el curso en el array `COURSES` y agrega un objeto al módulo correspondiente:

```javascript
// En COURSES, dentro del curso que quieras:
{ label: 'Mi Módulo', items: [
    { id: 'py-13', title: 'Mi Nueva Lección' },  // ← agrega aquí
]}
```

### Paso 2: Agregar el contenido en `data.js`

Al final del objeto `LESSONS`, agrega:

```javascript
'py-13': {
  title: 'Título de la lección',
  subtitle: 'Descripción breve de lo que se aprende.',
  badges: ['Python 3.x', '~30 min', 'Nivel'],

  // HTML de introducción (usa clases .prose)
  html: `<div class="prose">
    <p>Texto explicativo con <strong>énfasis</strong>.</p>
    <h3>Subtítulo de sección</h3>
  </div>`,

  // Primer bloque de código
  code1: {
    file: 'mi_leccion.py',
    starter: `# Código inicial que ve el estudiante
print("Hola")
variable = 42`
  },

  // Callout opcional
  callout1: {
    type: 'tip',   // 'tip' | 'warn' | 'info'
    text: 'Consejo importante para el estudiante.'
  },

  // HTML adicional (opcional)
  html2: `<div class="prose"><h3>Sección 2</h3></div>`,

  // Segundo bloque de código (opcional)
  code2: { file: 'parte2.py', starter: `# ...` },

  // Ejercicios
  exercises: [
    {
      num: 1,
      title: 'Nombre del ejercicio',
      diff: 'easy',    // 'easy' | 'med' | 'hard'
      desc: 'Descripción clara de qué debe hacer el estudiante.',
      starter: `# Código con huecos para completar
resultado = ___`,
      solution: `resultado = 42\nprint(resultado)`
    }
  ]
},
```

### Paso 3: Guardar y probar localmente

Abre `index.html` en tu navegador (o usa Live Server) y verifica que la lección aparece correctamente.

### Paso 4: Subir a GitHub

```bash
git add .
git commit -m "content: agrega lección py-13"
git push origin main
```

---

## 🌿 Branches del proyecto

| Branch | Propósito |
|--------|-----------|
| `main` | Producción. Todo lo que llegue aquí se despliega automáticamente |
| `qa` | Pruebas antes de pasar a producción |
| `produccion` | Alias histórico de main |
| `gh-pages` | Generado automáticamente por GitHub Pages (no editar manualmente) |

### Flujo recomendado para cambios grandes

```bash
# 1. Crear rama desde main
git checkout -b feat/nuevas-lecciones-js

# 2. Hacer cambios y commits

# 3. Cuando esté listo, mergear a main
git checkout main
git merge feat/nuevas-lecciones-js
git push origin main

# 4. Eliminar la rama temporal
git branch -d feat/nuevas-lecciones-js
```

---

## 🛠️ Tecnologías usadas

| Tecnología | Uso |
|------------|-----|
| HTML5 semántico | Estructura de la SPA |
| CSS3 con variables | Estilos y tema oscuro |
| JavaScript (ES6+) | Toda la lógica de la app |
| Google Fonts (DM Sans, DM Mono) | Tipografía |
| localStorage | Guardar progreso del usuario |
| GitHub Actions | CI/CD automático |
| GitHub Pages | Hosting gratuito |

**Sin dependencias externas de JavaScript** — no usa React, Vue ni jQuery. Todo es vanilla JS puro para máxima velocidad y simplicidad.

---

## 🤝 Contribuir

1. Haz fork del repositorio
2. Crea tu rama: `git checkout -b content/nueva-leccion`
3. Agrega tu lección siguiendo la guía de arriba
4. Haz commit: `git commit -m "content: agrega lección sobre X"`
5. Push: `git push origin content/nueva-leccion`
6. Abre un Pull Request

---

## 📄 Licencia

MIT — libre de usar, modificar y distribuir.

---

*Construido con ❤️ por AxelRam03*
