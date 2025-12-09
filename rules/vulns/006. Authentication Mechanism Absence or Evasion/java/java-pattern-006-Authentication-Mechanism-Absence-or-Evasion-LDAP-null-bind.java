@Override
public Pair<Boolean, ActionOnFailedAuthentication> authenticate(final String username, final String password, final Long domainId, final Map<String, Object[]> requestParameters) {

    final UserAccount user = _userAccountDao.getUserAccount(username, domainId);

    if (user == null) {
        s_logger.debug("Unable to find user with " + username + " in domain " + domainId);
        return new Pair<Boolean, ActionOnFailedAuthentication>(false, null);
    } else if (_ldapManager.isLdapEnabled()) {
        // ruleid: java-pattern-006-Authentication-Mechanism-Absence-or-Evasion-LDAP-null-bind
        boolean result = _ldapManager.canAuthenticate(username, password);
        ActionOnFailedAuthentication action = null;
        if (result == false) {
            action = ActionOnFailedAuthentication.INCREMENT_INCORRECT_LOGIN_ATTEMPT_COUNT;
        }
        return new Pair<Boolean, ActionOnFailedAuthentication>(result, action);

    } else {
        return new Pair<Boolean, ActionOnFailedAuthentication>(false, ActionOnFailedAuthentication.INCREMENT_INCORRECT_LOGIN_ATTEMPT_COUNT);
    }
}
