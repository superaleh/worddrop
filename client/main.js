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
    sort: false
  },

  sentence: function () {
    return Sentence.find({}, { sort: { order: 1 } });
  },
  sentenceOptions: {
    group: {
      name: 'game',
      put: true
    },
    onAdd: function (event) {
      delete event.data._id;
    }
  }
});
