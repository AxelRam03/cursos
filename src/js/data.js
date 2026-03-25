// ═══════════════════════════════════════════
//  DevLearn — data.js  (cursos y lecciones)
// ═══════════════════════════════════════════

window.COURSES = [
  {
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
  },
  {
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
  },
  {
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
  },
  {
    id:'sql', title:'SQL', icon:'🗄️', tag:'Bases de datos', category:'db',
    color:'#60a5fa', tagBg:'rgba(96,165,250,.12)', tagColor:'#60a5fa',
    desc:'SELECT hasta procedimientos almacenados. PostgreSQL, MySQL y diseño de esquemas.',
    lessons:10, exercises:40, level:'Principiante → Avanzado',
    modules:[
      { label:'Consultas Básicas', items:[
        {id:'sql-01', title:'SELECT, WHERE, ORDER BY'},
        {id:'sql-02', title:'INSERT, UPDATE, DELETE'},
        {id:'sql-03', title:'Funciones de agregación'},
      ]},
      { label:'Relaciones', items:[
        {id:'sql-04', title:'JOINS: INNER, LEFT, RIGHT'},
        {id:'sql-05', title:'Subqueries'},
        {id:'sql-06', title:'Diseño de tablas y FK'},
      ]},
      { label:'Avanzado', items:[
        {id:'sql-07', title:'Índices y Performance'},
        {id:'sql-08', title:'Vistas y CTEs'},
        {id:'sql-09', title:'Transacciones'},
        {id:'sql-10', title:'Procedimientos almacenados'},
      ]},
    ]
  },
  {
    id:'kubernetes', title:'Kubernetes', icon:'⚙️', tag:'DevOps', category:'cloud',
    color:'#818cf8', tagBg:'rgba(129,140,248,.12)', tagColor:'#818cf8',
    desc:'Orquestación de contenedores. Pods, Deployments, Services, Helm y autoscaling.',
    lessons:10, exercises:28, level:'Intermedio',
    modules:[
      { label:'Fundamentos', items:[
        {id:'k8s-01', title:'Arquitectura de Kubernetes'},
        {id:'k8s-02', title:'kubectl y kubeconfig'},
        {id:'k8s-03', title:'Pods y Namespaces'},
      ]},
      { label:'Workloads', items:[
        {id:'k8s-04', title:'Deployments y ReplicaSets'},
        {id:'k8s-05', title:'Services e Ingress'},
        {id:'k8s-06', title:'ConfigMaps y Secrets'},
        {id:'k8s-07', title:'Persistent Volumes'},
      ]},
      { label:'Producción', items:[
        {id:'k8s-08', title:'Helm: gestor de paquetes'},
        {id:'k8s-09', title:'Autoscaling (HPA)'},
        {id:'k8s-10', title:'Monitoring con Prometheus'},
      ]},
    ]
  },
  {
    id:'azure', title:'Microsoft Azure', icon:'🌐', tag:'Cloud', category:'cloud',
    color:'#38bdf8', tagBg:'rgba(56,189,248,.12)', tagColor:'#38bdf8',
    desc:'VMs, App Service, AKS, Azure DevOps, ARM Templates y mucho más.',
    lessons:10, exercises:24, level:'Principiante → Avanzado',
    modules:[
      { label:'Fundamentos', items:[
        {id:'az-01', title:'Introducción a Azure'},
        {id:'az-02', title:'Regiones, grupos y suscripciones'},
        {id:'az-03', title:'Azure Active Directory'},
      ]},
      { label:'Cómputo y Red', items:[
        {id:'az-04', title:'Virtual Machines'},
        {id:'az-05', title:'App Service y Functions'},
        {id:'az-06', title:'Redes virtuales y NSG'},
      ]},
      { label:'DevOps y Containers', items:[
        {id:'az-07', title:'Azure Kubernetes Service (AKS)'},
        {id:'az-08', title:'Azure Container Registry'},
        {id:'az-09', title:'Azure DevOps Pipelines'},
        {id:'az-10', title:'Monitor y Log Analytics'},
      ]},
    ]
  },
  {
    id:'ocne', title:'Oracle Cloud Native', icon:'☁️', tag:'Cloud', category:'cloud',
    color:'#f97316', tagBg:'rgba(249,115,22,.12)', tagColor:'#f97316',
    desc:'OCI desde cero. Compute, Networking, OKE, Functions y observabilidad.',
    lessons:8, exercises:20, level:'Intermedio',
    modules:[
      { label:'OCI Fundamentos', items:[
        {id:'oci-01', title:'Introducción a OCI'},
        {id:'oci-02', title:'Compute, Storage y Redes'},
        {id:'oci-03', title:'IAM y Compartments'},
      ]},
      { label:'Cloud Native', items:[
        {id:'oci-04', title:'OKE: Kubernetes en OCI'},
        {id:'oci-05', title:'Container Registry'},
        {id:'oci-06', title:'Functions y Serverless'},
        {id:'oci-07', title:'API Gateway'},
        {id:'oci-08', title:'Observability y Logging'},
      ]},
    ]
  },
  {
    id:'weblogic', title:'Oracle WebLogic', icon:'🔧', tag:'Backend', category:'backend',
    color:'#c084fc', tagBg:'rgba(192,132,252,.12)', tagColor:'#c084fc',
    desc:'Servidor de aplicaciones Java EE. Instalación, dominios, clusters y administración.',
    lessons:8, exercises:16, level:'Intermedio → Avanzado',
    modules:[
      { label:'Instalación y Dominios', items:[
        {id:'wl-01', title:'Arquitectura de WebLogic'},
        {id:'wl-02', title:'Instalación y Dominios'},
        {id:'wl-03', title:'Admin Console'},
      ]},
      { label:'Despliegue y Config', items:[
        {id:'wl-04', title:'Desplegar WAR y EAR'},
        {id:'wl-05', title:'Data Sources y JDBC'},
        {id:'wl-06', title:'Clusters y balanceo'},
      ]},
      { label:'Producción', items:[
        {id:'wl-07', title:'Tuning y JVM'},
        {id:'wl-08', title:'Seguridad y SSL'},
      ]},
    ]
  },
  {
    id:'databases', title:'Bases de Datos', icon:'📊', tag:'Datos', category:'data',
    color:'#34d399', tagBg:'rgba(52,211,153,.12)', tagColor:'#34d399',
    desc:'PostgreSQL, MySQL, MongoDB, Redis. Teoría, diseño, optimización y ORMs.',
    lessons:10, exercises:32, level:'Principiante → Avanzado',
    modules:[
      { label:'Relacionales', items:[
        {id:'db-01', title:'Modelo relacional y normalización'},
        {id:'db-02', title:'PostgreSQL: instalación y uso'},
        {id:'db-03', title:'MySQL: diferencias clave'},
      ]},
      { label:'NoSQL', items:[
        {id:'db-04', title:'MongoDB: documentos y colecciones'},
        {id:'db-05', title:'Redis: caché y estructuras'},
        {id:'db-06', title:'SQL vs NoSQL: cuándo usar cada uno'},
      ]},
      { label:'Diseño y Optimización', items:[
        {id:'db-07', title:'Diseño de esquemas'},
        {id:'db-08', title:'Índices y EXPLAIN'},
        {id:'db-09', title:'Backups y replicación'},
        {id:'db-10', title:'ORM: SQLAlchemy y Prisma'},
      ]},
    ]
  },
];

// ═══════════════════════════════════════════
//  LESSON CONTENT
// ═══════════════════════════════════════════
window.LESSONS = {

  /* ──────── PYTHON ──────── */
  'py-01': {
    title: 'Variables y Tipos de Datos',
    subtitle: 'Todo programa empieza aquí. Aprende cómo Python guarda y clasifica la información.',
    badges: ['Python 3.x', '~30 min', 'Principiante'],
    html: `
<div class="prose">
<p>Una <strong>variable</strong> es un nombre que señala a un espacio en la memoria de tu computadora. Piensa en ella como una etiqueta pegada a un cajón: tú eliges el nombre, y adentro guardas el valor.</p>
<p>Python es de <strong>tipado dinámico</strong>: no necesitas declarar el tipo de dato, Python lo detecta automáticamente cuando asignas el valor.</p>
<h3>Los 5 tipos primitivos de Python</h3>
<ul>
<li><strong>int</strong>: números enteros (10, -5, 2024)</li>
<li><strong>float</strong>: números decimales (3.14, -0.5)</li>
<li><strong>str</strong>: texto ("Hola", 'Mundo')</li>
<li><strong>bool</strong>: verdadero o falso (True, False)</li>
<li><strong>NoneType</strong>: ausencia de valor (None)</li>
</ul>
</div>`,
    code1: { file:'variables.py', starter:
`# ── Tipos de datos en Python ──

# int: números enteros
edad = 25
año = 2025

# float: números decimales
</div>`,
    code2: { file:'conversion.py', starter:
`# Convertir entre tipos
numero_texto = "42"
numero_entero = int(numero_texto)   # "42" → 42
# Por eso debes convertir:

};
        desc: 'Crea variables con tu nombre, edad, ciudad y si eres estudiante (bool). Luego imprímelas en una sola línea usando f-string.',
        starter: `# Tu código aquí
nombre = ___
edad = ___
ciudad = ___
es_estudiante = ___

print(f"...")`,
        solution: `nombre = "Ana"\nedad = 22\nciudad = "CDMX"\nes_estudiante = True\nprint(f"Soy {nombre}, tengo {edad} años, vivo en {ciudad}. ¿Estudiante? {es_estudiante}")`
      },
      { num: 2, title: 'Calculadora de IMC', diff: 'med',
        desc: 'Pide al usuario su peso (kg) y altura (m). Calcula el IMC = peso / altura². Imprime el resultado con 2 decimales.',
        starter: `peso = float(input("Peso en kg: "))
altura = float(input("Altura en m: "))
imc = ___
print(f"Tu IMC es: {imc:.2f}")`,
        solution: `peso = float(input("Peso en kg: "))\naltura = float(input("Altura en m: "))\nimc = peso / (altura ** 2)\nprint(f"Tu IMC es: {imc:.2f}")`
      }
    ]
  },

  /* ──────── JAVASCRIPT ──────── */
  'js-01': {
    title: 'Variables en JavaScript: var, let, const',
    subtitle: 'Entiende las diferencias entre las tres formas de declarar variables y cuándo usar cada una.',
    badges: ['ES6+', '~25 min', 'Principiante'],
    html: `<div class="prose"><p>JavaScript tiene tres palabras clave para declarar variables. Usarlas correctamente es lo primero que diferencia a un principiante de alguien que sabe lo que hace.</p><h3>let — la opción moderna para variables que cambian</h3></div>`,
    code1: { file:'variables.js', starter:
`// let — puede cambiar, scope de bloque
let edad = 25;
edad = 26;  // ✅ permitido

// const — no puede reasignarse
const PI = 3.14159;
// PI = 3;  // ❌ TypeError

// var — evítalo (scope raro, iza declaraciones)
// var nombre = "Ana";  // funciona pero no recomendado

// Tipos en JavaScript
let numero = 42;          // number
let decimal = 3.14;       // number (mismo tipo)
let texto = "Hola";       // string
let activo = true;        // boolean
let vacio = null;         // null
let sinDefinir;           // undefined
let obj = { x: 1 };      // object

// typeof para saber el tipo
console.log(typeof numero);   // "number"
console.log(typeof texto);    // "string"

// Template literals (como f-strings en Python)
let nombre = "Carlos";
console.log(\`Hola, \${nombre}! Tienes \${edad} años.\`);`
    },
    callout: { type: 'warn', text: 'Regla práctica: usa const por defecto. Solo cambia a let cuando sepas que la variable va a cambiar. Nunca uses var en código nuevo.' },
    exercises: [
      { num: 1, title: 'Perfil de usuario', diff: 'easy',
        desc: 'Declara variables con const y let para: nombre (no cambia), edad (puede cambiar), email (no cambia). Luego "cumple años" sumando 1 a edad e imprime todo con template literals.',
        starter: `const nombre = ___
let edad = ___
const email = ___

// Cumpleaños
edad = ___

console.log(\`\${nombre} (\${email}) ahora tiene \${edad} años\`)`,
        solution: `const nombre = "Ana"\nlet edad = 25\nconst email = "ana@mail.com"\nedad = edad + 1\nconsole.log(\`\${nombre} (\${email}) ahora tiene \${edad} años\`)`
      }
    ]
  },

  /* ──────── HTML & CSS ──────── */
  'html-01': {
    title: 'Estructura y Semántica HTML5',
    subtitle: 'Aprende a crear páginas web bien estructuradas y accesibles.',
    badges: ['HTML5', '~20 min', 'Principiante'],
    html: `<div class="prose"><p>HTML es el lenguaje de marcado que da estructura a la web. Usar etiquetas semánticas ayuda a que tu sitio sea accesible y fácil de mantener.</p><h3>Ejemplo de estructura básica</h3></div>`,
    code1: { file:'index.html', starter:
`<!DOCTYPE html>
<html lang="es">
  <head>
    <meta charset="UTF-8">
    <title>Mi primera página</title>
  </head>
  <body>
    <header>
      <h1>Bienvenido a DevLearn</h1>
      <nav>
        <a href="#">Inicio</a>
        <a href="#">Cursos</a>
      </nav>
    </header>
    <main>
      <section>
        <h2>Sobre el curso</h2>
        <p>Aprende HTML desde cero.</p>
      </section>
    </main>
    <footer>
      <small>&copy; 2026 DevLearn</small>
    </footer>
  </body>
</html>`
    },
    callout: { type: 'tip', text: 'Siempre usa etiquetas semánticas: <header>, <nav>, <main>, <section>, <footer>. Mejoran SEO y accesibilidad.' },
    exercises: [
      { num: 1, title: 'Tu primera web', diff: 'easy',
        desc: 'Crea una página HTML con título, encabezado principal y un párrafo de bienvenida.',
        starter: `<!-- Tu código aquí -->
<html>
  <head>
    <title>___</title>
  </head>
  <body>
    <h1>___</h1>
    <p>___</p>
  </body>
</html>`,
        solution: `<html>\n  <head>\n    <title>Mi web</title>\n  </head>\n  <body>\n    <h1>Hola mundo</h1>\n    <p>Bienvenido a mi web</p>\n  </body>\n</html>`
      }
    ]
  },

  /* ──────── SQL ──────── */
  'sql-01': {
    title: 'SELECT, WHERE y ORDER BY',
    subtitle: 'Las tres cláusulas que usarás en el 80% de tus consultas SQL.',
    badges: ['SQL', '~35 min', 'Principiante'],
    html: `<div class="prose"><p>SQL (Structured Query Language) es el lenguaje para hablar con bases de datos relacionales. <strong>SELECT</strong> es la instrucción más usada: le dice a la base de datos qué datos quieres.</p><h3>Sintaxis básica</h3></div>`,
    code1: { file:'consultas.sql', starter:
`-- Seleccionar todas las columnas
SELECT * FROM empleados;

-- Seleccionar columnas específicas
SELECT nombre, salario, departamento
FROM empleados;

-- WHERE: filtrar filas
SELECT nombre, salario
FROM empleados
WHERE salario > 50000;

-- AND / OR en WHERE
SELECT nombre, salario
FROM empleados
WHERE departamento = 'TI'
  AND salario > 40000;

-- ORDER BY: ordenar resultados
SELECT nombre, salario
FROM empleados
ORDER BY salario DESC;   -- DESC = mayor a menor

-- LIMIT: traer solo N filas
SELECT nombre, salario
FROM empleados
ORDER BY salario DESC
LIMIT 5;   -- Top 5 mejor pagados

-- LIKE: búsqueda de texto
SELECT * FROM empleados
WHERE nombre LIKE 'Mar%';  -- empieza con "Mar"`
    },
    callout: { type: 'info', text: 'SQL no es case-sensitive para las palabras clave (select = SELECT), pero por convención se escriben en MAYÚSCULAS para diferenciarlas de los nombres de tablas y columnas.' },
    exercises: [
      { num: 1, title: 'Filtrar productos', diff: 'easy',
        desc: 'Escribe una consulta que traiga nombre y precio de la tabla "productos", solo donde el precio sea menor a 100, ordenados de menor a mayor precio.',
        starter: `-- Tu consulta aquí
SELECT ___, ___
FROM ___
WHERE ___ < 100
ORDER BY ___ ___;`,
        solution: `SELECT nombre, precio\nFROM productos\nWHERE precio < 100\nORDER BY precio ASC;`
      }
    ]
  },

  // ...puedes seguir agregando más lecciones y cursos aquí...

};

# ── f-strings: la forma moderna de imprimir ──
print(f"Hola, {nombre}. Tienes {edad} años y el precio es ${precio}")` },
    callout1: { type:'tip', text:"Las variables en Python se crean con solo escribir <strong>nombre = valor</strong>. Sin 'var', sin 'let', sin declarar tipo. ¡Así de simple!" },
    html2: `<div class="prose"><h3>Convertir entre tipos (casting)</h3><p>A veces necesitas transformar un tipo en otro. Python tiene funciones integradas para esto:</p></div>`,
    code2: { file:'casting.py', starter:
`# str → int
texto = "42"
numero = int(texto)       # 42
print(numero + 8)         # 50

# int → float
entero = 10
decimal = float(entero)   # 10.0

# número → str
n = 100
s = str(n)                # "100"

# input() SIEMPRE devuelve str — por eso conviertes:
# edad = int(input("¿Cuántos años tienes? "))
# print(f"El próximo año tendrás {edad + 1}")` },
    exercises: [
      { num:1, title:'Ficha personal', diff:'easy',
        desc:'Crea 4 variables: nombre (str), edad (int), altura (float) y es_estudiante (bool). Luego imprímelas todas en una sola línea usando f-string.',
        starter:`nombre = ___
edad = ___
altura = ___
es_estudiante = ___

print(f"...")`,
        solution:`nombre = "Ana"\nedad = 22\naltura = 1.68\nes_estudiante = True\nprint(f"Soy {nombre}, tengo {edad} años, mido {altura}m. ¿Estudiante? {es_estudiante}")` },
      { num:2, title:'Calculadora de IMC', diff:'med',
        desc:'Declara variables peso (kg) y altura (m). Calcula el IMC = peso / altura². Imprime el resultado con 2 decimales usando :.2f en el f-string.',
        starter:`peso = 70.0
altura = 1.75

imc = ___
print(f"Tu IMC es: {imc:___}")`,
        solution:`peso = 70.0\naltura = 1.75\nimc = peso / (altura ** 2)\nprint(f"Tu IMC es: {imc:.2f}")` },
    ]
  },

  'py-02': {
    title: 'Operadores y Expresiones',
    subtitle: 'Aprende a hacer cálculos, comparaciones y operaciones lógicas en Python.',
    badges: ['Python 3.x', '~25 min', 'Principiante'],
    html: `<div class="prose"><p>Los <strong>operadores</strong> son los símbolos que permiten operar sobre variables y valores. Hay 3 tipos principales que usarás todos los días.</p><h3>Operadores aritméticos</h3></div>`,
    code1: { file:'operadores.py', starter:
`a = 10
b = 3

print(a + b)    # Suma          → 13
print(a - b)    # Resta         → 7
print(a * b)    # Multiplicar   → 30
print(a / b)    # División real → 3.333...
print(a // b)   # División entera → 3
print(a % b)    # Módulo (residuo) → 1
print(a ** b)   # Potencia      → 1000

# Operadores de asignación compuesta
x = 10
x += 5    # x = x + 5  → 15
x -= 3    # x = x - 3  → 12
x *= 2    # x = x * 2  → 24
print(x)` },
    callout1: { type:'info', text:'El operador <strong>%</strong> (módulo) es muy útil para saber si un número es par: <em>n % 2 == 0</em> es True cuando n es par.' },
    html2: `<div class="prose"><h3>Operadores de comparación y lógicos</h3><p>Siempre devuelven <strong>True</strong> o <strong>False</strong>:</p></div>`,
    code2: { file:'comparaciones.py', starter:
`x = 5

# Comparación
print(x == 5)   # ¿Igual?          → True
print(x != 3)   # ¿Diferente?      → True
print(x > 3)    # ¿Mayor que?      → True
print(x < 3)    # ¿Menor que?      → False
print(x >= 5)   # ¿Mayor o igual?  → True
print(x <= 4)   # ¿Menor o igual?  → False

# Lógicos: and, or, not
edad = 20
tiene_id = True

print(edad >= 18 and tiene_id)   # True (los dos son True)
print(edad < 18 or tiene_id)     # True (al menos uno es True)
print(not tiene_id)              # False (invierte el valor)` },
    exercises: [
      { num:1, title:'Par o impar', diff:'easy',
        desc:'Dado un número, usa el operador % para determinar si es par o impar. Imprime el resultado.',
        starter:`numero = 17
es_par = numero % 2 == ___
print(f"{numero} es par: {es_par}")`,
        solution:`numero = 17\nes_par = numero % 2 == 0\nprint(f"{numero} es par: {es_par}")` },
      { num:2, title:'Calculadora de propina', diff:'med',
        desc:'Calcula la propina de una cuenta. La propina es 15% si el servicio es bueno, 20% si es excelente. Usa variables y operadores para calcularlo.',
        starter:`total = 850.0
servicio_excelente = True

propina_pct = 0.20 if servicio_excelente else ___
propina = total * ___
total_final = total + propina

print(f"Cuenta: ${total:.2f}")
print(f"Propina: ${propina:.2f}")
print(f"Total: ${total_final:.2f}")`,
        solution:`total = 850.0\nservicio_excelente = True\npropina_pct = 0.20 if servicio_excelente else 0.15\npropina = total * propina_pct\ntotal_final = total + propina\nprint(f"Cuenta: ${total:.2f}")\nprint(f"Propina: ${propina:.2f}")\nprint(f"Total: ${total_final:.2f}")` },
    ]
  },

  'py-03': {
    title: 'Condicionales: if, elif, else',
    subtitle: 'Dale a tu programa la capacidad de tomar decisiones según las condiciones.',
    badges: ['Python 3.x', '~30 min', 'Principiante'],
    html: `<div class="prose"><p>Las <strong>condicionales</strong> permiten que tu programa ejecute diferentes bloques de código dependiendo de si una condición es verdadera o falsa. Son el mecanismo de "toma de decisiones" de cualquier programa.</p><h3>Estructura básica</h3></div>`,
    code1: { file:'condicionales.py', starter:
`edad = 17

# if: se ejecuta si la condición es True
if edad >= 18:
    print("Eres mayor de edad")
elif edad >= 13:
    print("Eres adolescente")     # ← este se ejecuta
else:
    print("Eres un niño")

# Puedes anidar condiciones
tiene_trabajo = True
if edad >= 18:
    if tiene_trabajo:
        print("Mayor con trabajo")
    else:
        print("Mayor sin trabajo")

# Operador ternario: una condición en una línea
estado = "mayor" if edad >= 18 else "menor"
print(f"Eres {estado} de edad")` },
    callout1: { type:'warn', text:'En Python la <strong>indentación es obligatoria</strong>. Todo el código dentro de un if/elif/else debe tener 4 espacios (o 1 Tab) al inicio. Sin eso, Python lanza un error.' },
    html2: `<div class="prose"><h3>match/case — el switch moderno de Python (v3.10+)</h3></div>`,
    code2: { file:'match.py', starter:
`dia = "lunes"

match dia:
    case "lunes" | "martes" | "miércoles" | "jueves" | "viernes":
        print("Día laboral")
    case "sábado" | "domingo":
        print("Fin de semana")
    case _:
        print("Día desconocido")` },
    exercises: [
      { num:1, title:'Clasificador de notas', diff:'easy',
        desc:'Recibe una nota del 0 al 100 e imprime: Reprobado (< 60), Suficiente (60-69), Bien (70-84), Excelente (85-100).',
        starter:`nota = 78

if nota < 60:
    print(___)
elif nota < ___:
    print("Suficiente")
elif nota < ___:
    print("Bien")
else:
    print(___)`,
        solution:`nota = 78\nif nota < 60:\n    print("Reprobado")\nelif nota < 70:\n    print("Suficiente")\nelif nota < 85:\n    print("Bien")\nelse:\n    print("Excelente")` },
      { num:2, title:'Calculadora de descuento', diff:'med',
        desc:'Si el total supera $500 aplica 10% de descuento. Si supera $1000 aplica 20%. Si tiene código "VIP" aplica 30% adicional. Calcula el total final.',
        starter:`total = 1200
codigo = "VIP"

if total > 1000:
    descuento = 0.20
elif total > 500:
    descuento = 0.10
else:
    descuento = 0

if codigo == "VIP":
    descuento += ___

final = total * (1 - descuento)
print(f"Descuento: {descuento*100:.0f}%")
print(f"Total final: ${final:.2f}")`,
        solution:`total = 1200\ncodigo = "VIP"\nif total > 1000:\n    descuento = 0.20\nelif total > 500:\n    descuento = 0.10\nelse:\n    descuento = 0\nif codigo == "VIP":\n    descuento += 0.30\nfinal = total * (1 - descuento)\nprint(f"Descuento: {descuento*100:.0f}%")\nprint(f"Total final: ${final:.2f}")` },
    ]
  },

  'py-04': {
    title: 'Bucles: for y while',
    subtitle: 'Repite bloques de código sin escribirlos mil veces. Los bucles son la potencia real de la programación.',
    badges: ['Python 3.x', '~40 min', 'Principiante'],
    html: `<div class="prose"><p>Un <strong>bucle</strong> (loop) ejecuta el mismo bloque de código repetidamente. Sin bucles, tendrías que escribir cada línea manualmente. Con ellos, puedes procesar millones de datos con pocas líneas.</p><h3>for — cuando sabes cuántas veces repetir</h3></div>`,
    code1: { file:'bucles_for.py', starter:
`# range(n) genera 0, 1, 2, ..., n-1
for i in range(5):
    print(f"Vuelta {i}")

# range(inicio, fin)
for i in range(1, 6):     # 1, 2, 3, 4, 5
    print(i)

# range(inicio, fin, paso)
for i in range(0, 20, 5): # 0, 5, 10, 15
    print(i)

# Recorrer una lista
frutas = ["manzana", "pera", "uva"]
for fruta in frutas:
    print(f"Fruta: {fruta}")

# enumerate(): índice + valor
for i, fruta in enumerate(frutas):
    print(f"{i}: {fruta}")` },
    callout1: { type:'tip', text:'<strong>enumerate()</strong> es muy útil cuando necesitas tanto el índice como el valor. Úsalo siempre en vez de acceder por posición manualmente.' },
    html2: `<div class="prose"><h3>while — cuando no sabes cuántas veces repetir</h3></div>`,
    code2: { file:'bucles_while.py', starter:
`# while repite mientras la condición sea True
contador = 0
while contador < 5:
    print(f"Contador: {contador}")
    contador += 1   # ¡No olvides esto o será infinito!

# break: salir del bucle
for i in range(100):
    if i == 5:
        break
    print(i)    # imprime 0, 1, 2, 3, 4

# continue: saltar a la siguiente iteración
for i in range(10):
    if i % 2 == 0:
        continue   # salta los pares
    print(i)       # imprime 1, 3, 5, 7, 9

# else en bucle: se ejecuta si el bucle termina sin break
for i in range(5):
    print(i)
else:
    print("Bucle completado")` },
    exercises: [
      { num:1, title:'Tabla de multiplicar', diff:'easy',
        desc:'Imprime la tabla de multiplicar del número 7 (del 1 al 10) usando un bucle for y f-strings.',
        starter:`numero = 7
for i in range(___, ___):
    print(f"{numero} x {i} = {___}")`,
        solution:`numero = 7\nfor i in range(1, 11):\n    print(f"{numero} x {i} = {numero * i}")` },
      { num:2, title:'FizzBuzz', diff:'med',
        desc:'Imprime números del 1 al 30. Si es divisible entre 3, imprime "Fizz". Si es divisible entre 5, imprime "Buzz". Si es divisible entre ambos, imprime "FizzBuzz".',
        starter:`for n in range(1, 31):
    if n % 3 == 0 and n % 5 == 0:
        print(___)
    elif n % ___ == 0:
        print("Fizz")
    elif n % ___ == 0:
        print("Buzz")
    else:
        print(___)`,
        solution:`for n in range(1, 31):\n    if n % 3 == 0 and n % 5 == 0:\n        print("FizzBuzz")\n    elif n % 3 == 0:\n        print("Fizz")\n    elif n % 5 == 0:\n        print("Buzz")\n    else:\n        print(n)` },
    ]
  },

  'py-05': {
    title: 'Funciones',
    subtitle: 'Escribe código una vez, úsalo mil veces. Las funciones son el bloque más importante de la programación.',
    badges: ['Python 3.x', '~45 min', 'Principiante'],
    html: `<div class="prose"><p>Una <strong>función</strong> es un bloque de código con nombre que puedes ejecutar (llamar) cuantas veces quieras. Evitan la repetición, hacen el código legible y son la base de cualquier proyecto profesional.</p><h3>Definir y llamar funciones</h3></div>`,
    code1: { file:'funciones.py', starter:
`# def: define la función
# nombre: el nombre que le das
# parámetros: datos que recibe
def saludar(nombre):
    """Saluda a una persona."""   # docstring (documentación)
    print(f"¡Hola, {nombre}!")

# Llamar (ejecutar) la función
saludar("María")     # ¡Hola, María!
saludar("Juan")      # ¡Hola, Juan!

# Función con return: devuelve un valor
def sumar(a, b):
    return a + b

resultado = sumar(10, 5)
print(resultado)     # 15

# Parámetros por defecto
def saludar_formal(nombre, titulo="Sr."):
    return f"Buenos días, {titulo} {nombre}"

print(saludar_formal("García"))              # Buenos días, Sr. García
print(saludar_formal("López", "Dra."))       # Buenos días, Dra. López` },
    callout1: { type:'tip', text:'Regla de oro de los seniors: una función debe hacer <strong>UNA sola cosa</strong> y hacerla bien. Si tu función hace demasiado o tiene más de 20 líneas, divídela.' },
    html2: `<div class="prose"><h3>*args y **kwargs — funciones flexibles</h3></div>`,
    code2: { file:'args_kwargs.py', starter:
`# *args: acepta N argumentos posicionales
def sumar_todo(*args):
    return sum(args)

print(sumar_todo(1, 2, 3))         # 6
print(sumar_todo(10, 20, 30, 40))  # 100

# **kwargs: acepta N argumentos con nombre
def perfil(**kwargs):
    for clave, valor in kwargs.items():
        print(f"  {clave}: {valor}")

perfil(nombre="Ana", edad=25, ciudad="CDMX")

# Múltiples valores de retorno
def estadisticas(nums):
    return min(nums), max(nums), sum(nums)/len(nums)

minimo, maximo, promedio = estadisticas([3, 1, 8, 2, 9])
print(f"Min:{minimo} Max:{maximo} Avg:{promedio:.1f}")` },
    exercises: [
      { num:1, title:'Calculadora con funciones', diff:'easy',
        desc:'Crea 4 funciones: sumar, restar, multiplicar y dividir. Cada una recibe 2 números y retorna el resultado. La división debe manejar división entre cero retornando un mensaje de error.',
        starter:`def sumar(a, b):
    return ___

def restar(a, b):
    return ___

def multiplicar(a, b):
    return ___

def dividir(a, b):
    if b == ___:
        return "Error: división entre cero"
    return ___

print(sumar(10, 5))       # 15
print(dividir(10, 0))     # Error: división entre cero
print(dividir(10, 4))     # 2.5`,
        solution:`def sumar(a,b): return a+b\ndef restar(a,b): return a-b\ndef multiplicar(a,b): return a*b\ndef dividir(a,b):\n    if b==0: return "Error: división entre cero"\n    return a/b\nprint(sumar(10,5))\nprint(dividir(10,0))\nprint(dividir(10,4))` },
      { num:2, title:'Validador de contraseña', diff:'med',
        desc:'Crea una función validar_password(pwd) que regrese True si la contraseña tiene al menos 8 caracteres, una mayúscula y un número. False en caso contrario.',
        starter:`def validar_password(pwd):
    tiene_longitud = len(pwd) >= ___
    tiene_mayuscula = any(c.isupper() for c in pwd)
    tiene_numero = any(c.___ for c in pwd)
    return tiene_longitud and tiene_mayuscula and tiene_numero

print(validar_password("abc123"))       # False (sin mayúscula)
print(validar_password("Abc12345"))     # True
print(validar_password("ABCDEFG1"))     # True`,
        solution:`def validar_password(pwd):\n    tiene_longitud = len(pwd) >= 8\n    tiene_mayuscula = any(c.isupper() for c in pwd)\n    tiene_numero = any(c.isdigit() for c in pwd)\n    return tiene_longitud and tiene_mayuscula and tiene_numero\nprint(validar_password("abc123"))\nprint(validar_password("Abc12345"))\nprint(validar_password("ABCDEFG1"))` },
    ]
  },

  'py-06': {
    title: 'Listas y List Comprehensions',
    subtitle: 'La estructura de datos más usada en Python. Aprende a crearlas, modificarlas y procesarlas de forma eficiente.',
    badges: ['Python 3.x', '~40 min', 'Principiante'],
    html: `<div class="prose"><p>Una <strong>lista</strong> almacena múltiples valores en orden, accesibles por su posición (índice). Son mutables: puedes agregar, quitar y cambiar elementos después de crearlas.</p><h3>Crear y acceder</h3></div>`,
    code1: { file:'listas.py', starter:
`frutas = ["manzana", "pera", "uva", "mango", "kiwi"]

# Acceso por índice (empieza en 0)
print(frutas[0])     # manzana
print(frutas[-1])    # kiwi (último)
print(frutas[-2])    # mango (penúltimo)

# Slicing: obtener una porción
print(frutas[1:3])   # ['pera', 'uva']
print(frutas[:2])    # ['manzana', 'pera']
print(frutas[2:])    # ['uva', 'mango', 'kiwi']

# Métodos principales
frutas.append("fresa")    # agrega al final
frutas.insert(0, "lima")  # inserta en posición 0
frutas.remove("pera")     # elimina por valor
eliminado = frutas.pop()  # elimina y devuelve el último
frutas.sort()             # ordena en su lugar
print(len(frutas))        # longitud

# Buscar
print("uva" in frutas)        # True
print(frutas.index("mango"))  # posición de mango` },
    callout1: { type:'tip', text:'Los índices negativos en Python son un superpoder: <strong>lista[-1]</strong> es siempre el último elemento, <strong>lista[-2]</strong> el penúltimo, etc.' },
    html2: `<div class="prose"><h3>List Comprehensions — la forma pythónica</h3><p>Es una sintaxis compacta para crear listas a partir de otras. Es más rápida y más legible que un for tradicional:</p></div>`,
    code2: { file:'comprehensions.py', starter:
`# Forma tradicional (más larga)
cuadrados = []
for i in range(1, 6):
    cuadrados.append(i ** 2)

# List comprehension (forma pythónica)
cuadrados = [i ** 2 for i in range(1, 6)]
print(cuadrados)   # [1, 4, 9, 16, 25]

# Con filtro (if al final)
pares = [i for i in range(20) if i % 2 == 0]
print(pares)       # [0, 2, 4, 6, 8, 10, 12, 14, 16, 18]

# Transformar strings
nombres = ["ana", "luis", "eva"]
capitalizados = [n.capitalize() for n in nombres]
print(capitalizados)   # ['Ana', 'Luis', 'Eva']

# Filtrar y transformar a la vez
numeros = [-3, -1, 0, 2, 4, 7, -5]
positivos_dobles = [n * 2 for n in numeros if n > 0]
print(positivos_dobles)   # [4, 8, 14]` },
    exercises: [
      { num:1, title:'Lista de cuadrados', diff:'easy',
        desc:'Usa una list comprehension para crear una lista con los cuadrados de todos los números del 1 al 15 que sean impares.',
        starter:`impares_cuadrados = [___ for i in range(1, 16) if ___]
print(impares_cuadrados)
# [1, 9, 25, 49, 81, 121, 169, 196, 225]`,
        solution:`impares_cuadrados = [i**2 for i in range(1, 16) if i % 2 != 0]\nprint(impares_cuadrados)` },
      { num:2, title:'Procesar ventas', diff:'med',
        desc:'Dada una lista de ventas, crea: 1) una lista solo con ventas mayores a 500, 2) aplica 10% de descuento a cada una, 3) calcula el total.',
        starter:`ventas = [120, 650, 430, 890, 200, 750, 310, 980]

ventas_grandes = [v for v in ventas if v > ___]
con_descuento = [v * ___ for v in ventas_grandes]
total = sum(___)

print(f"Ventas mayores a $500: {ventas_grandes}")
print(f"Con descuento 10%: {con_descuento}")
print(f"Total: ${total:.2f}")`,
        solution:`ventas = [120, 650, 430, 890, 200, 750, 310, 980]\nventas_grandes = [v for v in ventas if v > 500]\ncon_descuento = [v * 0.90 for v in ventas_grandes]\ntotal = sum(con_descuento)\nprint(f"Ventas mayores a $500: {ventas_grandes}")\nprint(f"Con descuento 10%: {con_descuento}")\nprint(f"Total: ${total:.2f}")` },
    ]
  },

  'py-09': {
    title: 'Clases y Programación Orientada a Objetos',
    subtitle: 'Modela el mundo real en código. Las clases son el pilar de cualquier proyecto grande.',
    badges: ['Python 3.x', '~60 min', 'Intermedio'],
    html: `<div class="prose"><p>La <strong>Programación Orientada a Objetos (POO)</strong> organiza el código en "objetos" que tienen características (<em>atributos</em>) y comportamientos (<em>métodos</em>). Una <strong>clase</strong> es el molde; los <strong>objetos</strong> son lo que fabricas con ese molde.</p><h3>Tu primera clase</h3></div>`,
    code1: { file:'clases.py', starter:
`class Persona:
    # __init__: se ejecuta automáticamente al crear el objeto
    def __init__(self, nombre, edad):
        self.nombre = nombre   # atributo de instancia
        self.edad = edad

    # método: función que pertenece a la clase
    def saludar(self):
        return f"Hola, soy {self.nombre} y tengo {self.edad} años"

    def cumpleanos(self):
        self.edad += 1
        return f"¡Feliz cumpleaños! Ahora tengo {self.edad}"

    def __str__(self):   # cómo se ve con print()
        return f"Persona({self.nombre}, {self.edad})"

# Crear objetos (instancias)
p1 = Persona("Ana", 25)
p2 = Persona("Luis", 30)

print(p1.saludar())        # Hola, soy Ana y tengo 25 años
print(p1.cumpleanos())     # ¡Feliz cumpleaños! Ahora tengo 26
print(p2.nombre)           # Luis
print(p1)                  # Persona(Ana, 26)` },
    callout1: { type:'info', text:'<strong>self</strong> es la referencia al objeto actual. Cuando llamas p1.saludar(), Python pasa p1 como self automáticamente. Siempre debe ser el primer parámetro de cada método.' },
    html2: `<div class="prose"><h3>Herencia — reutiliza y extiende</h3><p>Una clase puede <em>heredar</em> todos los atributos y métodos de otra, y añadir los suyos propios o sobrescribir los existentes:</p></div>`,
    code2: { file:'herencia.py', starter:
`class Animal:
    def __init__(self, nombre, especie):
        self.nombre = nombre
        self.especie = especie

    def info(self):
        return f"{self.nombre} ({self.especie})"

    def sonido(self):
        return "..."

class Perro(Animal):    # Perro hereda de Animal
    def __init__(self, nombre):
        super().__init__(nombre, "Canis lupus familiaris")
        self.trucos = []

    def sonido(self):   # sobreescribe el método del padre
        return "¡Guau!"

    def aprender_truco(self, truco):
        self.trucos.append(truco)

class Gato(Animal):
    def __init__(self, nombre):
        super().__init__(nombre, "Felis catus")

    def sonido(self):
        return "¡Miau!"

# Polimorfismo: mismo método, diferente comportamiento
animales = [Perro("Rex"), Gato("Luna"), Perro("Max")]
for a in animales:
    print(f"{a.info()}: {a.sonido()}")` },
    exercises: [
      { num:1, title:'Clase BankAccount', diff:'med',
        desc:'Crea una clase CuentaBancaria con: atributos titular y saldo, métodos depositar(monto), retirar(monto) y consultar(). retirar() debe rechazar si no hay saldo suficiente.',
        starter:`class CuentaBancaria:
    def __init__(self, titular, saldo_inicial=0):
        self.titular = ___
        self.saldo = ___

    def depositar(self, monto):
        self.saldo += ___
        return f"Depositado ${monto}. Saldo: ${self.saldo}"

    def retirar(self, monto):
        if monto > ___:
            return "Saldo insuficiente"
        self.saldo -= monto
        return f"Retirado ${monto}. Saldo: ${self.saldo}"

    def consultar(self):
        return f"Cuenta de {self.titular}: ${self.saldo}"

cuenta = CuentaBancaria("Ana García", 1000)
print(cuenta.depositar(500))
print(cuenta.retirar(200))
print(cuenta.retirar(2000))
print(cuenta.consultar())`,
        solution:`class CuentaBancaria:\n    def __init__(self, titular, saldo_inicial=0):\n        self.titular = titular\n        self.saldo = saldo_inicial\n    def depositar(self, monto):\n        self.saldo += monto\n        return f"Depositado ${monto}. Saldo: ${self.saldo}"\n    def retirar(self, monto):\n        if monto > self.saldo:\n            return "Saldo insuficiente"\n        self.saldo -= monto\n        return f"Retirado ${monto}. Saldo: ${self.saldo}"\n    def consultar(self):\n        return f"Cuenta de {self.titular}: ${self.saldo}"\ncuenta = CuentaBancaria("Ana García", 1000)\nprint(cuenta.depositar(500))\nprint(cuenta.retirar(200))\nprint(cuenta.retirar(2000))\nprint(cuenta.consultar())` },
    ]
  },

  /* ──────── SQL ──────── */
  'sql-01': {
    title: 'SELECT, WHERE y ORDER BY',
    subtitle: 'Las tres cláusulas que conforman el 80% de todas las consultas SQL que escribirás.',
    badges: ['SQL', '~35 min', 'Principiante'],
    html: `<div class="prose"><p>SQL (Structured Query Language) es el lenguaje universal para hablar con bases de datos relacionales. Es declarativo: le dices <em>qué</em> quieres, no <em>cómo</em> obtenerlo.</p><h3>SELECT — el corazón de SQL</h3></div>`,
    code1: { file:'select_basico.sql', starter:
`-- Seleccionar todas las columnas (*) de una tabla
SELECT * FROM empleados;

-- Seleccionar columnas específicas (mejor práctica)
SELECT nombre, salario, departamento
FROM empleados;

-- WHERE: filtrar filas que cumplen una condición
SELECT nombre, salario
FROM empleados
WHERE salario > 50000;

-- Múltiples condiciones con AND / OR
SELECT nombre, salario
FROM empleados
WHERE departamento = 'TI'
  AND salario BETWEEN 40000 AND 80000;

-- ORDER BY: ordenar resultados
SELECT nombre, salario
FROM empleados
ORDER BY salario DESC;  -- DESC = mayor a menor, ASC = menor a mayor

-- LIMIT: traer solo N filas (top 5 mejor pagados)
SELECT nombre, salario
FROM empleados
ORDER BY salario DESC
LIMIT 5;` },
    callout1: { type:'info', text:'SQL no distingue mayúsculas/minúsculas en palabras clave, pero por convención se escriben en MAYÚSCULAS (SELECT, FROM, WHERE) para diferenciarlas de los nombres de tablas y columnas.' },
    html2: `<div class="prose"><h3>Operadores y patrones de búsqueda</h3></div>`,
    code2: { file:'operadores_sql.sql', starter:
`-- LIKE: búsqueda de texto con comodines
-- %: cero o más caracteres  _: exactamente uno
SELECT * FROM productos WHERE nombre LIKE 'Lap%';      -- empieza con Lap
SELECT * FROM clientes  WHERE email LIKE '%@gmail.com'; -- termina en @gmail.com

-- IN: valor en una lista
SELECT * FROM pedidos WHERE estado IN ('pendiente', 'procesando');

-- BETWEEN: rango de valores (inclusivo)
SELECT * FROM facturas WHERE total BETWEEN 100 AND 500;

-- IS NULL / IS NOT NULL
SELECT * FROM empleados WHERE telefono IS NULL;

-- DISTINCT: valores únicos
SELECT DISTINCT departamento FROM empleados;

-- Alias con AS
SELECT nombre AS empleado, salario * 12 AS salario_anual
FROM empleados;` },
    exercises: [
      { num:1, title:'Filtrar productos', diff:'easy',
        desc:'Escribe una consulta que traiga nombre y precio de la tabla "productos", solo donde el precio sea menor a $100, ordenados de menor a mayor.',
        starter:`SELECT ___, ___
FROM ___
WHERE ___ < 100
ORDER BY ___ ___;`,
        solution:`SELECT nombre, precio\nFROM productos\nWHERE precio < 100\nORDER BY precio ASC;` },
      { num:2, title:'Top 3 del departamento', diff:'med',
        desc:'Encuentra los 3 empleados mejor pagados del departamento "Ventas". Muestra nombre, departamento, salario y salario anual (salario*12).',
        starter:`SELECT nombre, departamento,
       salario,
       salario * ___ AS salario_anual
FROM empleados
WHERE departamento = ___
ORDER BY ___ DESC
LIMIT ___;`,
        solution:`SELECT nombre, departamento,\n       salario,\n       salario * 12 AS salario_anual\nFROM empleados\nWHERE departamento = 'Ventas'\nORDER BY salario DESC\nLIMIT 3;` },
    ]
  },

  /* ──────── KUBERNETES ──────── */
  'k8s-01': {
    title: 'Arquitectura de Kubernetes',
    subtitle: 'Antes de usar K8s, entiende cómo funciona por dentro. El conocimiento de la arquitectura te evitará horas de debugging.',
    badges: ['Kubernetes', '~40 min', 'Intermedio'],
    html: `<div class="prose"><p>Kubernetes (K8s) es un <strong>orquestador de contenedores</strong> open source creado por Google en 2014. Automatiza el despliegue, el escalado y la operación de aplicaciones en contenedores.</p><h3>Control Plane — el cerebro del cluster</h3><ul><li><strong>API Server:</strong> punto de entrada de toda comunicación. Todo pasa por aquí.</li><li><strong>etcd:</strong> base de datos distribuida que guarda el estado del cluster.</li><li><strong>Scheduler:</strong> decide en qué nodo corre cada Pod.</li><li><strong>Controller Manager:</strong> mantiene el estado deseado (ej: si un Pod muere, lo recrea).</li></ul><h3>Worker Nodes — donde corre tu aplicación</h3><ul><li><strong>kubelet:</strong> agente en cada nodo que ejecuta los Pods.</li><li><strong>kube-proxy:</strong> maneja el networking y las reglas de red.</li><li><strong>Container Runtime:</strong> el motor de contenedores (containerd, CRI-O).</li></ul></div>`,
    code1: { file:'kubectl_basico.sh', starter:
`# ── Comandos esenciales de kubectl ──

# Ver el estado del cluster
kubectl cluster-info
kubectl get nodes
kubectl get nodes -o wide    # más detalle

# Namespaces: espacios de nombres para organizar recursos
kubectl get namespaces
kubectl get pods --all-namespaces

# Crear recursos desde un archivo YAML
kubectl apply -f mi-deployment.yaml

# Ver recursos
kubectl get pods
kubectl get deployments
kubectl get services

# Describir un recurso (mucho detalle)
kubectl describe pod nombre-del-pod

# Ver logs de un Pod
kubectl logs nombre-del-pod
kubectl logs -f nombre-del-pod   # en tiempo real

# Ejecutar comando dentro del Pod
kubectl exec -it nombre-del-pod -- /bin/bash

# Eliminar recursos
kubectl delete pod nombre-del-pod
kubectl delete -f mi-deployment.yaml` },
    callout1: { type:'warn', text:'Nunca desplegues Pods directamente en producción. Siempre usa un <strong>Deployment</strong>. Si el Pod muere, el Deployment lo recrea automáticamente.' },
    html2: `<div class="prose"><h3>Tu primer Deployment YAML</h3></div>`,
    code2: { file:'deployment.yaml', starter:
`apiVersion: apps/v1
kind: Deployment
metadata:
  name: mi-app
  namespace: default
  labels:
    app: mi-app
    version: "1.0"
spec:
  replicas: 3              # mantiene 3 copias siempre activas
  selector:
    matchLabels:
      app: mi-app
  template:
    metadata:
      labels:
        app: mi-app
    spec:
      containers:
      - name: servidor
        image: nginx:1.25
        ports:
        - containerPort: 80
        resources:
          requests:          # mínimo garantizado
            memory: "64Mi"
            cpu: "100m"
          limits:            # máximo permitido
            memory: "128Mi"
            cpu: "500m"
        readinessProbe:      # ¿está listo para recibir tráfico?
          httpGet:
            path: /health
            port: 80
          initialDelaySeconds: 5
          periodSeconds: 10` },
    exercises: [
      { num:1, title:'Deployment para Node.js', diff:'med',
        desc:'Escribe un Deployment YAML para una API Node.js: imagen node:18-alpine, 2 réplicas, puerto 3000, con limits de 256Mi memoria y 500m CPU.',
        starter:`apiVersion: apps/v1
kind: Deployment
metadata:
  name: ___
spec:
  replicas: ___
  selector:
    matchLabels:
      app: ___
  template:
    metadata:
      labels:
        app: ___
    spec:
      containers:
      - name: api
        image: ___
        ports:
        - containerPort: ___
        resources:
          limits:
            memory: "___"
            cpu: "___"`,
        solution:`apiVersion: apps/v1\nkind: Deployment\nmetadata:\n  name: node-api\nspec:\n  replicas: 2\n  selector:\n    matchLabels:\n      app: node-api\n  template:\n    metadata:\n      labels:\n        app: node-api\n    spec:\n      containers:\n      - name: api\n        image: node:18-alpine\n        ports:\n        - containerPort: 3000\n        resources:\n          limits:\n            memory: "256Mi"\n            cpu: "500m"` },
    ]
  },

  /* ──────── AZURE ──────── */
  'az-01': {
    title: 'Introducción a Microsoft Azure',
    subtitle: 'Conoce la nube de Microsoft: qué es, cómo está organizada y los conceptos que necesitas para empezar.',
    badges: ['Azure', '~30 min', 'Principiante'],
    html: `<div class="prose"><p>Microsoft Azure es la plataforma de nube pública de Microsoft con más de <strong>200 servicios</strong>. Es la segunda nube más grande del mundo y domina el mercado enterprise.</p><h3>Conceptos fundamentales</h3><ul><li><strong>Tenant:</strong> tu organización en Azure Active Directory.</li><li><strong>Suscripción:</strong> unidad de facturación y límites de recursos.</li><li><strong>Resource Group:</strong> contenedor lógico para recursos relacionados.</li><li><strong>Región:</strong> ubicación geográfica del datacenter (East US, West Europe, etc.).</li></ul></div>`,
    code1: { file:'azure_cli.sh', starter:
`# Instalar Azure CLI:
# https://docs.microsoft.com/cli/azure/install-azure-cli

# Iniciar sesión
az login

# Ver suscripciones disponibles
az account list --output table

# Seleccionar suscripción activa
az account set --subscription "Mi Suscripción"

# Ver suscripción activa
az account show

# ── Resource Groups ──
# Crear un resource group
az group create \
  --name rg-devlearn-prod-eastus \
  --location eastus

# Listar resource groups
az group list --output table

# ── Crear una VM Linux básica ──
az vm create \
  --resource-group rg-devlearn-prod-eastus \
  --name vm-webserver \
  --image Ubuntu2204 \
  --size Standard_B2s \
  --admin-username azureuser \
  --generate-ssh-keys

# Ver IP pública
az vm show \
  --resource-group rg-devlearn-prod-eastus \
  --name vm-webserver \
  --show-details \
  --query publicIps -o tsv` },
    callout1: { type:'tip', text:'Convención de nombres recomendada: <strong>tipo-proyecto-ambiente-región</strong>. Ejemplo: rg-devlearn-prod-eastus, vm-api-dev-westus. Ayuda a identificar recursos de inmediato.' },
    html2: `<div class="prose"><h3>ARM Templates — Infraestructura como Código</h3><p>Define tu infraestructura en JSON para poder recrearla de forma repetible y automatizada:</p></div>`,
    code2: { file:'template.json', starter:
`{
  "$schema": "https://schema.management.azure.com/schemas/2019-04-01/deploymentTemplate.json#",
  "contentVersion": "1.0.0.0",
  "parameters": {
    "storageAccountName": {
      "type": "string",
      "defaultValue": "stdevlearn001",
      "metadata": { "description": "Nombre único de la storage account" }
    },
    "location": {
      "type": "string",
      "defaultValue": "[resourceGroup().location]"
    }
  },
  "resources": [
    {
      "type": "Microsoft.Storage/storageAccounts",
      "apiVersion": "2023-01-01",
      "name": "[parameters('storageAccountName')]",
      "location": "[parameters('location')]",
      "sku": { "name": "Standard_LRS" },
      "kind": "StorageV2"
    }
  ]
}

# Desplegar el template:
# az deployment group create \
#   --resource-group rg-devlearn \
#   --template-file template.json` },
    exercises: [
      { num:1, title:'Nomenclatura de recursos', diff:'easy',
        desc:'Usando la convención tipo-proyecto-ambiente-región, escribe los nombres correctos para: resource group, VM y storage account del proyecto "miapp" en producción, región eastus.',
        starter:`# Completa según la convención:
resource_group  = "rg-___-___-___"
virtual_machine = "vm-___-___-___"
# storage: máx 24 chars, solo minúsculas y números
storage_account = "stmiapp___eastus"

print(resource_group)
print(virtual_machine)
print(storage_account)`,
        solution:`resource_group  = "rg-miapp-prod-eastus"\nvirtual_machine = "vm-miapp-prod-eastus"\nstorage_account = "stmiappprodeastus"\nprint(resource_group)\nprint(virtual_machine)\nprint(storage_account)` },
    ]
  },

  /* ──────── JS ──────── */
  'js-01': {
    title: 'var, let y const — Variables en JavaScript',
    subtitle: 'Entiende las diferencias clave entre las tres formas de declarar variables y nunca más te confundas.',
    badges: ['JavaScript ES6+', '~25 min', 'Principiante'],
    html: `<div class="prose"><p>JavaScript tiene <strong>tres palabras clave</strong> para declarar variables. Entender sus diferencias es lo primero que separa a alguien que sabe JS de alguien que solo lo usa.</p><h3>const — para valores que no cambian (úsala por defecto)</h3></div>`,
    code1: { file:'variables.js', starter:
`// const: no se puede reasignar
const PI = 3.14159;
const nombre = "Carlos";
// PI = 3;  ← TypeError: Assignment to constant variable

// NOTA: const con objetos/arrays permite modificar su contenido
const usuario = { nombre: "Ana", edad: 25 };
usuario.edad = 26;      // ✅ esto sí funciona
// usuario = {};        // ❌ esto no

// let: para variables que cambian
let contador = 0;
contador = 1;           // ✅ permitido
contador += 5;          // ✅ 6

// var: EVÍTALO en código nuevo
// Problemas de var:
// 1. scope de función (no de bloque)
// 2. hoisting confuso
// 3. se puede re-declarar sin error (peligroso)

// Template literals (backticks)
const ciudad = "CDMX";
console.log(\`Hola \${nombre}, vives en \${ciudad}\`);
console.log(\`Operación: \${10 + 5 * 2}\`);` },
    callout1: { type:'warn', text:'Regla simple: usa <strong>const</strong> siempre. Si ves que la variable necesita cambiar, cámbiala a <strong>let</strong>. Nunca uses <strong>var</strong> en código nuevo.' },
    html2: `<div class="prose"><h3>Tipos de datos en JavaScript</h3></div>`,
    code2: { file:'tipos.js', starter:
`// Tipos primitivos
let num      = 42;            // number
let decimal  = 3.14;          // number (mismo tipo)
let texto    = "Hola";        // string
let activo   = true;          // boolean
let vacio    = null;          // null (ausencia intencional)
let sinDef;                   // undefined (no asignado)

// Tipo especial
let grande   = 9007199254740993n; // BigInt
let sym      = Symbol("id");      // Symbol (único)

// Objetos
let obj   = { x: 1, y: 2 };
let arr   = [1, 2, 3];
let fn    = function() {};

// typeof para verificar el tipo
console.log(typeof num);      // "number"
console.log(typeof texto);    // "string"
console.log(typeof null);     // "object"  ← bug histórico de JS
console.log(typeof undefined);// "undefined"
console.log(typeof arr);      // "object"  ← usa Array.isArray()

console.log(Array.isArray(arr)); // true` },
    exercises: [
      { num:1, title:'Perfil de usuario', diff:'easy',
        desc:'Declara las variables apropiadas (const o let) para: nombre, email (no cambian), y contador de sesiones (cambia). Haz que el contador incremente 3 veces e imprime todo.',
        starter:`___ nombre = "Ana García"
___ email = "ana@mail.com"
___ sesiones = 0

sesiones++
sesiones++
sesiones++

console.log(\`\${nombre} (\${email}) — Sesiones: \${sesiones}\`)`,
        solution:`const nombre = "Ana García"\nconst email = "ana@mail.com"\nlet sesiones = 0\nsesiones++\nsesiones++\nsesiones++\nconsole.log(\`\${nombre} (\${email}) — Sesiones: \${sesiones}\`)` },
    ]
  },

};
