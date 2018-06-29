Router.configure({
    layoutTemplate: 'layout_default',
    loadingTemplate: 'loading',
    yieldTemplates: {
        'navbar': {
            to: 'top'
        },
        'footer': {
            to: 'footer'
        }
    },
    waitOn: function() {
        return [
          Meteor.subscribe('userData'),
          Meteor.subscribe('people'),
          Meteor.subscribe('meta'),
          Meteor.subscribe('orders'),
          Meteor.subscribe('projection'),
          Meteor.subscribe('submissions'),
          Meteor.subscribe('tracks'),
          // Meteor.subscribe('status')
        ];
    },
    onAfterAction: function() {}
});

Router.map(function() {
    this.route('admin_meta', {
        path: '/admin/meta',
        template: 'admin_meta',
        layoutTemplate: 'layout_default'
    });

});

Router.map(function() {
    this.route('admin_tracks', {
        path: '/admin/tracks',
        template: 'admin_tracks',
        layoutTemplate: 'layout_default'
    });
});

Router.map(function() {
    this.route('admin_preds', {
        path: '/admin/preds',
        template: 'admin_preds',
        layoutTemplate: 'layout_default'
    });
});

Router.map(function() {
    this.route('admin_subs', {
        path: '/admin/subs',
        template: 'admin_subs',
        layoutTemplate: 'layout_default'
    });
});

Router.map(function() {
    this.route('admin_users', {
        path: '/admin/users',
        template: 'admin_users',
        layoutTemplate: 'layout_default'
    });
});

Router.map(function() {
    this.route('home', {
        path: '/',
        template: 'home',
        layoutTemplate: 'layout_default'
    });

});

Router.map(function() {
    this.route('faq', {
        path: '/faq',
        template: 'faq',
        layoutTemplate: 'layout_default'
    });
});

Router.map(function() {
    this.route('cfp', {
        path: '/cfp',
        template: 'cfp',
        layoutTemplate: 'layout_default'
    });
});

Router.map(function() {
    this.route('submissions', {
        path: '/submissions',
        template: 'submissions',
        layoutTemplate: 'layout_default'
    });
});

Router.map(function() {
    this.route('api', {
        path: '/api',
        template: 'api',
        layoutTemplate: 'layout_default'
    });
});

Router.map(function() {
    this.route('search', {
        path: '/search',
        template: 'search',
        layoutTemplate: 'layout_default'
    });
});

Router.map(function() {
    this.route('day1', {
        path: '/day1',
        template: 'day1',
        layoutTemplate: 'layout_default'
    });
});
Router.map(function() {
    this.route('day2', {
        path: '/day2',
        template: 'day2',
        layoutTemplate: 'layout_default'
    });
});
Router.map(function() {
    this.route('day3', {
        path: '/day3',
        template: 'day3',
        layoutTemplate: 'layout_default'
    });
});

Router.map(function() {
    this.route('reset-pw', {
        path: '/reset-pw/:token',
        template: 'passwordResetDialog',
        layoutTemplate: 'layout_default',
        onBeforeAction: function(){
          if (this.params.token) {
            Accounts._loginButtonsSession.set('resetPasswordToken', this.params.token)
          } else {
            Router.go('/')
          }
          this.next()
        }
    });

});
