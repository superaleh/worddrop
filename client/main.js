Template.start.onRendered(function () {
  var el = document.getElementById('words');
  var sortable = Sortable.create(el,{ group: "one" });
  var el = document.getElementById('sentence');
  var sortable = Sortable.create(el,{ group: "one",
  // Element is dropped into the list from another list
    onAdd: function (evt) {
        var itemEl = evt.item;  // dragged HTMLElement
        var id = $(itemEl).data('id');
        console.log($(itemEl).data('id'), evt.newIndex);
        Words.update(id,{$set:{position:evt.newIndex}}); 
    } 
  });
});
Template.start.helpers({
   words: function () {
    return Words.find({position: false});
   },
   sentence: function (){
    return Words.find({position: {$ne:false}});
   }
});

//outside