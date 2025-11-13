# Example 1: Basic eval() with user input
from flask import Flask, request

app = Flask(__name__)

@app.route('/calculate')
def calculate():
    expression = request.args.get('expr')
    # ruleid: python-tainted-code-injection
    result = eval(expression)
    return f"Result: {result}"

# Example 2: exec() with user-provided code
from flask import Flask, request

@app.route('/execute')
def execute_code():
    code = request.form.get('code')
    # ruleid: python-tainted-code-injection
    exec(code)
    return "Code executed"

# Example 3: eval() in Django view
from django.http import JsonResponse

def math_api(request):
    formula = request.GET.get('formula')
    try:
        # ruleid: python-tainted-code-injection
        result = eval(formula, {"__builtins__": {}})
        return JsonResponse({'result': result})
    except:
        return JsonResponse({'error': 'Invalid formula'})

# Example 4: exec() with globals/locals manipulation
from flask import request
import math

@app.route('/compute')
def compute():
    user_code = request.json.get('code')
    safe_dict = {'math': math, 'abs': abs}
    # ruleid: python-tainted-code-injection
    exec(user_code, safe_dict)
    return str(safe_dict.get('result', 'No result'))

# Example 5: compile() and exec() pattern
from fastapi import FastAPI, Body

app = FastAPI()

@app.post("/run")
async def run_code(code: str = Body(...)):
    # ruleid: python-tainted-code-injection
    compiled = compile(code, '<string>', 'exec')
    # ruleid: python-tainted-code-injection
    exec(compiled)
    return {"status": "executed"}

# Example 6: __import__() with user input
from flask import Flask, request

@app.route('/load-module')
def load_module():
    module_name = request.args.get('module')
    # ruleid: python-tainted-code-injection
    mod = __import__(module_name)
    return f"Loaded: {mod.__name__}"

# Example 7: Template injection leading to code execution
from jinja2 import Template
from flask import request

@app.route('/render')
def render_template():
    template_string = request.args.get('template')
    # ruleid: python-tainted-code-injection
    template = Template(template_string)
    return template.render()

# Example 8: Pickle deserialization (code execution via object)
import pickle
from flask import request

@app.route('/load-data', methods=['POST'])
def load_data():
    data = request.get_data()
    # ruleid: python-tainted-code-injection
    obj = pickle.loads(data)
    return f"Loaded object: {type(obj)}"

# Example 9: yaml.load() unsafe deserialization
import yaml
from django.views import View
from django.http import HttpResponse

class ConfigView(View):
    def post(self, request):
        config_data = request.body
        # ruleid: python-tainted-code-injection
        config = yaml.load(config_data)
        return HttpResponse("Config loaded")

# Example 10: eval() in lambda function
from flask import request

@app.route('/filter')
def filter_data():
    condition = request.args.get('condition')
    data = [1, 2, 3, 4, 5]
    # ruleid: python-tainted-code-injection
    filtered = list(filter(lambda x: eval(condition), data))
    return str(filtered)

# Example 11: exec() in async context
from aiohttp import web

async def execute_async(request):
    code = await request.text()
    local_vars = {}
    # ruleid: python-tainted-code-injection
    exec(code, {}, local_vars)
    return web.json_response(local_vars)

# Example 12: eval() with string formatting
from tornado.web import RequestHandler

class EvalHandler(RequestHandler):
    def get(self):
        expr = self.get_argument('expr')
        # ruleid: python-tainted-code-injection
        result = eval(f"2 * ({expr})")
        self.write({'result': result})

# Example 13: Code injection through decorators
from flask import request

def dynamic_decorator(func):
    def wrapper(*args, **kwargs):
        code = request.headers.get('X-Transform')
        if code:
            # ruleid: python-tainted-code-injection
            exec(code, globals())
        return func(*args, **kwargs)
    return wrapper

# Example 14: marshal.loads() code execution
import marshal
from flask import request

@app.route('/unmarshal', methods=['POST'])
def unmarshal_data():
    data = request.get_data()
    # ruleid: python-tainted-code-injection
    code = marshal.loads(data)
    # ruleid: python-tainted-code-injection
    exec(code)
    return "Executed"

# Example 15: Code injection in Celery task
from celery import Celery

celery_app = Celery()

@celery_app.task
def execute_formula(formula, variables):
    # ruleid: python-tainted-code-injection
    result = eval(formula, {"__builtins__": {}, **variables})
    return result

# Example 16: pandas eval() injection
import pandas as pd
from flask import request

@app.route('/dataframe-query')
def query_dataframe():
    df = pd.DataFrame({'A': [1, 2, 3], 'B': [4, 5, 6]})
    query = request.args.get('query')
    # ruleid: python-tainted-code-injection
    result = df.eval(query)
    return result.to_json()

# Example 17: Code injection via globals() manipulation
from pyramid.view import view_config

@view_config(route_name='update_globals')
def update_globals(request):
    var_name = request.params.get('name')
    var_value = request.params.get('value')
    # ruleid: python-tainted-code-injection
    globals()[var_name] = eval(var_value)
    return {'status': 'updated'}

# Example 18: RestrictedPython bypass attempt
from RestrictedPython import compile_restricted
from flask import request

@app.route('/restricted')
def restricted_exec():
    code = request.form.get('code')
    byte_code = compile_restricted(code, '<string>', 'exec')
    # ruleid: python-tainted-code-injection
    exec(byte_code)
    return "Executed"

# Example 19: timeit with user code
import timeit
from flask import request

@app.route('/benchmark')
def benchmark():
    code_snippet = request.args.get('code')
    setup_code = request.args.get('setup', '')
    # ruleid: python-tainted-code-injection
    time = timeit.timeit(code_snippet, setup=setup_code, number=1000)
    return f"Execution time: {time}"

# Example 20: GraphQL with dynamic field resolution
import graphene

class DynamicQuery(graphene.ObjectType):
    calculate = graphene.String(expression=graphene.String())
    
    def resolve_calculate(self, info, expression):
        # ruleid: python-tainted-code-injection
        return str(eval(expression))

# Example 21: Code injection through importlib
import importlib
from flask import request

@app.route('/dynamic-import')
def dynamic_import():
    module_path = request.args.get('module')
    func_name = request.args.get('function')
    # ruleid: python-tainted-code-injection
    module = importlib.import_module(module_path)
    # ruleid: python-tainted-code-injection
    func = getattr(module, func_name)
    return func()

# Example 22: eval() in list comprehension
from django.http import HttpResponse

def process_list(request):
    condition = request.GET.get('filter')
    data = range(10)
    # ruleid: python-tainted-code-injection
    filtered = [x for x in data if eval(condition.replace('x', str(x)))]
    return HttpResponse(str(filtered))

# Example 23: Code injection via type() and metaclasses
from flask import request

@app.route('/create-class')
def create_class():
    class_name = request.args.get('name')
    base_code = request.args.get('code')
    # ruleid: python-tainted-code-injection
    NewClass = type(class_name, (), {'method': eval(f'lambda self: {base_code}')})
    instance = NewClass()
    return str(instance.method())

# Example 24: shelve module with user keys
import shelve
from flask import request

@app.route('/store')
def store_data():
    key = request.args.get('key')
    code = request.args.get('value')
    with shelve.open('data.db') as db:
        # ruleid: python-tainted-code-injection
        db[key] = eval(code)
    return "Stored"

# Example 25: Code injection in WebSocket handler
import json
import asyncio
import websockets

async def handle_message(websocket, path):
    async for message in websocket:
        data = json.loads(message)
        if data['action'] == 'eval':
            # ruleid: python-tainted-code-injection
            result = eval(data['expression'])
            await websocket.send(json.dumps({'result': str(result)}))