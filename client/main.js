Template.playground.events({
  'submit .new-sentence': function (e) {
    e.preventDefault();
    // deactivate previous sentence and delete previous words
    if (Sentences.findOne({active:true})) {
      var previousSentenceId = Sentences.findOne({active: true})._id;
      var previousWords = Words.find({sentenceId: previousSentenceId}).fetch();
      _.each(previousWords, function (word) {
        Words.remove(word._id);
      });
      var previousInbox = Inbox.find({sentenceId: previousSentenceId}).fetch();
      _.each(previousInbox, function (word) {
        Inbox.remove(word._id);
      });
      Sentences.update(previousSentenceId, {$set: {active: false}});
      console.log('previous are cleared');
    }
    // get new sentence value, insert it and its words into database
    var sentence = e.target.text.value;
    var sentenceId = Sentences.insert({text:sentence, active:true});
    var wordsFromSentence = sentence.split(" ");
    var users = Meteor.users.find().fetch();
    var userIds = _.pluck(users, '_id');
    console.log("ids: "+userIds);
    var wordsFromSentenceShuffled = _.shuffle(wordsFromSentence);
    _.each(userIds, function (userId) {
      _.each(wordsFromSentenceShuffled, function (word) {
        Words.insert({name:word,sentenceId:sentenceId,userId:userId});
      });
    });
    //clear input field
    e.target.text.value = "";
  }
});

Template.playground.helpers({
  'users': function () {
    return Meteor.users.find({ "status.online": true });
  },
  'username': function () {
    var user = Meteor.users.findOne(Meteor.userId());
    return user.username || user.profile.name;
  }
});

Template.playerWindow.helpers({
  'thisIsMine': function () {
    return this._id === Meteor.userId()
  },
  'username': function () {
    var user = Meteor.users.findOne(this._id);
    return user.username || user.profile.name;
  },
  words: function () {
    return Words.find({userId:this._id}, { sort: { order: 1 } });
  },
  wordsOptions: function () {
    return {
      group: {
        name: "user "+this._id,
        pull: true,
        put: false
      },
      sort: false,
      onRemove: function (event) {
        Words.remove(event.data._id);
      }
    }
  },
  inboxWords: function () {
    return Inbox.find({userId:this._id}, { sort: { order: 1 } });
  },
  inboxOptions: function () {
    return {
      group: {
        name: "user "+this._id,
        put: true
      }
    }
  },
  currentStatus : function () {
    if (Sentences.findOne({active:true})) {
      var array = Inbox.find({userId:this._id}, {sort: {order: 1}}).fetch();
      var onlyText = _.pluck(array, 'name');
      var text = onlyText.join(" ");
      var currentSentence = Sentences.findOne({active: true}).text;
      if (text === currentSentence) {
        return "<span style='color:green'>Готово! :) </span>"
      } else if (Words.find({userId:this._id}).fetch().length !== 0) {
        return "Нужно добавить все слова";
      } else {
        return "<span style='color:rgb(177, 65, 65)'>Неправильный порядок слов :(</span>";
      }
    } else {
      return false;
    }
  }
});

Template.header.events({
  'click #logout': function () {
    AccountsTemplates.logout();
  }
});


Template.header.helpers({
  'username': function () {
    var user = Meteor.users.findOne(Meteor.userId());
    return user.username || user.profile.name;
  },
  'user': function () {
    return Meteor.users.findOne(Meteor.userId());
  }
});