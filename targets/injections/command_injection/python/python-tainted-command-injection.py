# Example 1: Flask basic command injection
import os
from flask import Flask, request

app = Flask(__name__)

@app.route('/ping')
def ping():
    host = request.args.get('host')
    # ruleid: python-tainted-command-injection
    result = os.system(f'ping -c 4 {host}')
    return f'Ping result: {result}'

# Example 2: subprocess.run with shell=True
import subprocess
from flask import Flask, request

@app.route('/backup')
def backup():
    filename = request.form.get('filename')
    # ruleid: python-tainted-command-injection
    subprocess.run(f'tar -czf /backups/{filename}.tar.gz /data/', shell=True)
    return 'Backup created'

# Example 3: subprocess.Popen with user input
import subprocess
from django.http import HttpResponse

def process_file(request):
    file_path = request.GET.get('path')
    options = request.GET.get('options', '')
    # ruleid: python-tainted-command-injection
    proc = subprocess.Popen(f'convert {options} {file_path} output.pdf', 
                           shell=True, stdout=subprocess.PIPE)
    return HttpResponse('Processing...')

# Example 4: os.popen pattern
import os
from flask import Flask, request, jsonify

@app.route('/api/dns')
def dns_lookup():
    domain = request.json['domain']
    # ruleid: python-tainted-command-injection
    stream = os.popen(f'nslookup {domain}')
    output = stream.read()
    return jsonify({'result': output})

# Example 5: FastAPI with command injection
from fastapi import FastAPI, Query
import subprocess

app = FastAPI()

@app.get("/search")
async def search_logs(pattern: str = Query(...)):
    # ruleid: python-tainted-command-injection
    result = subprocess.check_output(f'grep "{pattern}" /var/log/app.log', shell=True)
    return {"matches": result.decode()}

# Example 6: Command injection through environment variables
import os
from flask import Flask, request

@app.route('/execute')
def execute():
    cmd = request.headers.get('X-Command')
    # ruleid: python-tainted-command-injection
    os.system(cmd)
    return 'Executed'

# Example 7: Django CBV with command injection
import subprocess
from django.views import View
from django.http import JsonResponse

class FileProcessorView(View):
    def post(self, request):
        input_file = request.POST.get('input')
        output_format = request.POST.get('format')
        # ruleid: python-tainted-command-injection
        subprocess.call(f'ffmpeg -i {input_file} -f {output_format} output.{output_format}', 
                       shell=True)
        return JsonResponse({'status': 'processing'})

# Example 8: Tornado handler with command injection
import tornado.web
import os

class CommandHandler(tornado.web.RequestHandler):
    def get(self):
        action = self.get_argument('action')
        target = self.get_argument('target')
        # ruleid: python-tainted-command-injection
        os.system(f'/usr/bin/admin-tool {action} --target {target}')
        self.write({'status': 'executed'})

# Example 9: Pyramid view with command injection
from pyramid.view import view_config
import subprocess

@view_config(route_name='analyze', renderer='json')
def analyze_file(request):
    filepath = request.params.get('file')
    # ruleid: python-tainted-command-injection
    result = subprocess.getoutput(f'file {filepath}')
    return {'analysis': result}

# Example 10: asyncio subprocess with command injection
import asyncio
from aiohttp import web

async def run_command(request):
    cmd = request.match_info['command']
    args = await request.json()
    # ruleid: python-tainted-command-injection
    proc = await asyncio.create_subprocess_shell(
        f'{cmd} {args["params"]}',
        stdout=asyncio.subprocess.PIPE
    )
    stdout, _ = await proc.communicate()
    return web.Response(text=stdout.decode())

# Example 11: Click CLI with command injection
import click
import os

@click.command()
@click.option('--target', prompt='Target system')
def scan(target):
    # ruleid: python-tainted-command-injection
    os.system(f'nmap {target}')

# Example 12: Command injection via f-strings with multiple inputs
from flask import Flask, request
import subprocess

@app.route('/compress')
def compress():
    src = request.args.get('source')
    level = request.args.get('level', '5')
    # ruleid: python-tainted-command-injection
    subprocess.run(f'gzip -{level} {src}', shell=True, check=True)
    return 'Compressed'

# Example 13: WebSocket handler with command injection
import asyncio
import websockets
import subprocess
import json

async def handle_message(websocket, path):
    async for message in websocket:
        data = json.loads(message)
        if data['type'] == 'execute':
            # ruleid: python-tainted-command-injection
            result = subprocess.run(data['command'], shell=True, capture_output=True)
            await websocket.send(json.dumps({'output': result.stdout.decode()}))

# Example 14: Bottle framework with command injection
from bottle import route, request, run
import os

@route('/process/<filename>')
def process_file(filename):
    options = request.query.options or ''
    # ruleid: python-tainted-command-injection
    os.system(f'imagemagick {options} /uploads/{filename}')
    return f'Processed {filename}'

# Example 15: Command injection through destructured dict
from flask import Flask, request
import subprocess

@app.route('/deploy')
def deploy():
    data = request.get_json()
    server = data['server']
    branch = data.get('branch', 'main')
    # ruleid: python-tainted-command-injection
    subprocess.Popen(f'ssh {server} "cd /app && git checkout {branch}"', shell=True)
    return 'Deployment started'

# Example 16: GraphQL resolver with command injection
import graphene
import subprocess

class Query(graphene.ObjectType):
    system_info = graphene.String(command=graphene.String())
    
    def resolve_system_info(self, info, command):
        # ruleid: python-tainted-command-injection
        output = subprocess.check_output(command, shell=True, text=True)
        return output

# Example 17: Celery task with command injection
from celery import Celery
import os

app = Celery('tasks')

@app.task
def process_video(video_path, codec):
    # ruleid: python-tainted-command-injection
    os.system(f'ffmpeg -i {video_path} -codec {codec} output.mp4')
    return 'Processed'

# Example 18: Command injection with pathlib
from pathlib import Path
import subprocess
from flask import request

@app.route('/read')
def read_file():
    filepath = request.args.get('file')
    # ruleid: python-tainted-command-injection
    content = subprocess.getoutput(f'cat {Path(filepath)}')
    return content


# Example 20: Quart async framework with command injection
from quart import Quart, request
import asyncio

app = Quart(__name__)

@app.route('/execute', methods=['POST'])
async def execute_command():
    data = await request.get_json()
    cmd = data.get('command')
    # ruleid: python-tainted-command-injection
    proc = await asyncio.create_subprocess_shell(
        cmd,
        stdout=asyncio.subprocess.PIPE,
        stderr=asyncio.subprocess.PIPE
    )
    stdout, stderr = await proc.communicate()
    return {'output': stdout.decode(), 'error': stderr.decode()}