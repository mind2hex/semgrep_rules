# EXAMPLE 1 https://pentesterlab.com/exercises/cve-2024-419xx
from django.shortcuts import (
    redirect,
    render,
)
def login_view(request):
    """Login Controller."""
    if settings.DISABLE_AUTHENTICATION == '1':
        return redirect('/')
    sso = (settings.IDP_METADATA_URL
           or (settings.IDP_SSO_URL
               and settings.IDP_ENTITY_ID
               and settings.IDP_X509CERT))
    if not sso:
        allow_pwd = True
    elif bool(settings.SP_ALLOW_PASSWORD == '1'):
        allow_pwd = True
    else:
        allow_pwd = False
    nextp = request.GET.get('next', '')
    redirect_url = nextp if nextp.startswith('/') else '/'
    if request.user.is_authenticated:
        # ruleid: python-tainted-156-uncontrolled-external-site-redirect
        return redirect(redirect_url)

    # ...
    return render(request, 'auth/login.html', context)