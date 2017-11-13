let changeAnswerObjCase;
let answerButton = document.getElementById('answerButton');

function randomQ () {
  var ajaxRequest = new XMLHttpRequest ()
  ajaxRequest.onreadystatechange = function () {
    if (ajaxRequest.readyState == 4) {
      if (ajaxRequest.status == 200) {
      let jsonObj = JSON.parse(ajaxRequest.responseText);
        for (let i=0; i<jsonObj.length; i++) {
          let category = document.getElementById("category");
          category.innerHTML = jsonObj[i].category.title;
          let question = document.getElementById("question");
          question.innerHTML = jsonObj[i].question;
          let value = document.getElementById("value");
          value.innerHTML = jsonObj[i].value;
          //delcared this variable valueAction so that i can add it to score board later
          let valueAction = jsonObj[i].value;

          let answer = document.getElementById("answer");
          let answerValue = jsonObj[i].answer;
          console.log(answerValue);
          //variable changeAnswerObjCase is so i can compare strings
          changeAnswerObjCase = answerValue.toLowerCase();
          answer.innerHTML = changeAnswerObjCase;

          showAnswerButton();
//this code clears the answer fields whent the question button is clicked.
          document.getElementById("userAnswer").innerHTML = "";
          document.getElementById("typedAnswer").innerHTML = "";
          document.getElementById("theanswer").innerHTML = "";
          let hideAnswerAgain = document.getElementById("answer");
          hideAnswerAgain.className = "hide";
          itsRightBtn.className="hide";
          document.getElementById("answerMessage").innerHTML = "";
      }
      }
    }
  }
  ajaxRequest.open("GET","http://jservice.io/api/random", true);
  ajaxRequest.send();
}
// THE FOLLOWING FUNCTION SHOWS THE ANSWER BUTTON ONCE THE GAME IS POPULATED
function showAnswerButton() {
  answerButton.className = "";
}


//THIS FUNCTION SHOWS THE USER INPUT ANSWER, THE ACTUAL ANSWER, AND COMPARES THE TWO
function showAndCompareAnswer() {
  //this unhides the answer from the JSON object
  let unhideAnswer = document.getElementById("answer");
  unhideAnswer.className = "showingAnswer";
  //this takes the user's input value and converts it to all lowercase
  let userAnswer = document.getElementById('userAnswer').value;
  let changeCase = userAnswer.toLowerCase();
  let typedAnswer = document.getElementById('typedAnswer');
  typedAnswer.innerHTML = changeCase;
  console.log(changeCase);
  console.log(changeAnswerObjCase);
  if (changeAnswerObjCase == changeCase) {
    console.log('match');
    keepScore();
  }
  else {
    keepScoreFailure();
    itsRightBtn.className="";
  }
  answerButton.className = "hide";
  document.getElementById("userAnswer").value= "";
}


//adds to score if user got it right but there was a typo
let itsRightBtn = document.getElementById("itsRightBtn");
itsRightBtn.addEventListener("click", keepScore);



// or let start score = to session storage once i get that coded
let startScore=parseInt(0);

function keepScore() {
  let scoreBox = document.getElementById("score");
  let questionValue = document.getElementById("value").innerHTML;
  let questionValueNumber = parseInt(questionValue);
  document.getElementById("score").innerHTML=startScore
  if (true){
    startScore = startScore + questionValueNumber;
    document.getElementById("score").innerHTML=startScore;
    itsRightBtn.className="hide";
    document.getElementById("answerMessage").innerHTML = "yay you got it right! You're so smart. Click the question button again for another question.";
  }
}
function keepScoreFailure() {
  let scoreBox = document.getElementById("score");
  let questionValue = document.getElementById("value").innerHTML;
  let questionValueNumber = parseInt(questionValue);
  document.getElementById("answerMessage").innerHTML = "Aw man, that's not the answer we were looking for. Did you get it right and there was a typo? Click the 'I got it Right' button too get the points.";
  document.getElementById("score").innerHTML=startScore
  if (true){
    document.getElementById("score").innerHTML=startScore;
  }
}

document.getElementById("clickMe").addEventListener('click', randomQ);
document.getElementById('answerButton').addEventListener('click', showAndCompareAnswer);
