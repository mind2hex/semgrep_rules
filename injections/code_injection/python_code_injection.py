## EVAL EXAMPLES
if __name__ == "__main__":
    # EXAMPLE 1
    def run_eval(user_input):
        return eval(user_input)

    # EXAMPLE 2
    eval("testing" + user_input + "asdasd")

    # EXAMPLE 3
    eval(f"this is a test {user_input}")

    # EXAMPLE 4
    eval("This is a test %s"%(user_input))

    # EXAMPLE 5
    eval("this is a test %s".format(user_input))

    # FP
    eval("This is not controllable by user")


## EXEC EXAMPLES
if __name__ == "__main__":
    # EXAMPLE 1
    def run_exec(user_code):
        # VULNERABLE: exec ejecuta código arbitrario
        exec(user_code)

    # EXAMPLE 2
    def run_compile(code_str):
        # VULNERABLE: compile + exec permite ejecución dinámica
        code_obj = compile(code_str, "<string>", "exec")
        exec(code_obj)



## DYNAMIC IMPORT EXAMPLE
import importlib
import importlib as il
from importlib import import_module as im
if __name__ == "__main__":
    # EXAMPLE 1
    def load_and_use(module_name, func_name):
        # VULNERABLE: importar módulo controlado por usuario y llamar función arbitraria
        mod = importlib.import_module(module_name)
        fn = getattr(mod, func_name)
        return fn()
    # EXAMPLE 2
    il.import_module(module_name)

    # EXAMPLE 3
    im(module_name)



import math

def call_by_name(obj, method_name):
    # VULNERABLE si method_name viene del usuario
    method = getattr(obj, method_name)
    print("Hola mundo")
    return method(2)

if __name__ == "__main__":
    print(call_by_name(math, "sqrt"))  # benign: sqrt
