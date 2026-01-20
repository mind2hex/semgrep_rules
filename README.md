# semgrep_rules
Set of custom rules for vulnerability scanning with semgrep. 

## Rules Organization Structure
Rules are stored using [Fluid Attacks](https://db.fluidattacks.com/vul/) typologies.
```
rules/
    vulns/
        000. Typology/
            language/
                language-mode-000-typology.yaml   # SEMGREP RULE
                language-mode-000-typology.ext    # TESTING CODE

# example
rules/
    vulns/
        404. OS Command Injection/
            python/
                python-404-OS-Command-Injection.yaml
                python-404-OS-Command-Injection.py

```

## Simple execution
```bash
# run a specific rule
semgrep scan --config path/to/the/rule/rule.yaml -j 30 --metrics off -v --timeout=15

# run a category
semgrep scan --config path/to/the/rule/injections/command_injection/ -j 30 --metrics off -v --timeout=15
```

## Semgrep Registry General Rulesets
If the rules listed in this repo doesn't find anything useful, you can try the rules from the community.

### General Sec Rules
```bash
semgrep --config "p/owasp-top-ten"
semgrep --config "p/security-audit"
semgrep --config "p/r2c-security-audit"
semgrep --config "p/sql-injection"
semgrep --config "p/command-injection"
semgrep --config "p/jwt"
semgrep --config "p/secrets"
semgrep --config "p/insecure-transport"
semgrep --config "p/gitleaks"
```

### Javascript/Typescript Specific Rules
```bash # rulesets
semgrep --config "p/nodejs" -j 30 --metrics off -v --timeout=15
semgrep --config "p/expressjs" -j 30 --metrics off -v --timeout=15
semgrep --config "p/javascript" -j 30 --metrics off -v --timeout=15
semgrep --config "p/typescript" -j 30 --metrics off -v --timeout=15
```


### Java Specific rules
```bash # rulesets
semgrep --config "p/java" -j 30 --metrics off -v --timeout=15
semgrep --config "p/mobsfscan" -j 30 --metrics off -v --timeout=15
semgrep --config "p/findsecbugs" -j 30 --metrics off -v --timeout=15
```

### C# Specific Rules
```bash # rulesets
semgrep --config "p/csharp" -j 30 --metrics off -v --timeout=15
semgrep --config "p/secrets" -j 30 --metrics off -v --timeout=15
```

## Common Source Patterns
If you want to create your own patterns, you can use the following pattern sources.
### Javascript/Typescript Source Patterns
```yaml
    pattern-sources:
      - pattern: req.body
      - pattern: req.query
      - pattern: req.params
      - pattern: request.body
      - pattern: request.query
      - pattern: request.params
      - patterns: 
        - pattern: function $FUNC(..., $SINK, ...)
        - focus-metavariable: $SINK
      - patterns:
          - pattern: const $FUNC = function (..., $PARAM, ...) { ... }
          - focus-metavariable: $PARAM
      - patterns:
          - pattern: app.$HTTPMETHOD('...', (..., $SOURCE, ...) => {...})
          - focus-metavariable: $SOURCE
      - patterns:
          - pattern: module.exports = async function $FUNC(..., $SOURCE, ...){...};
          - focus-metavariable: $SOURCE

```