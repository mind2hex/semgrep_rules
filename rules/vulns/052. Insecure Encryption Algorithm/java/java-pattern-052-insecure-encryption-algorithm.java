// EXAMPLE 1:
public static String getMd5(String input) {
    try {
        // ruleid: java-pattern-052-insecure-encryption-algorithm
        MessageDigest md = MessageDigest.getInstance("MD5");
        byte[] messageDigest = md.digest(input.getBytes());
        BigInteger no = new BigInteger(1, messageDigest);
        String hashtext = no.toString(16);

        /// SNIP
    }
    catch (NoSuchAlgorithmException e) {
        // EMPTY
    }
}