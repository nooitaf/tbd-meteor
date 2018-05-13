SimpleRest.configure({
  collections: ['submissions']
});




// API
// var Api = new Restivus({
//   auth: {
//     token: 'auth.apiKey',
//     user: function () {
//       return {
//         userId: this.request.headers['user-id'],
//         token: this.request.headers['login-token']
//       };
//     }
//   },
//   defaultHeaders: {
//     'Content-Type': 'application/json'
//   },
//   onLoggedIn: function () {
//     console.log(this.user.username + ' (' + this.userId + ') logged in');
//   },
//   onLoggedOut: function () {
//     console.log(this.user.username + ' (' + this.userId + ') logged out');
//   },
//   prettyJson: true,
//   useDefaultAuth: true,
//   apiPath: 'api'
// });
// Api.addCollection(Submissions);

// Api.addCollection(Meteor.users, {
//   excludedEndpoints: ['getAll', 'put'],
//   routeOptions: {
//     authRequired: true
//   },
//   endpoints: {
//     post: {
//       authRequired: false
//     },
//     delete: {
//       roleRequired: 'admin'
//     }
//   }
// });
