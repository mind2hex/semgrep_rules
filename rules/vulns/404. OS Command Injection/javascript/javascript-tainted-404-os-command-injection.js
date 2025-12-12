// Example 1: Direct command injection via exec
const { exec } = require('child_process');
app.post('/ping', (req, res) => {
    const host = req.body.host;
    // ruleid: javascript-tainted-404-os-command-injection
    exec(`ping -c 4 ${host}`, (error, stdout, stderr) => {
        res.send(stdout);
    });
});

// Example 2: Command injection through spawn with shell:true
const { spawn } = require('child_process');
app.get('/list', (req, res) => {
    const directory = req.query.dir;
    // ruleid: javascript-tainted-404-os-command-injection
    const ls = spawn('ls', ['-la', directory], { shell: true });
    ls.stdout.on('data', (data) => {
        res.write(data);
    });
});

// Example 3: execSync with concatenated user input
const { execSync } = require('child_process');
function processFile(userFilename) {
    const output = 
    // ruleid: javascript-tainted-404-os-command-injection
    execSync('cat /logs/' + userFilename);
    return output.toString();
}

// Example 4: execFile with shell option enabled
const { execFile } = require('child_process');
const getUserLogs = async (request, reply) => {
    const username = request.params.username;
    // ruleid: javascript-tainted-404-os-command-injection
    execFile('grep', [username, '/var/log/access.log'], { shell: true }, (err, stdout) => {
        reply.send(stdout);
    });
};

// Example 5: Command injection via template literals
const { exec } = require('child_process');
router.post('/convert', (req, res) => {
    const format = req.body.format;
    const filename = req.body.file;
    // ruleid: javascript-tainted-404-os-command-injection
    exec(`convert input.jpg -format ${format} ${filename}`, (err, stdout) => {
        res.json({ success: true });
    });
});

// Example 6: Indirect injection through variable assignment
const { spawn } = require('child_process');
function runDiagnostics(req, res) {
    const diagnosticCommand = req.headers['x-diagnostic-cmd'];
    const fullCommand = `/usr/bin/diagnose ${diagnosticCommand}`;
    // ruleid: javascript-tainted-404-os-command-injection
    spawn(fullCommand, { shell: true });
}

// Example 7: Command injection in async/await pattern
const util = require('util');
const exec = util.promisify(require('child_process').exec);
app.get('/dns/:domain', async (req, res) => {
    const domain = req.params.domain;
    try {
        // ruleid: javascript-tainted-404-os-command-injection
        const { stdout } = await exec(`nslookup ${domain}`);
        res.send(stdout);
    } catch (error) {
        res.status(500).send(error.message);
    }
});

// Example 8: Fork with user-controlled module path
const { fork } = require('child_process');
app.post('/run-worker', (req, res) => {
    const workerPath = req.body.worker;
    // ruleid: javascript-tainted-404-os-command-injection
    const worker = fork(workerPath);
    worker.on('message', (msg) => {
        res.json(msg);
    });
});

// Example 9: Multiple command concatenation
const { exec } = require('child_process');
function backupUserData(request) {
    const userId = request.query.id;
    const backupPath = request.query.path;
    const command = `tar -czf backup.tar.gz /users/${userId} && mv backup.tar.gz ${backupPath}`;
    // ruleid: javascript-tainted-404-os-command-injection
    exec(command, (error) => {
        console.log('Backup completed');
    });
}

// Example 10: Command injection through environment variables
const { spawn } = require('child_process');
exports.handler = (event, context) => {
    const userEnv = event.headers.environment;
    // ruleid: javascript-tainted-404-os-command-injection
    const process = spawn('node', ['script.js'], {
        env: { ...process.env, USER_SETTING: userEnv },
        shell: true
    });
};

// Example 11: Nested function with tainted flow
const cp = require('child_process');
function executeCommand(cmd) {
    // ruleid: javascript-tainted-404-os-command-injection
    return cp.execSync(cmd);
}
app.post('/execute', (req, res) => {
    const userCommand = req.body.command;
    const result = executeCommand(userCommand);
    res.send(result);
});

// Example 12: Express middleware pattern
const { exec } = require('child_process');
const commandRunner = (req, res, next) => {
    if (req.body.systemCommand) {
        // ruleid: javascript-tainted-404-os-command-injection
        exec(req.body.systemCommand, (err, stdout) => {
            req.commandOutput = stdout;
            next();
        });
    } else {
        next();
    }
};

// Example 13: Class method with command injection
const { spawn } = require('child_process');
class SystemUtil {
    runCommand(userInput) {
        // ruleid: javascript-tainted-404-os-command-injection
        return spawn('bash', ['-c', userInput], { stdio: 'pipe' });
    }
}

// Example 14: Promise-based command execution
const { exec } = require('child_process');
const runShellCommand = (command) => {
    return new Promise((resolve, reject) => {
        // ruleid: javascript-tainted-404-os-command-injection
        exec(command, (error, stdout, stderr) => {
            if (error) reject(error);
            else resolve(stdout);
        });
    });
};
app.get('/shell', async (req, res) => {
    const result = await runShellCommand(req.query.cmd);
    res.send(result);
});

// Example 15: Array join command construction
const { execSync } = require('child_process');
function buildAndExecute(req) {
    const args = [
        'git',
        'clone',
        req.body.repository,
        req.body.destination
    ];
    const command = args.join(' ');
    // ruleid: javascript-tainted-404-os-command-injection
    execSync(command);
}

// Example 16: Fastify handler with command injection
const { exec } = require('child_process');
const searchLogs = async function (request, reply) {
    const searchTerm = request.query.search;
    const logFile = request.query.file;
    // ruleid: javascript-tainted-404-os-command-injection
    exec(`grep "${searchTerm}" /var/log/${logFile}`, (err, stdout) => {
        return reply.send({ results: stdout });
    });
};

// Example 17: Command injection through destructured parameters
const cp = require('child_process');
app.post('/process', ({ body: { filename, options } }, res) => {
    // ruleid: javascript-tainted-404-os-command-injection
    cp.exec(`processor --file ${filename} ${options}`, (err, data) => {
        res.json({ processed: true });
    });
});

// Example 18: Koa.js context pattern
const { spawn } = require('child_process');
router.post('/analyze', async (ctx) => {
    const fileToAnalyze = ctx.request.body.file;
    // ruleid: javascript-tainted-404-os-command-injection
    const analyzer = spawn(`/usr/bin/analyze ${fileToAnalyze}`, { shell: true });
    ctx.body = { status: 'analyzing' };
});

// Example 19: WebSocket message handler
const { exec } = require('child_process');
ws.on('message', function(message) {
    const data = JSON.parse(message);
    if (data.type === 'command') {
        // ruleid: javascript-tainted-404-os-command-injection
        exec(data.payload, (error, stdout) => {
            ws.send(JSON.stringify({ result: stdout }));
        });
    }
});

// Example 20: GraphQL resolver with command injection
const { execFile } = require('child_process');
const resolvers = {
    Query: {
        systemInfo: (_, { command }) => {
            return new Promise((resolve, reject) => {
                // ruleid: javascript-tainted-404-os-command-injection
                execFile('sh', ['-c', command], (error, stdout) => {
                    if (error) reject(error);
                    resolve(stdout);
                });
            });
        }
    }
};