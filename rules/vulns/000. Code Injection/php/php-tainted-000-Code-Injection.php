<?php

// EXAMPLE 1 DIRECT EVAL
function handler_eval() {
    // Fuente controlada por el usuario
    $code = $_GET['code'] ?? '';

    // ❌ CODE INJECTION: eval ejecuta código PHP arbitrario
    // ruleid: php-tainted-000-code-injection
    eval($code);
}

// EXAMPLE 2: ASSERT
function handler_assert() {
    $expr = $_GET['expr'] ?? '1 == 1';

    // ❌ CODE INJECTION: en PHP antiguos, assert(string) evalúa el string
    // ruleid: php-tainted-000-code-injection
    assert($expr);
}

// EXAMPLE 3: 
function handler_preg_replace_e() {
    $name = $_GET['name'] ?? 'world';

    $pattern = '/NAME/e';
    $replacement = $name; // controlado por usuario

    $text = 'Hello NAME';

    // http://victim.test/?name=phpinfo%28%29
    // ❌ CODE INJECTION: replacement se evalúa como código PHP
    // ruleid: php-tainted-000-code-injection
    $result = preg_replace($pattern, $replacement, $text);

    echo $result;
}

// EXAMPLE 4: create_function
function handler_create_function($foo) {
    $body = $foo;

    // ❌ CODE INJECTION: el cuerpo de la función es código PHP desde la entrada
    // ruleid: php-tainted-000-code-injection
    $fn = create_function('$x', $body);

    echo $fn(2);
}

// EXAMPLE 5: runkit7
// http://victim.test/?body=echo%20%22PWNED%5Cn%22%3B
function handler_runkit() {

    $body = $_GET['body'] ?? 'echo "Hello\n";';

    // ❌ CODE INJECTION: se define una función con código controlado
    // ruleid: php-tainted-000-code-injection
    runkit7_function_add('dynamicFunc', '', $body);
}

// EXAMPLE 6: expression engine
// http://victim.test/?expr=user.age%20%3E%3D%2018
function handler_expression_language() {
    $expr = $_GET['expr'] ?? 'user.age >= 18';

    $language = new ExpressionLanguage();

    $context = [
        'user' => (object) ['age' => 15],
    ];

    // ❌ CODE INJECTION LÓGICA: el usuario controla la expresión a evaluar
    // ruleid: php-tainted-000-code-injection
    $result = $language->evaluate($expr, $context);

    var_dump($result);
}
?>