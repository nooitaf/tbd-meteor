Accounts.emailTemplates.siteName = 'tbd';
Accounts.emailTemplates.from = 'tbd enrollment <noreply@tbd.camp>';
Accounts.emailTemplates.enrollAccount.subject = (user) => {
  return `welcome to tbd, ${user}`;
};
Accounts.emailTemplates.enrollAccount.text = (user, url) => {
  return ' To activate your account, simply click the link below:\n\n' + url;
};
Accounts.emailTemplates.resetPassword.from = () => {
  // Overrides the value set in `Accounts.emailTemplates.from` when resetting
  // passwords.
  return 'tbd passwd reset <noreply@tbd.camp>';
};
Accounts.emailTemplates.verifyEmail = {
   subject() {
      return "Activate your account now!";
   },
   text(user, url) {
      return `Hey ${user}! Verify your e-mail by following this link: ${url}`;
   }
};
Accounts.urls.resetPassword = (token) => {
  return Meteor.absoluteUrl(`reset-pw/${token}`);
};
