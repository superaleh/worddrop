Router.configure({
  layoutTemplate: 'layout',
  waitOn: function () {
    return [Meteor.subscribe('onlineUsers'),Meteor.subscribe('words'),Meteor.subscribe('inbox'),
      Meteor.subscribe('sentences')];
  }
});

Router.route('/', {
  name: 'playground'
});
Router.route('/signIn', {
  name: 'signForm'
});
