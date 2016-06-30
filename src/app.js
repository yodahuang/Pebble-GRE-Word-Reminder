var UI = require('ui');
var Vector2 = require('vector2');
var ajax = require('ajax');

var CACHE_SIZE = 3;
var youDaoTranslate = 'http://fanyi.youdao.com/openapi.do?keyfrom=PebbleGreReminder&key=821536062&type=data&doctype=json&only=dict&version=1.1';
var translateURL = youDaoTranslate;

var cachedWords = [];
var currentWord;

var wordCard = new UI.Window();
var newWord = new UI.Text({
    size: new Vector2(130, 80),
  position: new Vector2(5,60),
    font: 'droid_serif_28_bold',
    text: 'Waiting...',
    textAlign: 'center'
  });
wordCard.add(newWord);

wordCard.show();

displayNewWord();

function getNewWords(){
  cachedWords = getMockData(CACHE_SIZE);
}

var defCard = new UI.Card({
  title: 'Definition',
  body: ''//The definition get from ajax call
});

wordCard.on('click', 'select', function(e){
  defCard.body('');
  ajax(
  {
    url: translateURL+'&q='+currentWord,
    type: 'json'
  },
  function(translation) {
    // Success!
    //defCard.body(translation.data.translations[0].translatedText);
    var transText = '';
    translation.basic.explains.forEach( function(explain){
      transText+=(explain+'\n');
    });
    defCard.body(transText);
  },
  function(error) {
    // Failure!
    console.log('Failed fetching translation data: ' + error);
  }
);
  defCard.show();
});

wordCard.on('click', 'up', displayNewWord);
wordCard.on('click', 'down', displayNewWord);

function displayNewWord(){
  if (!cachedWords.length){
    getNewWords();
  }
  currentWord = cachedWords[cachedWords.length-1];
  newWord.text(currentWord);
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