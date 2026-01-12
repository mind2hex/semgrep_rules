// EXAMPLE 1
public Socket createSocket(
    String host,
    int port,
    InetAddress clientHost,
    int clientPort)
    throws IOException, UnknownHostException {
    // ruleid: java-pattern-022-use-of-an-insecure-channel
    return SSLSocketFactory.getDefault().createSocket(
        host,
        port,
        clientHost,
        clientPort
    );
}
