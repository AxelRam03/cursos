// ═══════════════════════════════════════════
//  DevLearn — app.js
// ═══════════════════════════════════════════

let currentCourse = null;
let currentLessonId = null;
let progress = {};

// ── cargar progreso guardado ──
try { progress = JSON.parse(localStorage.getItem('dl_progress') || '{}'); } catch(e) { progress = {}; }

function saveProgress() {
  try { localStorage.setItem('dl_progress', JSON.stringify(progress)); } catch(e) {}
}

// ══════════════════════════════════════════
//  NAVEGACIÓN
// ══════════════════════════════════════════
function showView(id) {
  document.querySelectorAll('.view').forEach(v => v.classList.remove('active'));
  const el = document.getElementById('view-' + id);
  if (el) el.classList.add('active');
  window.scrollTo(0, 0);
}

function setNav(btn) {
  document.querySelectorAll('.nav-link').forEach(b => b.classList.remove('active'));
  if (btn) btn.classList.add('active');
}

function showHome() {
  showView('home');
  setNav(document.getElementById('nav-cursos'));
  renderCourses('all');
}

function showRuta() {
  showView('ruta');
  setNav(document.getElementById('nav-ruta'));
  renderRuta();
}

function scrollToCourses() {
  showView('home');
  setTimeout(() => {
    const el = document.getElementById('courses-section');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  }, 50);
}

// ══════════════════════════════════════════
//  PROGRESO
// ══════════════════════════════════════════
function getDone(courseId) {
  const p = progress[courseId] || {};
  const c = COURSES.find(x => x.id === courseId);
  if (!c) return 0;
  return c.modules.reduce((acc, m) => acc + m.items.filter(l => p[l.id]).length, 0);
}

function getTotal(courseId) {
  const c = COURSES.find(x => x.id === courseId);
  if (!c) return 0;
  return c.modules.reduce((acc, m) => acc + m.items.length, 0);
}

function getPct(courseId) {
  const t = getTotal(courseId);
  return t ? Math.round(getDone(courseId) / t * 100) : 0;
}

function markLesson(lessonId) {
  if (!currentCourse) return;
  if (!progress[currentCourse.id]) progress[currentCourse.id] = {};
  progress[currentCourse.id][lessonId] = true;
  saveProgress();
  renderSidebar();
  updateSidebarProgress();
}

// ══════════════════════════════════════════
//  RENDER COURSES GRID
// ══════════════════════════════════════════
function renderCourses(filter) {
  const grid = document.getElementById('courses-grid');
  const label = document.getElementById('count-label');
  if (!grid) return;
  const list = filter === 'all' ? COURSES : COURSES.filter(c => c.category === filter);
  label.textContent = list.length + ' cursos';
  grid.innerHTML = list.map(c => {
    const pct = getPct(c.id);
    return `<div class="card" onclick="openCourse('${c.id}')">
      <div class="card-icon" style="background:${c.tagBg}">${c.icon}</div>
      <div class="card-tag" style="background:${c.tagBg};color:${c.tagColor}">${c.tag}</div>
      <div class="card-title">${c.title}</div>
      <div class="card-desc">${c.desc}</div>
      <div class="card-meta">
        <span class="meta">📚 ${c.lessons} lec.</span>
        <span class="meta">✏️ ${c.exercises} ej.</span>
        <span class="meta">${c.level}</span>
        <span class="card-arrow">→</span>
      </div>
      <div class="card-bar"><div class="card-bar-fill" style="width:${pct}%"></div></div>
      ${pct > 0 ? `<div class="card-pct">${pct}% completado</div>` : ''}
    </div>`;
  }).join('');
}

function filterBy(cat, btn) {
  document.querySelectorAll('.fbtn').forEach(b => b.classList.remove('active'));
  btn.classList.add('active');
  renderCourses(cat);
}

// ══════════════════════════════════════════
//  MI RUTA
// ══════════════════════════════════════════
function renderRuta() {
  const grid = document.getElementById('ruta-grid');
  if (!grid) return;
  grid.innerHTML = COURSES.map(c => {
    const pct = getPct(c.id);
    const done = getDone(c.id);
    const total = getTotal(c.id);
    return `<div class="ruta-card" onclick="openCourse('${c.id}')">
      <div class="ruta-card-top">
        <div class="ruta-icon">${c.icon}</div>
        <div class="ruta-info">
          <h4>${c.title}</h4>
          <p>${done} / ${total} lecciones · ${pct}%</p>
        </div>
      </div>
      <div class="ruta-bar"><div class="ruta-fill" style="width:${pct}%"></div></div>
    </div>`;
  }).join('');
}

// ══════════════════════════════════════════
//  OPEN COURSE
// ══════════════════════════════════════════
function openCourse(id) {
  currentCourse = COURSES.find(c => c.id === id);
  if (!currentCourse) return;
  showView('course');
  renderSidebar();
  // abrir primera lección no completada
  const p = progress[id] || {};
  for (const mod of currentCourse.modules) {
    for (const item of mod.items) {
      if (!p[item.id]) { openLesson(item.id); return; }
    }
  }
  // todas completadas: abrir la primera
  openLesson(currentCourse.modules[0].items[0].id);
}

// ══════════════════════════════════════════
//  SIDEBAR
// ══════════════════════════════════════════
function renderSidebar() {
  const c = currentCourse;
  const p = progress[c.id] || {};
  document.getElementById('sb-title').textContent = c.icon + ' ' + c.title;
  updateSidebarProgress();
  const menu = document.getElementById('sb-menu');
  menu.innerHTML = c.modules.map(mod => `
    <div class="sb-section">
      <div class="sb-section-label">${mod.label}</div>
      ${mod.items.map(item => {
        const done = !!p[item.id];
        const active = item.id === currentLessonId;
        return `<button class="sb-item ${done ? 'done' : ''} ${active ? 'active' : ''}"
          onclick="openLesson('${item.id}')">
          <div class="sb-dot">${done ? '✓' : ''}</div>
          <span>${item.title}</span>
        </button>`;
      }).join('')}
    </div>`).join('');
}

function updateSidebarProgress() {
  const c = currentCourse;
  const done = getDone(c.id);
  const total = getTotal(c.id);
  const pct = total ? Math.round(done / total * 100) : 0;
  document.getElementById('sb-prog-text').textContent = `${done} / ${total} lecciones`;
  document.getElementById('sb-fill').style.width = pct + '%';
}

// ══════════════════════════════════════════
//  OPEN LESSON
// ══════════════════════════════════════════
function openLesson(id) {
  currentLessonId = id;
  renderSidebar();
  const main = document.getElementById('lesson-main');
  const lesson = LESSONS[id];

  // encontrar prev / next
  let all = [];
  for (const mod of currentCourse.modules) for (const item of mod.items) all.push(item);
  const idx = all.findIndex(x => x.id === id);
  const prev = all[idx - 1];
  const next = all[idx + 1];

  if (!lesson) {
    const item = all[idx];
    main.innerHTML = `
      ${bc(item ? item.title : id)}
      <div class="lesson-title">${item ? item.title : id}</div>
      <div class="lesson-sub">Esta lección está en construcción. Puedes marcarla como completada para avanzar en tu progreso.</div>
      <div class="callout callout-info"><div class="callout-label">ℹ️ Info</div>Próximamente tendrá explicaciones paso a paso, ejemplos de código ejecutable y ejercicios prácticos.</div>
      ${lessonNav(prev, next, id)}`;
    main.scrollTop = 0;
    return;
  }

  let html = bc(lesson.title);
  html += `<div class="lesson-title">${lesson.title}</div>`;
  html += `<div class="lesson-sub">${lesson.subtitle}</div>`;
  html += `<div class="lesson-badges">${lesson.badges.map(b => `<span class="lbadge">${b}</span>`).join('')}</div>`;
  if (lesson.html)     html += lesson.html;
  if (lesson.code1)    html += editor(lesson.code1, id + '_e1');
  if (lesson.callout1) html += callout(lesson.callout1);
  if (lesson.html2)    html += lesson.html2;
  if (lesson.code2)    html += editor(lesson.code2, id + '_e2');
  if (lesson.callout2) html += callout(lesson.callout2);

  if (lesson.exercises && lesson.exercises.length) {
    html += `<div class="prose"><h3>Ejercicios prácticos</h3></div>`;
    lesson.exercises.forEach((ex, i) => { html += exercise(ex, id, i); });
  }

  html += lessonNav(prev, next, id);
  main.innerHTML = html;
  main.scrollTop = 0;
}

// ── helpers de render ──
function bc(title) {
  return `<div class="lesson-bc">${currentCourse.title} <span>/</span> ${title}</div>`;
}

function callout(c) {
  const labels = { tip: '💡 Consejo', warn: '⚠️ Advertencia', info: 'ℹ️ Info' };
  return `<div class="callout callout-${c.type}">
    <div class="callout-label">${labels[c.type] || 'Nota'}</div>
    ${c.text}
  </div>`;
}

function editor(code, uid) {
  return `<div class="editor">
    <div class="ed-header">
      <div class="ed-dots">
        <div class="ed-dot" style="background:#ff5f57"></div>
        <div class="ed-dot" style="background:#febc2e"></div>
        <div class="ed-dot" style="background:#28c840"></div>
      </div>
      <div class="ed-file">${code.file || 'code.py'}</div>
      <div class="ed-btns">
        <button class="ed-btn" onclick="clearOut('out_${uid}')">Limpiar</button>
        <button class="ed-btn run" onclick="runCode('ta_${uid}','out_${uid}')">▶ Ejecutar</button>
      </div>
    </div>
    <div class="ed-code"><textarea id="ta_${uid}" spellcheck="false">${escHtml(code.starter || '')}</textarea></div>
    <div class="ed-output" id="out_${uid}">
      <div class="out-line"><span class="out-p">$</span><span class="out-dim">Presiona Ejecutar para ver el resultado…</span></div>
    </div>
  </div>`;
}

function exercise(ex, lid, idx) {
  const diffClass = ex.diff === 'easy' ? 'diff-easy' : ex.diff === 'med' ? 'diff-med' : 'diff-hard';
  const diffLabel = ex.diff === 'easy' ? 'Fácil' : ex.diff === 'med' ? 'Medio' : 'Difícil';
  const uid = `${lid}_x${idx}`;
  return `<div class="exercise">
    <div class="ex-head">
      <div class="ex-num">${ex.num}</div>
      <div class="ex-title">${ex.title}</div>
      <div class="ex-diff ${diffClass}">${diffLabel}</div>
    </div>
    <div class="ex-body">
      <div class="ex-desc">${ex.desc}</div>
      <div class="editor" style="margin:0 0 12px">
        <div class="ed-header">
          <div class="ed-dots">
            <div class="ed-dot" style="background:#ff5f57"></div>
            <div class="ed-dot" style="background:#febc2e"></div>
            <div class="ed-dot" style="background:#28c840"></div>
          </div>
          <div class="ed-file">ejercicio_${ex.num}.py</div>
          <div class="ed-btns">
            <button class="ed-btn run" onclick="runCode('ta_${uid}','out_${uid}')">▶ Ejecutar</button>
          </div>
        </div>
        <div class="ed-code"><textarea id="ta_${uid}" spellcheck="false">${escHtml(ex.starter || '')}</textarea></div>
        <div class="ed-output" id="out_${uid}">
          <div class="out-line"><span class="out-p">$</span><span class="out-dim">Escribe tu solución y ejecuta…</span></div>
        </div>
      </div>
      <div class="ex-actions">
        <button class="btn-mark" onclick="markLesson('${lid}');this.textContent='✓ Completada';this.style.color='var(--green)';this.style.borderColor='var(--green)'">✓ Marcar como completada</button>
        <button class="btn-sol" onclick="toggleSol('sol_${uid}',this)">👁 Ver solución</button>
      </div>
      <div class="solution" id="sol_${uid}">
        <div class="sol-label">✓ Solución</div>
        <div class="sol-code">${escHtml(ex.solution || '# Sin solución disponible')}</div>
      </div>
    </div>
  </div>`;
}

function lessonNav(prev, next, currentId) {
  const prevBtn = prev
    ? `<button class="lnav-btn" onclick="openLesson('${prev.id}')">
        <div class="lnav-label">← Anterior</div>
        <div class="lnav-title">${prev.title}</div>
      </button>`
    : `<div></div>`;

  const nextBtn = next
    ? `<button class="lnav-btn lnav-next" onclick="markLesson('${currentId}');openLesson('${next.id}')">
        <div class="lnav-label">Siguiente →</div>
        <div class="lnav-title">${next.title}</div>
      </button>`
    : `<button class="lnav-btn lnav-next" onclick="markLesson('${currentId}');showCert()">
        <div class="lnav-label">Finalizar →</div>
        <div class="lnav-title">🏆 Ver certificado</div>
      </button>`;

  return `<div class="lesson-nav">${prevBtn}${nextBtn}</div>`;
}

function escHtml(s) {
  return s.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;');
}

// ══════════════════════════════════════════
//  CODE RUNNER — simulado (sin backend)
// ══════════════════════════════════════════
function runCode(taId, outId) {
  const ta = document.getElementById(taId);
  const out = document.getElementById(outId);
  if (!ta || !out) return;

  const code = ta.value;
  const lines = code.split('\n');
  const results = [];

  lines.forEach(line => {
    const t = line.trim();
    if (!t || t.startsWith('#') || t.startsWith('--')) return;

    // Python print()
    const pm = t.match(/^print\((.+)\)$/);
    if (pm) {
      let inner = pm[1].trim();
      // f-string
      if (/^f["']/.test(inner)) {
        inner = inner.slice(2, -1)
          .replace(/\{([^}]+)\}/g, (_, expr) => {
            try { return evalExpr(expr, code); } catch { return '{' + expr + '}'; }
          });
        results.push({ text: inner, ok: true });
      }
      // plain string
      else if (/^["']/.test(inner)) {
        results.push({ text: inner.slice(1, -1), ok: true });
      }
      // expression
      else {
        try { results.push({ text: String(safeEval(inner, code)), ok: true }); }
        catch { results.push({ text: '→ ' + inner, ok: true }); }
      }
      return;
    }

    // JS console.log()
    const cl = t.match(/^console\.log\((.+)\)$/);
    if (cl) {
      let inner = cl[1].trim();
      if (/^`/.test(inner)) {
        inner = inner.slice(1, -1).replace(/\$\{([^}]+)\}/g, (_, e) => {
          try { return evalExpr(e, code); } catch { return e; }
        });
        results.push({ text: inner, ok: true });
      } else if (/^["']/.test(inner)) {
        results.push({ text: inner.slice(1, -1), ok: true });
      } else {
        try { results.push({ text: String(safeEval(inner, code)), ok: true }); }
        catch { results.push({ text: '→ ' + inner, ok: true }); }
      }
    }
  });

  if (!results.length) {
    out.innerHTML = `<div class="out-line"><span class="out-p">$</span><span class="out-dim">Código ejecutado. Agrega print() o console.log() para ver salida.</span></div>`;
  } else {
    out.innerHTML = results.map(r =>
      `<div class="out-line"><span class="out-p">›</span><span class="${r.ok ? 'out-ok' : 'out-err'}">${escHtml(r.text)}</span></div>`
    ).join('');
  }
}

function evalExpr(expr, code) {
  // Extraer variables del código
  const vars = {};
  const varRe = /^(\w+)\s*=\s*(.+)$/;
  code.split('\n').forEach(line => {
    const m = line.trim().match(varRe);
    if (m && !['if','while','for','def','class','return'].includes(m[1])) {
      try {
        const raw = m[2].replace(/True/g,'true').replace(/False/g,'false').replace(/None/g,'null');
        vars[m[1]] = Function('return ' + raw)();
      } catch {}
    }
  });
  // Limpiar expresión
  let e = expr.trim()
    .replace(/True/g,'true').replace(/False/g,'false').replace(/None/g,'null')
    .replace(/:\.\d+f/, '').replace(/\|/g,'');
  return Function(...Object.keys(vars), 'return ' + e)(...Object.values(vars));
}

function safeEval(expr, code) {
  return evalExpr(expr, code);
}

function clearOut(outId) {
  const out = document.getElementById(outId);
  if (out) out.innerHTML = `<div class="out-line"><span class="out-p">$</span><span class="out-dim">Salida limpiada.</span></div>`;
}

function toggleSol(id, btn) {
  const el = document.getElementById(id);
  if (!el) return;
  el.classList.toggle('show');
  btn.textContent = el.classList.contains('show') ? '🙈 Ocultar' : '👁 Ver solución';
}

// ══════════════════════════════════════════
//  CERTIFICADO
// ══════════════════════════════════════════
function showCert() {
  document.getElementById('cert-name').textContent = currentCourse ? currentCourse.title : '—';
  document.getElementById('cert-date').textContent = new Date().toLocaleDateString('es-MX', {
    year: 'numeric', month: 'long', day: 'numeric'
  });
  document.getElementById('cert-modal').classList.add('open');
}

function closeCert() {
  document.getElementById('cert-modal').classList.remove('open');
}

// ══════════════════════════════════════════
//  INIT
// ══════════════════════════════════════════
document.addEventListener('DOMContentLoaded', () => {
  renderCourses('all');
});
