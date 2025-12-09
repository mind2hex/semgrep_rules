/** {@inheritDoc} */
@Override
protected void doExecute(@Nonnull final ProfileRequestContext profileRequestContext) {
    // ruleid: java-tainted-100-Server-Side-Request-Forgery-SSRF
    final HttpGet httpRequest = new HttpGet(getAuthenticationRequest().getRequestURI());
    // rest of code 
}