var UI = require('ui');
var Vector2 = require('vector2');
var ajax = require('ajax');

var CACHE_SIZE = 3;
var youDaoTranslate = 'http://fanyi.youdao.com/openapi.do?keyfrom=PebbleGreReminder&key=821536062&type=data&doctype=json&only=dict&version=1.1';
var wordDataBase = 'https://gre-reminder-service.herokuapp.com/word';
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
    getRealData(CACHE_SIZE);
  }
  else{
    console.log("Just update");
    updateWordView();
  }
}

function updateWordView(){
  currentWord = cachedWords[cachedWords.length-1];
  newWord.text(currentWord);
  cachedWords.pop();
}

function getRealData(amount){
  ajax(
  {
    url: wordDataBase,
    method: 'get',
    data: {amount: amount},
    type: 'json',
    cache: 'false'
  },
  function(data) {
    // Success!
    cachedWords = data;
    updateWordView();
  },
  function(error) {
    // Failure!
    newWord.text(error.message);
  }
);
}

function getMockData(size){
  var wordList = ['varnish', 'invidious', 'adjourn', 'abstruse', 'scant', 'travail', 'fraudulent'];
  //Will improve later
  var edge = parseInt(Math.random()*(wordList.length-size));
  return wordList.slice(edge, edge+size);
}