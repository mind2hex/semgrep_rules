# semgrep_rules
Set of rules for vulnerability scanning with semgrep. 

## Naming convention
```
rules/
    {LANGUAGE}-[SEARCH|TAINTED|JOIN|DATAFLOW]-{TECHNIQUE}.yaml
targets/
    {LANGUAGE}-[SEARCH|TAINTED|JOIN|DATAFLOW]-{TECHNIQUE}.{LANG_EXTENSION}
```

## Simple execution
```
# run a specific rule
semgrep scan --config path/to/the/rule/rule.yaml -j 30 --metrics off -v --timeout=15

# run a category
semgrep scan --config path/to/the/rule/injections/command_injection/ -j 30 --metrics off -v --timeout=15
```

# Semgrep Registry General Rulesets
```bash
semgrep --config "p/security-audit"
semgrep --config "p/r2c-security-audit"
semgrep --config "p/sql-injection"
semgrep --config "p/command-injection"
semgrep --config "p/jwt"
semgrep --config "p/secrets"
semgrep --config "p/insecure-transport"
semgrep --config "p/gitleaks"
semgrep --config "p/owasp-top-ten"
semgrep --config "p/misconfigurations"
```

## Javascript/Typescript Specifics
```bash
# rulesets
semgrep --config "p/nodejs" -j 30 --metrics off -v --timeout=15
semgrep --config "p/expressjs" -j 30 --metrics off -v --timeout=15
semgrep --config "p/javascript" -j 30 --metrics off -v --timeout=15
semgrep --config "p/typescript" -j 30 --metrics off -v --timeout=15
```

```yaml
# common pattern-sources
    pattern-sources:
        # Express.js typical
        - pattern: req.body
        - pattern: req.query
        - pattern: req.params
        # Fastify / Koa
        - pattern: request.body
        - pattern: request.query
        - pattern: request.params
        # Generic function args
        - pattern: function $FUNC(...) 
        - patterns:
            - pattern: const $FUNC = function (..., $PARAM, ...) { ... }
            - focus-metavariable: $PARAM
        - patterns:
            - pattern: app.$HTTPMETHOD('...', (..., $SOURCE, ...) => {...})
            - focus-metavariable: $SOURCE
```


## Java Specifics
```bash
# rulesets
semgrep --config "p/java" -j 30 --metrics off -v --timeout=15
semgrep --config "p/mobsfscan" -j 30 --metrics off -v --timeout=15
semgrep --config "p/findsecbugs" -j 30 --metrics off -v --timeout=15

```