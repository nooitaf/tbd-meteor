// for convenience
var loginButtonsSession = Accounts._loginButtonsSession;

// since we don't want to pass around the callback that we get from our event
// handlers, we just make it a variable for the whole file
var doneCallback;

Template.passwordResetDialog.events({
  'click #login-buttons-reset-password-button': function () {
    resetPassword();
  },
  'keypress #reset-password-new-password': function (event) {
    if (event.keyCode === 13)
      resetPassword();
  },
  'click #login-buttons-cancel-reset-password': function () {
    loginButtonsSession.set('resetPasswordToken', null);
    if (doneCallback)
      doneCallback();
  }
});

var resetPassword = function () {
  loginButtonsSession.resetMessages();
  var newPassword = document.getElementById('reset-password-new-password').value;
  if (!validatePassword(newPassword))
    return;

  Accounts.resetPassword(
    loginButtonsSession.get('resetPasswordToken'), newPassword,
    function (error) {
      if (error) {
        loginButtonsSession.errorMessage(error.reason || "Unknown error");
      } else {
        loginButtonsSession.set('resetPasswordToken', null);
        loginButtonsSession.set('justResetPassword', true);
        if (doneCallback)
          doneCallback();
      }
    }
  );
};

validatePassword = function (password) {
  if (password.length >= 6) {
    return true;
  } else {
    loginButtonsSession.errorMessage("Password must be at least 6 characters long");
    return false;
  }
};
