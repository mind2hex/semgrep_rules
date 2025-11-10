
// EXAMPLE 1: STORING JWTTOKEN
private void foo(type1 var1, type2 var2, type3 var3) {
    // ruleid: java-sensitive-information-stored-in-logs
    log.info("sensitive inf: jwtTokenValue {}", jwtTokenValue);
}


// FP EXAMPLE 1: NO SENSITIVE INFO
public RETURNTYPE foo(@Valid @RequestBody RestRequest requestBody, Authentication authentication) {
    // ok: java-sensitive-information-stored-in-logs
    log.info("logging requestBody: {}", requestBody);
    return bar;
}