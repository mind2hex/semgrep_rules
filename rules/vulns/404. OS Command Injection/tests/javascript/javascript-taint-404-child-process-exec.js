app.post('/ping', (req, res) => {
    const { exec } = require('child_process');
    const user_input = req.body.input;
    // ruleid: javascript-taint-404-child-process-exec
    exec(`ping -c 4 ${user_input}`, (error, stdout, stderr) => {
        res.send(stdout);
    });

    // ruleid: javascript-taint-404-child-process-exec
    require("child_process").exec(`${user_input}`);

    const cp = require("child_process")
    // ruleid: javascript-taint-404-child-process-exec
    cp.exec(user_input)

    import * as cp from "child_process"
    // ruleid: javascript-taint-404-child-process-exec
    cp.exec(user_input)

    // ruleid: javascript-taint-404-child-process-exec
    global.require("child_process").exec(user_input)

    // ruleid: javascript-taint-404-child-process-exec
    module.require("child_process").exec(user_input)

    // ruleid: javascript-taint-404-child-process-exec
    require("child_process")["exec"](user_input)

    // ruleid: javascript-taint-404-child-process-exec
    cp["exec"](user_input)

    // ruleid: javascript-taint-404-child-process-exec
    child_process["exec"](user_input)
});
