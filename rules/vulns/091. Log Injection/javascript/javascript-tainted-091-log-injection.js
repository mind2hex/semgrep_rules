// EXAMPLE 0: pino logger
const log = require("pino")();
const refresh = async (req, res) => {
    // ruleid: javascript-tainted-091-log-injection
    const logger = log.child({
        user: req.name,
    });

    // ruleid: javascript-tainted-091-log-injection
    logger.info({ entrada: req.body }, "refresh");
}

// EXAMPLE 1: simple log injection
function foo(arg){
    // ruleid: javascript-tainted-091-log-injection
    log.debug("asdas", arg);
}

// EXAMPLE 2: express controller
app.get('/greet', (req, res) => {
  const name = req.query.name;
  // ruleid: javascript-tainted-091-log-injection
  logger.log("User requested greet for: " + name);
  res.send("ok");
});

app.post('/login', express.json(), (req, res) => {
  const user = req.body.username; 
  // ruleid: javascript-tainted-091-log-injection
  logger.info("Login attempt for user: " + user);
  res.sendStatus(200);
});

// FP EXAMPLE 1: log of a constant
function foo(arg){
    // ok: javascript-tainted-091-log-injection
    log.debug("asdas");

    // todook: javascript-tainted-091-log-injection
    const response = await login(arg);
}