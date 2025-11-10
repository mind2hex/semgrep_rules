// EXAMPLE 1: simple log injection
function foo(arg){
    // ruleid: javascript-tainted-log-injection
    log.debug("asdas", arg);
}

// EXAMPLE 2: express controller
app.get('/greet', (req, res) => {
  const name = req.query.name;
  // ruleid: javascript-tainted-log-injection
  logger.log("User requested greet for: " + name);
  res.send("ok");
});

app.post('/login', express.json(), (req, res) => {
  const user = req.body.username; 
  // ruleid: javascript-tainted-log-injection
  logger.info("Login attempt for user: " + user);
  res.sendStatus(200);
});

// FP EXAMPLE 1: log of a constant
// EXAMPLE 1: simple log injection
function foo(arg){
    // ok: javascript-tainted-log-injection
    log.debug("asdas");
}