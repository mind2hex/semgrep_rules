from urllib.parse import urlunparse

class AskResetPassword(BaseHandler):
    @PROM_REQUESTS.async_('reset_password')
    async def post(self):
        if not self.application.config['MULTIUSER']:
            raise HTTPError(404)
        email = self.get_body_argument('email')
        user = (
            self.db.query(database.User)
            .filter(database.User.email == email)
            .filter(database.User.disabled == False)  # noqa: E712
        ).one_or_none()
        if user is None:
            return await self.render(
                'reset_password.html',
                error=self.gettext("This email address is not associated with "
                                   "any user"),
            )
        elif (
            user.email_sent is None
            or user.email_sent + timedelta(days=1) < datetime.utcnow()
        ):
            # Generate a signed token
            reset_token = '%s|%s|%s' % (
                int(time.time()),
                user.login,
                user.email,
            )
            reset_token = self.create_signed_value('reset_token', reset_token)
            reset_token = reset_token.decode('utf-8')

            # Reset link
            path = self.request.path
            if path.endswith('/reset_password'):
                path = path[:-15]
            path = path + '/new_password'
            # ruleid: python-tainted-193-lack-of-data-validation-host-header-injection
            reset_link = urlunparse(['https',
                                     self.request.host,
                                     path,
                                     '',
                                     'reset_token=' + reset_token,
                                     ''])

            # SNIP...
        return await self.render('reset_password.html', message="Email sent!")