const { execSync } = require('child_process');
function processFile(userFilename) {
    const output = 
    // ruleid: javascript-tainted-404-os-command-injection
    execSync('cat /logs/' + userFilename);
    return output.toString();
}
