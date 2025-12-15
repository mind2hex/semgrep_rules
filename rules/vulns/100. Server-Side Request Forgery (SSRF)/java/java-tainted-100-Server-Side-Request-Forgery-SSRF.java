// EXAMPLE 1:
@Override
protected void doExecute(@Nonnull final ProfileRequestContext profileRequestContext) {
    // ruleid: java-tainted-100-server-side-request-forgery-ssrf
    final HttpGet httpRequest = new HttpGet(getAuthenticationRequest().getRequestURI());
    // rest of code 
}

// EXAMPLE 2:
private String getContent(String path) throws MalformedURLException, IOException {
    // ruleid: java-tainted-100-server-side-request-forgery-ssrf
    Resource resource = new UrlResource(path);
    Charset charset = Charset.forName("UTF-8");
    // ruleid: java-tainted-100-server-side-request-forgery-ssrf
    return resource.getContentAsString(charset);
}