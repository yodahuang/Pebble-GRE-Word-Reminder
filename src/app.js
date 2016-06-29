var UI = require('ui');
var Vector2 = require('vector2');
var ajax = require('ajax');

var CACHE_SIZE = 3;

var cachedWords = [];

var wordCard = new UI.Card({
  title: 'New Word',
  icon: 'images/menu_icon.png',
  body: 'Now loading...'
});

wordCard.show();

displayNewWord();

function getNewWords(){
  cachedWords = getMockData(CACHE_SIZE);
}

wordCard.on('click', 'selection', function(e){
  var defCard = new UI.Card({
  title: 'Definition',
  body: ''//The definition get from ajax call
  });
  defCard.show();
});

wordCard.on('click', 'up', displayNewWord);
wordCard.on('click', 'down', displayNewWord);

function displayNewWord(){
  if (!cachedWords.length){
    getNewWords();
  }
  wordCard.body = cachedWords[cachedWords.length-1];
  cachedWords.pop();
}

function getMockData(size){
  var wordList = ['varnish', 'invidious', 'adjourn', 'abstruse', 'scant', 'travail', 'fraudulent'];
  //Will improve later
  var edge = parseInt(Math.random()*(wordList.length-size));
  return wordList.slice(edge, edge+size);
}

/*
main.on('click', 'up', function(e) {
  var menu = new UI.Menu({
    sections: [{
      items: [{
        title: 'Pebble.js',
        icon: 'images/menu_icon.png',
        subtitle: 'Can do Menus'
      }, {
        title: 'Second Item',
        subtitle: 'Subtitle Text'
      }, {
        title: 'Third Item',
      }, {
        title: 'Fourth Item',
      }]
    }]
  });
  menu.on('select', function(e) {
    console.log('Selected item #' + e.itemIndex + ' of section #' + e.sectionIndex);
    console.log('The item is titled "' + e.item.title + '"');
  });
  menu.show();
});

main.on('click', 'select', function(e) {
  var wind = new UI.Window({
    backgroundColor: 'black'
  });
  var radial = new UI.Radial({
    size: new Vector2(140, 140),
    angle: 0,
    angle2: 300,
    radius: 20,
    backgroundColor: 'cyan',
    borderColor: 'celeste',
    borderWidth: 1,
  });
  var textfield = new UI.Text({
    size: new Vector2(140, 60),
    font: 'gothic-24-bold',
    text: 'Dynamic\nWindow',
    textAlign: 'center'
  });
  var windSize = wind.size();
  // Center the radial in the window
  var radialPos = radial.position()
      .addSelf(windSize)
      .subSelf(radial.size())
      .multiplyScalar(0.5);
  radial.position(radialPos);
  // Center the textfield in the window
  var textfieldPos = textfield.position()
      .addSelf(windSize)
      .subSelf(textfield.size())
      .multiplyScalar(0.5);
  textfield.position(textfieldPos);
  wind.add(radial);
  wind.add(textfield);
  wind.show();
});

main.on('click', 'down', function(e) {
  var card = new UI.Card();
  card.title('A Card');
  card.subtitle('Is a Window');
  card.body('The simplest window type in Pebble.js.');
  card.show();
});
*/