// example 1
function setConfig(userInput) {
    // userInput viene del usuario, por ejemplo: { "__proto__": { isAdmin: true } }
    const cfg = {};
    for (const k in userInput) {
      cfg[k] = userInput[k]; // si k es "__proto__", contamina el prototipo
    }
    return cfg;
  }
  
  
  // example 2
  app.post("/update", (req, res) => {
    const defaults = { role: "user", active: true };
    // req.body = usuario controla esto
    const cfg = Object.assign(defaults, req.body);
    res.send(cfg);
  });
  
  
  // example 3
  const _ = require('lodash');
  
  function mergeSettings(userSettings) {
    const defaultSettings = { ui: { theme: 'light' }, perms: { admin: false } };
    // lodash.merge hace deep merge: userSettings puede incluir "__proto__"
    const settings = _.merge(defaultSettings, userSettings);
    return settings;
  }
  
  
  // example 4
  // vulnerable-4.js
  function applyOptions(target, options) {
    Object.keys(options).forEach(function(key) {
      target[key] = options[key]; // si key == "__proto__", contamina
    });
  }
  
  
  // example 5
  // vulnerable-5.js
  app.post('/config', (req, res) => {
    const body = JSON.parse(req.rawBody); // o req.body si raw
    // merge manual
    const cfg = deepMerge(defaultCfg, body); // deepMerge implementado por la app
    res.json(cfg);
  });
  
  // example 6
  function buildOptions(src) {
    return Object.keys(src).reduce((acc, k) => {
      acc[k] = src[k];
      return acc;
    }, {});
  }
  
  // example 7
  const set = require('lodash.set');
  // user provides path = "__proto__.isAdmin"
  set({}, req.body.path, req.body.value);
  