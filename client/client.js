
import { Session } from 'meteor/session'

Accounts.ui.config({
  // Which fields to display in the user creation form. One of 'USERNAME_AND_EMAIL', 'USERNAME_AND_OPTIONAL_EMAIL', 'USERNAME_ONLY', or 'EMAIL_ONLY' (default).
  passwordSignupFields: 'USERNAME_AND_EMAIL'
});
