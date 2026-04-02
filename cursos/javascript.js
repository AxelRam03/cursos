// Curso de JavaScript para DevLearn modular
window.COURSES = window.COURSES || [];
window.COURSES.push({
  id:'javascript', title:'JavaScript', icon:'⚡', tag:'Web', category:'web',
  color:'#fbbf24', tagBg:'rgba(251,191,36,.12)', tagColor:'#fbbf24',
  desc:'El lenguaje del navegador. DOM, ES6+, async/await, fetch y Node.js.',
  lessons:10, exercises:38, level:'Principiante → Avanzado',
  modules:[
    { label:'Fundamentos', items:[
      {id:'js-01', title:'var, let y const'},
      {id:'js-02', title:'Funciones y Arrow Functions'},
      {id:'js-03', title:'Arrays y Objetos'},
      {id:'js-04', title:'Destructuring y Spread'},
    ]},
    { label:'DOM y Browser', items:[
      {id:'js-05', title:'Manipulación del DOM'},
      {id:'js-06', title:'Eventos y Listeners'},
      {id:'js-07', title:'Fetch y Promesas'},
    ]},
    { label:'JavaScript Moderno', items:[
      {id:'js-08', title:'Async / Await'},
      {id:'js-09', title:'Módulos ES6'},
      {id:'js-10', title:'Introducción a Node.js'},
    ]},
  ]
});
