# semgrep_rules
Set of rules for vulnerability scanning with semgrep. 

## Rules Organization Structure
Rules are stored using [Fluid Attacks](https://db.fluidattacks.com/vul/) tipologies.
```
rules/
    000. Vulnerability Name/
        LANGUAGE/
            python-000-Vulnerability-Name.yaml  # SEMGREP RULE
            python-000-Vulnerability-Name.py    # TESTING CODE FOR THE ABOVE SEMGREP RULE

```

## Simple execution
```bash
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

## C# Specifics

```yaml
    # common pattern-sources for csharp
    pattern-sources:
      # 1. Function/Method Parameters
      - pattern-either:
        - patterns:
          - pattern: $RETURNTYPE $FUNC(..., $SOURCE, ...) {...}
          - focus-metavariable: $SOURCE
        - patterns:
          - pattern: public $RETURNTYPE $FUNC(..., $SOURCE, ...) {...}
          - focus-metavariable: $SOURCE
        - patterns:
          - pattern: private $RETURNTYPE $FUNC(..., $SOURCE, ...) {...}
          - focus-metavariable: $SOURCE
        - patterns:
          - pattern: protected $RETURNTYPE $FUNC(..., $SOURCE, ...) {...}
          - focus-metavariable: $SOURCE
        - patterns:
          - pattern: internal $RETURNTYPE $FUNC(..., $SOURCE, ...) {...}
          - focus-metavariable: $SOURCE

      # 2. ASP.NET Request Objects
      - pattern-either:
        - pattern: Request.QueryString[$SOURCE]
        - pattern: Request.QueryString.Get($SOURCE)
        - pattern: Request.Form[$SOURCE]
        - pattern: Request.Form.Get($SOURCE)
        - pattern: Request.Params[$SOURCE]
        - pattern: Request[$SOURCE]
        - pattern: Request.Headers[$SOURCE]
        - pattern: Request.Cookies[$SOURCE]
        - pattern: Request.ServerVariables[$SOURCE]
        - pattern: Request.UserHostAddress
        - pattern: Request.UserAgent
        - pattern: Request.UrlReferrer
        - pattern: Request.RawUrl
        - pattern: Request.Path
        - pattern: Request.PathInfo
        - pattern: Request.Url.Query
        - pattern: Request.HttpMethod

      # 3. ASP.NET Core HttpContext
      - pattern-either:
        - pattern: HttpContext.Request.Query[$SOURCE]
        - pattern: HttpContext.Request.Form[$SOURCE]
        - pattern: HttpContext.Request.Headers[$SOURCE]
        - pattern: HttpContext.Request.Cookies[$SOURCE]
        - pattern: HttpContext.Request.RouteValues[$SOURCE]
        - pattern: HttpContext.Request.Path
        - pattern: HttpContext.Request.PathBase
        - pattern: HttpContext.Request.QueryString
        - pattern: HttpContext.Request.Body
        - pattern: HttpContext.Connection.RemoteIpAddress

```