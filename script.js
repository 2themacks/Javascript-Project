let changeAnswerObjCase;

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
      }
      }
    }
  }
  ajaxRequest.open("GET","http://jservice.io/api/random", true);
  ajaxRequest.send();
}
// THE FOLLOWING FUNCTION SHOWS THE ANSWER BUTTON ONCE THE GAME IS POPULATED
function showAnswerButton() {
  let answerButton = document.getElementById('answerButton');
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
    //creates button
    let itsRightBtn = document.createElement("button");
    itsRightBtn.innerHTML = "I got it right";
    let itsRightBtnDiv = document.getElementById("itsRightBtnDiv");
    itsRightBtnDiv.appendChild(itsRightBtn);
    //adds to score if user got it right but there was a typo
    itsRightBtn.addEventListener("click", keepScore);
    resetGame();
  }
}
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
    let resetBtn = document.getElementById("resetBtn")
    resetBtn.className = "";
    // BELOW CODE IS FOR SESSION STORAGE TBD
        // sessionStorage.setItem('countingScore', 'questionValueNumber');
        // let updateScore = sessionStorage.getItem("score");
        // saveScore()
  }
}


document.getElementById("clickMe").addEventListener('click', randomQ);
document.getElementById('answerButton').addEventListener('click', showAndCompareAnswer);
document.getElementById('resetBtn').addEventListener('click', resetGame)


//THIS IS THE FUNCTION I WILL WRITE TO CREATE ANOTHER ROUND
function resetGame (){
  document.getElementById("category").innerHTML = "";
  document.getElementById("question").innerHTML = "";
  document.getElementById("value").innerHTML = "";
  document.getElementById("userAnswer").innerHTML = "";
  document.getElementById("typedAnswer").innerHTML = "";
  document.getElementById("theanswer").innerHTML = "";
  let hideAnswerAgain = document.getElementById("answer");
  hideAnswerAgain.className = "hide";
  randomQ();
}
