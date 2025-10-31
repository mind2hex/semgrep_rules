// ====== EVAL Y VARIANTES ======

  // Ejemplo 1: eval() directo con input del usuario
  function vulnerableEval1(userInput) {
    // VULNERABLE: Evaluación directa de código
    const result = eval(userInput);
    return result;
}

// Ejemplo 2: eval() con construcción de código
function vulnerableEval2(operation, value1, value2) {
    // VULNERABLE: Construcción dinámica de expresiones
    const code = `${value1} ${operation} ${value2}`;
    return eval(code);
}

// Ejemplo 3: eval() en contexto de objeto
function vulnerableEval3(obj, property, value) {
    // VULNERABLE: Asignación dinámica de propiedades
    eval(`obj.${property} = ${value}`);
}

// ====== FUNCTION CONSTRUCTOR ======

// Ejemplo 4: Function constructor básico
function vulnerableFunction1(code) {
    // VULNERABLE: Creación dinámica de funciones
    const fn = new Function(code);
    return fn();
}

// Ejemplo 5: Function con parámetros dinámicos
function vulnerableFunction2(params, body) {
    // VULNERABLE: Parámetros y cuerpo controlados por usuario
    const fn = new Function(...params.split(','), body);
    return fn;
}

// Ejemplo 6: Function constructor con return
function vulnerableFunction3(expression) {
    // VULNERABLE: Expresión de retorno dinámica
    const fn = new Function('x', 'y', `return ${expression}`);
    return fn;
}

// ====== SETTIMEOUT/SETINTERVAL (STRING FORM) ======

// Ejemplo 7: setInterval con string
function vulnerableInterval(code, interval) {
    // VULNERABLE: Código ejecutado periódicamente
    const id = setInterval(code, interval);
    return id;
}

// Ejemplo 8: setImmediate (Node.js)
function vulnerableImmediate(code) {
    // VULNERABLE: Ejecución inmediata de código
    if (typeof setImmediate !== 'undefined') {
        setImmediate(code);
    }
}

// ====== SCRIPT INJECTION EN EL DOM ======

// Ejemplo 9: innerHTML con scripts
function vulnerableInnerHTML(htmlContent) {
  // VULNERABLE: Permite inyección de scripts
  document.getElementById('content').innerHTML = htmlContent;
}

// Ejemplo 10: document.write
function vulnerableDocWrite(content) {
  // VULNERABLE: Escritura directa al documento
  document.write(content);
}

// Ejemplo 11: insertAdjacentHTML
function vulnerableInsertHTML(position, html) {
  // VULNERABLE: Inserción de HTML arbitrario
  document.body.insertAdjacentHTML(position, html);
}

// Ejemplo 12: createElement con innerHTML
function vulnerableCreateElement(tagName, content) {
  // VULNERABLE: Creación de elementos con contenido dinámico
  const elem = document.createElement(tagName);
  elem.innerHTML = content;
  document.body.appendChild(elem);
}

// ====== EVENT HANDLERS DINÁMICOS ======

// Ejemplo 13: setAttribute con event handlers
function vulnerableSetAttribute(element, eventName, code) {
  // VULNERABLE: Event handlers como strings
  element.setAttribute('on' + eventName, code);
}

// Ejemplo 14: Asignación directa de event handlers
function vulnerableEventHandler(elementId, event, handler) {
  // VULNERABLE: Handler como string evaluable
  const elem = document.getElementById(elementId);
  elem['on' + event] = new Function(handler);
}

// Ejemplo 15: addEventListener con Function constructor
function vulnerableAddEventListener(element, event, code) {
  // VULNERABLE: Listener creado dinámicamente
  element.addEventListener(event, new Function('event', code));
}

// ====== URL Y LOCATION ======

// Ejemplo 16: javascript: URLs
function vulnerableJavaScriptURL(code) {
  // VULNERABLE: Protocolo javascript: ejecuta código
  window.location = 'javascript:' + code;
}

// Ejemplo 17: javascript: en href
function vulnerableHref(linkId, code) {
  // VULNERABLE: Links con código ejecutable
  document.getElementById(linkId).href = 'javascript:' + code;
}

// ====== JQUERY Y LIBRERÍAS ======

// Ejemplo 18: jQuery html() method
function vulnerableJQuery1(selector, content) {
  // VULNERABLE: jQuery permite scripts en html()
  $(selector).html(content);
}

// Ejemplo 19: jQuery append con HTML
function vulnerableJQuery2(htmlString) {
  // VULNERABLE: Append de HTML arbitrario
  $('body').append(htmlString);
}

// Ejemplo 20: jQuery globalEval
function vulnerableJQuery3(code) {
  // VULNERABLE: Evaluación global de código
  $.globalEval(code);
}

// ====== TEMPLATE ENGINES VULNERABLES ======

// Ejemplo 21: Template literal dinámico
function vulnerableTemplate1(template, data) {
  // VULNERABLE: Template construido dinámicamente
  return eval('`' + template + '`');
}

// Ejemplo 22: Lodash template sin escape
function vulnerableLodashTemplate(templateStr, data) {
  // VULNERABLE: Template compilation con interpolación
  const compiled = _.template(templateStr);
  return compiled(data);
}

// ====== DYNAMIC IMPORTS ======

// Ejemplo 23: import() dinámico
async function vulnerableDynamicImport(modulePath) {
  // VULNERABLE: Import de módulos arbitrarios
  const module = await import(modulePath);
  return module;
}

// Ejemplo 24: require() dinámico (Node.js)
function vulnerableRequire(moduleName) {
  // VULNERABLE: Carga de módulos arbitrarios
  if (typeof require !== 'undefined') {
      return require(moduleName);
  }
}

// ====== JSON Y SERIALIZACIÓN ======

// Ejemplo 25: JSON.parse con reviver malicioso
function vulnerableJSONParse(jsonStr, reviverCode) {
  // VULNERABLE: Reviver function dinámica
  const reviver = new Function('key', 'value', reviverCode);
  return JSON.parse(jsonStr, reviver);
}

// Ejemplo 26: JSONP callback injection
function vulnerableJSONP(callbackName, data) {
  // VULNERABLE: Callback name controlado por usuario
  const script = document.createElement('script');
  script.textContent = `${callbackName}(${JSON.stringify(data)})`;
  document.head.appendChild(script);
}

// ====== WEB WORKERS ======

// Ejemplo 27: Worker con blob URL
function vulnerableWorker1(workerCode) {
  // VULNERABLE: Código de worker arbitrario
  const blob = new Blob([workerCode], { type: 'application/javascript' });
  const worker = new Worker(URL.createObjectURL(blob));
  return worker;
}

// Ejemplo 28: SharedWorker vulnerable
function vulnerableSharedWorker(code) {
  // VULNERABLE: SharedWorker con código dinámico
  const blob = new Blob([code], { type: 'application/javascript' });
  const worker = new SharedWorker(URL.createObjectURL(blob));
  return worker;
}

// ====== REGEX VULNERABLES ======

// Ejemplo 29: RegExp constructor con flags dinámicos
function vulnerableRegExp(pattern, flags, testString) {
  // VULNERABLE: Pattern injection puede causar ReDoS o code execution
  const regex = new RegExp(pattern, flags);
  return testString.replace(regex, eval);
}

// ====== WEBASSEMBLY ======

// Ejemplo 30: WebAssembly.instantiate con imports maliciosos
async function vulnerableWASM(wasmCode, importObject) {
  // VULNERABLE: Import object con funciones arbitrarias
  const module = await WebAssembly.instantiate(wasmCode, eval(`(${importObject})`));
  return module;
}

// ====== PROXY Y REFLECT ======

// Ejemplo 31: Proxy handler dinámico
function vulnerableProxy(target, handlerCode) {
  // VULNERABLE: Handler creado dinámicamente
  const handler = eval(`(${handlerCode})`);
  return new Proxy(target, handler);
}

// Ejemplo 32: Reflect con operaciones dinámicas
function vulnerableReflect(operation, target, ...args) {
  // VULNERABLE: Operación Reflect dinámica
  return eval(`Reflect.${operation}(target, ...args)`);
}

// ====== WITH STATEMENT ======

// Ejemplo 33: with statement (aunque deprecated)
function vulnerableWith(obj, code) {
  // VULNERABLE: with permite modificar scope
  eval(`with(obj) { ${code} }`);
}

// ====== SPREAD OPERATOR ABUSE ======

// Ejemplo 34: Spread con eval
function vulnerableSpread(arrayStr) {
  // VULNERABLE: Spread de array evaluado
  return eval(`[...${arrayStr}]`);
}

// ====== GENERATOR FUNCTIONS ======

// Ejemplo 35: GeneratorFunction constructor
function vulnerableGenerator(code) {
  // VULNERABLE: Generador con código arbitrario
  const GeneratorFunction = Object.getPrototypeOf(function* () {}).constructor;
  const gen = new GeneratorFunction(code);
  return gen();
}

// ====== ASYNC FUNCTIONS ======

// Ejemplo 36: AsyncFunction constructor
function vulnerableAsync(code) {
  // VULNERABLE: Función asíncrona dinámica
  const AsyncFunction = Object.getPrototypeOf(async function() {}).constructor;
  const fn = new AsyncFunction(code);
  return fn();
}

// ====== SYMBOL INJECTION ======

// Ejemplo 37: Symbol con descripción ejecutable
function vulnerableSymbol(desc) {
  // VULNERABLE: Si se usa en contextos donde se evalúa
  const sym = Symbol(desc);
  eval(`obj[${sym.toString()}] = maliciousValue`);
}

// ====== IFRAME SRCDOC ======

// Ejemplo 38: iframe srcdoc injection
function vulnerableIframe(htmlContent) {
  // VULNERABLE: Contenido HTML arbitrario en iframe
  const iframe = document.createElement('iframe');
  iframe.srcdoc = htmlContent;
  document.body.appendChild(iframe);
}

// ====== DATA URLS ======

// Ejemplo 39: data: URLs con JavaScript
function vulnerableDataURL(code) {
  // VULNERABLE: Data URL con código ejecutable
  const script = document.createElement('script');
  script.src = 'data:text/javascript,' + encodeURIComponent(code);
  document.head.appendChild(script);
}

// ====== MUTATION OBSERVERS ======

// Ejemplo 40: MutationObserver con callback dinámico
function vulnerableMutationObserver(callbackCode) {
  // VULNERABLE: Callback creado dinámicamente
  const callback = new Function('mutations', 'observer', callbackCode);
  const observer = new MutationObserver(callback);
  observer.observe(document.body, { childList: true });
  return observer;
}