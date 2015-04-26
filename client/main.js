Template.body.events({
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
    }
    // get new sentence value, insert it and its words into database
    var sentence = e.target.text.value;
    var sentenceId = Sentences.insert({text:sentence, active:true});
    var wordsFromSentence = sentence.split(" ");
    var wordsFromSentenceShuffled = _.shuffle(wordsFromSentence)
    _.each(wordsFromSentenceShuffled, function (word) {
      Words.insert({name:word,sentenceId:sentenceId});
    });
    //clear input field
    e.target.text.value = "";
  }
});

Template.words.helpers({
  words: function () {
    return Words.find({}, { sort: { order: 1 } });
  },
  wordsOptions: {
    group: {
      name: 'game',
      pull: true,
      put: false
    },
    sort: false,
    onRemove: function (event) {
      Words.remove(event.data._id);
    }
  },
  wordsCount: function () {
    return Words.find().fetch().length !== 0;
  },
  inboxWords: function () {
    return Inbox.find({}, { sort: { order: 1 } });
  },
  inboxOptions: {
    group: {
      name: 'game',
      put: true
    }
  },
  currentStatus : function () {
    if (Sentences.findOne({active:true})) {
      var array = Inbox.find({}, {sort: {order: 1}}).fetch();
      var onlyText = _.pluck(array, 'name');
      var text = onlyText.join(" ");
      var currentSentence = Sentences.findOne({active: true}).text;
      if (text === currentSentence) {
        return "<span style='color:green'>Ты большой молодец! :) </span>"
      } else if (Words.find().fetch().length !== 0) {
        return "Добавьте все слова";
      } else {
        return "<span style='color:rgb(177, 65, 65)'>Нужно изменить прорядок слов</span>";
      }
    } else {
      return false;
    }
  }
});
