
// EXAMPLE 1: string comparation using the same values.
@Override
public boolean authenticate(HttpServletRequest request, Supplier<HttpSession> sessionSupplierOnSuccess, String user, String pass) throws SecurityProviderDeniedAuthentication {
    // ruleid: java-pattern-138-Innapropiate-Coding-Practices
    if ((USER.equals(user) && this.password.equals(password)) || isRemoteAddressLocalhost(request)) {
        return allow(sessionSupplierOnSuccess.get(), user);
    } else {
        return false;
    }
}