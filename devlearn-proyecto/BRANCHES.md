# 🌿 Documentación de Branches — DevLearn

## Estructura de ramas

```
main ──────────────────────────────────── producción (GitHub Pages)
  │
  ├── qa ───────────────────────────────── pruebas
  │
  └── feat/* ───────────────────────────── desarrollo de features
```

## Descripción de cada rama

### `main`
- **Propósito:** Código listo para producción
- **Regla:** Solo recibe merges de `qa` o fixes urgentes
- **Auto-deploy:** Sí — GitHub Actions despliega automáticamente en GitHub Pages

### `qa`
- **Propósito:** Validar cambios antes de pasar a `main`
- **Regla:** Recibe merges de ramas `feat/*` o `content/*`
- **Deploy:** Manual o para revisión interna

### `feat/*` / `content/*`
- **Propósito:** Desarrollo de nuevas funciones o lecciones
- **Naming:** `feat/nombre-feature` o `content/nombre-leccion`
- **Ejemplo:** `content/leccion-python-diccionarios`

## Flujo completo

```bash
# 1. Crear rama de trabajo desde main
git checkout main
git pull origin main
git checkout -b content/leccion-js-dom

# 2. Hacer cambios...
# Edita src/js/data.js, agrega tu lección

# 3. Commit
git add .
git commit -m "content: agrega lección js-05 sobre DOM"

# 4. Push de la rama
git push origin content/leccion-js-dom

# 5. Mergear a main (una vez revisado)
git checkout main
git merge content/leccion-js-dom
git push origin main
# ✅ GitHub Actions despliega en ~2 min

# 6. Limpiar rama
git branch -d content/leccion-js-dom
git push origin --delete content/leccion-js-dom
```

## Convenciones de commits

```
feat:     nueva funcionalidad
fix:      corrección de bug
content:  nueva lección o curso
style:    cambios de CSS/diseño
docs:     cambios en README o documentación
chore:    tareas de mantenimiento
```

## Ver estado de deploys

```
https://github.com/AxelRam03/cursos/actions
```
