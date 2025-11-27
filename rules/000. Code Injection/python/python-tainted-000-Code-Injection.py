# EXAMPLE 1: direct eval
def handler():
    # Fuente controlada por el usuario
    expr = request.args.get("expr")

    # ❌ CODE INJECTION: la expresión es evaluada como código Python
    # POC: ?expr=__import__('os').listdir('/')
    # ruleid: python-tainted-000-Code-Injection
    result = eval(expr)

    return str(result)

# EXAMPLE 2: direct exec
def handler():
    code = request.args.get("code")

    # ❌ CODE INJECTION: se ejecuta código Python arbitrario
    # POC: ?code=import os; print(os.popen("id").read())
    # ruleid: python-tainted-000-Code-Injection
    exec(code)

    return "ok"

# EXAMPLE 3: direct compile
def handler():
    src = request.args.get("src")

    # ❌ CODE INJECTION: compila y ejecuta código controlado
    # ruleid: python-tainted-000-Code-Injection
    bytecode = compile(src, "<string>", "exec")
    
    # ...
    return "ok"

# EXAMPLE 4: asteval
def handler():
    code = request.args.get("code")

    aeval = Interpreter()

    # ❌ CODE INJECTION: lenguaje de expresiones controlado
    # ruleid: python-tainted-000-Code-Injection
    result = aeval(code)

    return str(result)

# EXAMPLE 5: py_mini_racer
def handler():
    js = request.args.get("js")

    ctx = py_mini_racer.MiniRacer()

    # ❌ CODE INJECTION: ejecuta JavaScript controlado
    # ruleid: python-tainted-000-Code-Injection
    result = ctx.eval(js)

    return str(result)

# EXAMPLE 6: dynamic load 
def handler():
    path = request.args.get("path")   # ej: /tmp/evil.py

    # ruleid: python-tainted-000-Code-Injection
    spec = importlib.util.spec_from_file_location("evil", path)
    return "ok"
