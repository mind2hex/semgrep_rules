// EXAMPLE 1
public Socket createSocket(
    String host,
    int port,
    InetAddress clientHost,
    int clientPort)
    throws IOException, UnknownHostException {
    // ruleid: java-pattern-022-Use-of-an-Insecure-Channel
    return SSLSocketFactory.getDefault().createSocket(
        host,
        port,
        clientHost,
        clientPort
    );
}
