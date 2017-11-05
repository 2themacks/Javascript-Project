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
//take out these next two lines of code once you know that the same array info is being pulled.
          let theanswer = document.getElementById("theanswer");
          theanswer.innerHTML = jsonObj[i].answer;

          function showAnswer() {
            let answer = document.getElementById("answer");
            answer.innerHTML = jsonObj[i].answers
          }
          showAnswerButton();
          showAnswer();
      }
      }
    }
  }
  ajaxRequest.open("GET","http://jservice.io/api/random", true);
  ajaxRequest.send();
}


function showAnswerButton() {
  let answerButton = document.getElementById('answerButton');
  answerButton.className = "";
}

//use the this function to show answer
//how do i pull a function inside another function
function unhideAnswer() {
  let unhideAnswer = document.getElementById('answer');
  answer.className = "answerText";
  unhideAnswer.innerHTML = showAnswer();

}

document.getElementById("clickMe").addEventListener('click', randomQ);
document.getElementById('answerButton').addEventListener('click', unhideAnswer);





//have two buttons: category picker and then a randomizer
//pick a jeopardy season, then date, then category
//also have a randomizer


//set up another event that shows the answer from the same array at the click of a button\
// when the button is clicked, it shows two more objects from that array
// if (randomQ function is executed successfully) {
    // return button that will take information from that same random array
// }




// I would like you to try to check the user's answer and keep score automatically. This will be a little hard to do because spelling will be important, so maybe give the user a button to override the system if they knew the answer but misspelled it. Does that make sense? One quick tip on this one: it might be a good idea to convert the answer key to all lowercase and also convert the user's answer to all lowercase when you compare them so you can eliminate the need for the user's input to be case sensitive.
