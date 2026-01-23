@RestController
@RequiredArgsConstructor
public class StorageController {
    @PostMapping(
            path = "/upload/file",
            consumes = MediaType.MULTIPART_FORM_DATA_VALUE, produces = MediaType.APPLICATION_JSON_VALUE
    )
    public Mono<ResponseEntity<Object>> upload(@RequestPart("file") Mono<FilePart> filePartMono,
                                               @RequestParam(value = "key", required = false) String key) {
        return filePartMono.flatMap(part -> {
                    var tempFile = FileHelper.getTempFile(part.filename());
                    // ruleid: java-taint-029-inadequate-file-size-control
                    return part.transferTo(tempFile).then(
                        // do something else
                    );
                })
    }
}