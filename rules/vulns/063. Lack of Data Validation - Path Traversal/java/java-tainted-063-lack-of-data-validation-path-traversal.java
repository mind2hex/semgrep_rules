// EXAMPLE 1:
import java.nio.file.Files;
class FileStorageService {    
        @Override
        public void save(MultipartFile file) {
            try {
                // ruleid: java-tainted-063-lack-of-data-validation-path-traversal
                Files.copy(file.getInputStream(), this.root.resolve(file.getOriginalFilename()));
            } catch (Exception e) {
                if (e instanceof FileAlreadyExistsException) {
                    throw new RuntimeException("A file of that name already exists.");
                }

                throw new RuntimeException(e.getMessage());
            }
        }
}