// EXAMPLE 1   
protected KrbIdentity doGetIdentity(String principalName) throws KrbException {
    KrbIdentity krbIdentity = new KrbIdentity(principalName);
    String searchFilter =
        // ruleid: java-tainted-107-LDAP-Injection
        String.format("(&(objectclass=krb5principal)(krb5PrincipalName=%s))", principalName);
    try {
        EntryCursor cursor = new FailoverInvocationHandler<EntryCursor>() {
            @Override
            public EntryCursor execute() throws LdapException {
                return connection.search(getConfig().getString("base_dn"), searchFilter,
                    SearchScope.SUBTREE, "dn");
            }
        }.run();
    } catch (LdapException e) {}

    return krbIdentity;
}


// EXAMPLE 2
protected String getDistinguishedName(LdapContext ctx, String userName, String searchBase, String userACLsUsername)
throws ManifoldCFException
{
    String returnedAtts[] = {"distinguishedName"};
    // ruleid: java-tainted-107-LDAP-Injection
    String searchFilter = "(&(objectClass=user)(" + userACLsUsername + "=" + userName + "))";
    SearchControls searchCtls = new SearchControls();
    searchCtls.setReturningAttributes(returnedAtts);
    //Specify the search scope  
    searchCtls.setSearchScope(SearchControls.SUBTREE_SCOPE);
    searchCtls.setReturningAttributes(returnedAtts);

    try
    {
        NamingEnumeration answer = ctx.search(searchBase, searchFilter, searchCtls);
        // rest of the code
    } catch (NamingException e) {}
}