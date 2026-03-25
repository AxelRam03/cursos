// Curso de Python para DevLearn modular
window.COURSES = window.COURSES || [];
window.COURSES.push({
  id:'python', title:'Python', icon:'🐍', tag:'Backend', category:'backend',
  color:'#4ade80', tagBg:'rgba(74,222,128,.12)', tagColor:'#4ade80',
  desc:'De cero a senior. Variables, funciones, POO, APIs, async, testing y proyectos reales.',
  lessons:12, exercises:45, level:'Principiante → Senior',
  modules:[
    { label:'Fundamentos', items:[
      {id:'py-01', title:'Variables y Tipos de Datos'},
      {id:'py-02', title:'Operadores y Expresiones'},
      {id:'py-03', title:'Condicionales (if/elif/else)'},
      {id:'py-04', title:'Bucles for y while'},
      {id:'py-05', title:'Funciones'},
    ]},
    { label:'Estructuras de Datos', items:[
      {id:'py-06', title:'Listas y Comprensiones'},
      {id:'py-07', title:'Diccionarios'},
      {id:'py-08', title:'Tuplas y Sets'},
    ]},
    { label:'Nivel Avanzado', items:[
      {id:'py-09', title:'Clases y POO'},
      {id:'py-10', title:'Decoradores y Generadores'},
      {id:'py-11', title:'APIs con requests'},
      {id:'py-12', title:'Testing con pytest'},
    ]},
  ]
});
