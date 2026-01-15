// example 1
@PostMapping("request")
@ResponseStatus(HttpStatus.OK)
public Mono<RestResponse> foo(@Valid @RequestBody RestRequest requestBody, Authentication authentication) {
    // authentication
    // ruleid: java-tainted-log-injection
    log.info("logging requestBody: {}", requestBody);
    return bar;
}


public FooResponse foo(FooObject foo, FooObject bar) {
    // modification to avoid false positives
    // ok: java-tainted-log-injection
    log.info("logging requestBody: {}", foo);
}