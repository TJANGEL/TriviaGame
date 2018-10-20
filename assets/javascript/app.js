var panel = $('#quiz-area');
var countStartNumber = 20;


$(document).on('click', '#start-over', function(e) {
  game.reset();
});

$(document).on('click', '.answer-button', function(e) {
  game.clicked(e);
});

$(document).on('click', '#start', function(e) {
  $('#container').prepend('<h2>Time Remaining: <span id="counter-number">20</span> Seconds</h2>');
  game.loadQuestion();
});

// Questions:
var questions = [{
  question: "What is the name of the American animated sci-fi sitcom about the misadventures of a mad scientist and his grandson?",
  answers: ["Dexter's Laboratory", "Family Guy", "Fairly Odd Parents", "Rick and Morty"],
  correctAnswer: "Rick and Morty",
  image:"assets/images/rick-and-morty.gif"
}, {
  question: "In what city would you find the Wizard of Oz?",
  answers: ["San Francisco", "The Emerald City", "New Orleans", "Dallas"],
  correctAnswer: "The Emerald City",
  image:"assets/images/wizardofoz.gif"
}, {
  question: "What was the first publicly traded U.S. company to reach a $1 trillion market cap?",
  answers: ["Grapefruit", "Orange", "Apple", "Peach"],
  correctAnswer: "Apple",
  image:"assets/images/apple.gif"
}, {
  question: "What Marvel characters real name is Carol Danvers?",
  answers: ["Captain Marvel", "Captain America", "She Marvel", "Oprah"],
  correctAnswer: "Captain Marvel",
  image:"assets/images/captain-marvel.gif"
}, {
  question: "On the hit show Seinfeld what was Kramers first name?",
  answers: ["Jerry", "Leonard", "Costo", "Cosmo"],
  correctAnswer: "Cosmo",
  image:"assets/images/cosmo-kramer.gif"
}, {
  question: "How many fingers do the Simpsons cartoon characters have?",
  answers: ["Five", "Three", "Four", "Six"],
  correctAnswer: "Four",
  image:"assets/images/simpsons.gif"
}, {
  question: "A fortnight is a unit of time equal to how many days?",
  answers: ["Six", "Twenty Eight", "Twelve", "Fourteen"],
  correctAnswer: "Fourteen",
  image:"assets/images/fortnight.gif"
}, {
  question: "On the popular social website Reddit, what does AMA stand for?",
  answers: ["Ask More Analogies", "Ask Me Anything", "Anti Memory Area", "Animals Meet Animals"],
  correctAnswer: "Ask Me Anything",
  image:"assets/images/reddit.gif"
}, {
  question: "What is the capital city of South Korea?",
  answers: ["Seoul", "Soul", "Soul", "Sole"],
  correctAnswer: "Seoul",
  image:"assets/images/south-korea.gif"
}, {
  question: "What is the name for the upper arm bone found in humans?",
  answers: ["Funny", "Humor", "Humerous", "Humorous"],
  correctAnswer: "Humerous",
  image:"assets/images/humerous.gif"
}];


var game = {
  questions:questions,
  currentQuestion:0,
  counter:countStartNumber,
  correct:0,
  incorrect:0,
  countdown: function(){
    game.counter--;
    $('#counter-number').html(game.counter);

    if (game.counter === 0){
      console.log('TIME UP');
      game.timeUp();
    }
  },
  loadQuestion: function(){
    timer = setInterval(game.countdown, 2000);
    panel.html('<h2>' + questions[this.currentQuestion].question + '</h2>' );
    for (var i = 0; i<questions[this.currentQuestion].answers.length; i++){
      panel.append('<button class="answer-button" id="button"' + 'data-name="' + questions[this.currentQuestion].answers[i] + '">' + questions[this.currentQuestion].answers[i]+ '</button>');
    }
  },
  nextQuestion: function(){
    game.counter = countStartNumber;
    $('#counter-number').html(game.counter);
    game.currentQuestion++;
    game.loadQuestion();
  },
  timeUp: function (){
    clearInterval(timer);
    $('#counter-number').html(game.counter);

    panel.html('<h2>Times Up!</h2>');
    panel.append('<h3>The Correct Answer Was: ' + questions[this.currentQuestion].correctAnswer);
    panel.append('<img src="' + questions[this.currentQuestion].image + '" />');

    if (game.currentQuestion === questions.length - 1){
      setTimeout(game.results, 2000);
    } else {
      setTimeout(game.nextQuestion, 2000);
    }
  },
  results: function() {
    clearInterval(timer);

    panel.html('<h2>GAME OVER!</h2>');
    $('#counter-number').html(game.counter);
    panel.append('<h3>Correct Answers: ' + game.correct + '</h3>');
    panel.append('<h3>Incorrect Answers: ' + game.incorrect + '</h3>');
    panel.append('<h3>Unanswered: ' + (questions.length - (game.incorrect + game.correct)) + '</h3>');
    panel.append('<br><button id="start-over">Start Over?</button>');
  },
  clicked: function(e) {
    clearInterval(timer);

    if ($(e.target).data("name") === questions[this.currentQuestion].correctAnswer){
      this.answeredCorrectly();
    } else {
      this.answeredIncorrectly();
    }
  },
  answeredIncorrectly: function() {
    game.incorrect++;
    clearInterval(timer);
    panel.html('<h2>WRONG, DUMMY!</h2>');
    panel.append('<h3>The Correct Answer Was: ' + questions[game.currentQuestion].correctAnswer + '</h3>');
    panel.append('<img src="' + questions[game.currentQuestion].image + '" />');

    if (game.currentQuestion === questions.length - 1){
      setTimeout(game.results, 2000);
    } else {
      setTimeout(game.nextQuestion, 2000);
    }
  },
  answeredCorrectly: function(){
    clearInterval(timer);
    game.correct++;
    panel.html('<h2>BINGO, YOU ARE SO SMART!</h2>');
    panel.append('<img src="' + questions[game.currentQuestion].image + '" />');

    if (game.currentQuestion === questions.length - 1){
      setTimeout(game.results, 2000);
    } else {
      setTimeout(game.nextQuestion, 2000);
    }
  },
  reset: function(){
    this.currentQuestion = 0;
    this.counter = countStartNumber;
    this.correct = 0;
    this.incorrect = 0;
    this.loadQuestion();
  }
};