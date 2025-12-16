# EXAMPLE 1
import zlib

class DeflateZipAlgorithm(JWEZipAlgorithm):
    name = "DEF"
    description = "DEFLATE"

    def decompress(self, s):
        """Decompress DEFLATE bytes data."""
        # ruleid: python-tainted-002-asymmetric-denial-of-service-zipbomb
        return zlib.decompress(s, -zlib.MAX_WBITS)