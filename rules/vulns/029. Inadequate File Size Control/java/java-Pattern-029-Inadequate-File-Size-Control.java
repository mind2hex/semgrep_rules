// EXAMPLE 1
    @PostMapping(path = "/upload/v2")
    public Mono<ResponseEntity<Object>> upload(@RequestPart("file") Mono<FilePart> filePartMono,
                                               @RequestParam(value = "foo", required = false) String foo) {
        return filePartMono.flatMap(multipart -> {
                    var temp = FileHelper.gettemp(multipart.filename());
                    return multipart.transferTo(temp).then(multipart.delete())
                            .then(uploadUseCase.upload(new FileUploadRequest(multipart.filename(), foo), temp))
                            .doFinally(signalType -> FileHelper.delete(temp));
                })
    } 