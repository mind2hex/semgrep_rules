// eval
function foo(userInput){
  // Example 1: Direct eval with user input
  // ruleid: javascript-tainted-000-Code-Injection
  eval(userInput);

  // Example 2: eval with template literals
  // ruleid: javascript-tainted-000-Code-Injection
  eval(`asdsad + ${userInput}`);

  // FP EXAMPLE 1: parseInt()
  const safeNumber = parseInt(userInput, 10);
  // ok: javascript-tainted-000-Code-Injection
  eval(`result = ${safeNumber} + 10`);

  // FP EXAMPLE 2: JSON.stringify()
  // ok: javascript-tainted-000-Code-Injection
  eval(`var data = ${JSON.stringify(userInput)}`);

  // FP EXAMPLE 3: Number
  // ok: javascript-tainted-000-Code-Injection
  const num = Number(userInput);
  if (!isNaN(num)) {
      eval(`result = ${num} * 2`);
  }

  // FP EXAMPLE 4: encodeURIComponent
  // ok: javascript-tainted-000-Code-Injection
  eval(`var encoded = "${encodeURIComponent(userInput)}"`);

  // FP EXAMPLE 5: eval with boolean conversion
  // ok: javascript-tainted-000-Code-Injection
  const boolVal = Boolean(userInput);
  eval(`flag = ${boolVal}`);   
}
