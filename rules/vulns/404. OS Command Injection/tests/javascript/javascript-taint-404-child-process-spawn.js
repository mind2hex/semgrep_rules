
const { spawn } = require('child_process');
app.get('/list', (req, res) => {
    const directory = req.query.dir;
    // ruleid: javascript-tainted-404-os-command-injection
    const ls = spawn('ls', ['-la', directory], { shell: true });
    ls.stdout.on('data', (data) => {
        res.write(data);
    });
});

