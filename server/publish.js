Meteor.publish("onlineUsers", function() {
  return Meteor.users.find({ "status.online": true });
});
Meteor.publish("sentences", function() {
  return Sentences.find({active:true});
});
Meteor.publish("words", function() {
  var id = this.userId;
  return Words.find();
});
Meteor.publish("inbox", function() {
  var id = this.userId;
  return Inbox.find();
});