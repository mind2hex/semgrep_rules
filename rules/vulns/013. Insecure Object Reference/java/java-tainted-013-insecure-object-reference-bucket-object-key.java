@Slf4j
@RequiredArgsConstructor
public class StorageUseCase {
    public Mono<FileDTO> getFileBucket(String key) {        
        final var getObjectRequest = GetObjectRequest.builder()
                .bucket(storageProperty.getBucket())
                // ruleid: java-tainted-013-insecure-object-reference-bucket-object-key
                .key(key)
                .build();
    }
}