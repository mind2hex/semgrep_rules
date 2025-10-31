// example 1
@PostMapping("request")
@Operation(description = "Do something", requestBody = @io.swagger.v3.oas.annotations.parameters.RequestBody())
@ResponseStatus(HttpStatus.OK)
public Mono<RestResponse> sendRequest(@Valid @RequestBody RestRequest requestBody, Authentication authentication) {
    // authentication
    // ...
    log.info("sendRequest requestBody: {}", requestBody);
    return useCase.process(requestBody).subscribeOn(Schedulers.boundedElastic());
}