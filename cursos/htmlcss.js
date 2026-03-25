// Curso de HTML & CSS para DevLearn modular
window.COURSES = window.COURSES || [];
window.COURSES.push({
  id:'html', title:'HTML & CSS', icon:'🎨', tag:'Web', category:'web',
  color:'#f87171', tagBg:'rgba(248,113,113,.12)', tagColor:'#f87171',
  desc:'Estructura y estilo. Semántica HTML5, Flexbox, Grid, variables CSS y responsive.',
  lessons:10, exercises:30, level:'Principiante',
  modules:[
    { label:'HTML5', items:[
      {id:'html-01', title:'Estructura y Semántica'},
      {id:'html-02', title:'Formularios y validación'},
      {id:'html-03', title:'Tablas y Multimedia'},
    ]},
    { label:'CSS3', items:[
      {id:'html-04', title:'Selectores y especificidad'},
      {id:'html-05', title:'Box Model y Display'},
      {id:'html-06', title:'Flexbox completo'},
      {id:'html-07', title:'CSS Grid completo'},
      {id:'html-08', title:'Animaciones y Transiciones'},
    ]},
    { label:'Responsive', items:[
      {id:'html-09', title:'Media Queries'},
      {id:'html-10', title:'Variables CSS y Temas'},
    ]},
  ]
});
