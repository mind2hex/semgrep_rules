rules:
  - id: java-pattern-034-Insecure-Generation-of-Random-Numbers
    languages:
      - java
    message: >
      The system uses insecure functions, insufficient ranges or low-entropy
      components to generate random numbers. This could allow an attacker to
      guess the generation sequence after a short time or predict results using
      probabilistic methods.
    severity: MEDIUM
    pattern-either:
      - patterns:
        - pattern-either:
          - pattern-inside: |
              import org.apache.commons.lang3.RandomStringUtils;
              ...
          - pattern: |
              RandomStringUtils.random(..., $SECRETSTR, ...)
        
        # Random() usage inside cryptographic functions
        - patterns:
          - pattern-inside: |
              $RETTYPE $SECRETSTR(...){...}
          - pattern: |
              int $FOO = $RAND.nextInt(...);
          
          - metavariable-regex:
              metavariable: $SECRETSTR
              regex: .*(?i)(key|secret|token|pass|api).*

          
      
    metadata:
      category: security
      subcategory:
        - vuln
      cwe:
        - "CWE-338: Use of Cryptographically Weak Pseudo-Random Number Generator
          (PRNG)"
      confidence: MEDIUM
      likelihood: MEDIUM
      impact: LOW
      owasp:
        - A2:2021 Cryptographic Failures
