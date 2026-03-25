// ═══════════════════════════════════════════
//  DevLearn — data.js  (estructura mínima válida)
// ═══════════════════════════════════════════

window.COURSES = [
  {
    id: 'javascript',
    title: 'JavaScript',
    icon: '⚡',
    tag: 'Web',
    category: 'web',
    color: '#fbbf24',
    tagBg: 'rgba(251,191,36,.12)',
    tagColor: '#fbbf24',
    desc: 'El lenguaje del navegador. DOM, ES6+, async/await, fetch y Node.js.',
    lessons: 1,
    exercises: 0,
    level: 'Principiante',
    modules: [
      { label: 'Fundamentos', items: [ { id: 'js-01', title: 'var, let y const' } ] }
    ]
  }
];

window.LESSONS = {
  'js-01': {
    id: 'js-01',
    course: 'javascript',
    title: 'var, let y const',
    content: '<h2>Variables en JavaScript</h2><p>Aprende la diferencia entre <b>var</b>, <b>let</b> y <b>const</b>.</p>'
  }
};

<script src="https://www.gstatic.com/firebasejs/8.10.0/firebase-app.js"></script>
<script src="https://www.gstatic.com/firebasejs/8.10.0/firebase-auth.js"></script>
<script src="src/js/data.js"></script>
<script src="src/js/app.js"></script>
