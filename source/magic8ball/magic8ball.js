//get responses from json file
function loadResponses(selectedCharacter) {
  fetch('responses.json')
    .then(response => response.json())
    .then(data => {
      responses = data[selectedCharacter];
    })
    .catch(error => console.error(error));
}

// returns a random answer from the responses array
function getAnswer() {
  const questionInput = document.getElementById('question-input');
  const answerOutput = document.getElementById('answer');
  
  // error handling if responses isn't loaded
  if (responses.length === 0) {
    answerOutput.innerHTML = "Error: responses not loaded.";
    return;
  }
  
  // Effects
  answerOutput.innerHTML = "";
  audio.play();

  // pick random response and set answer after audio stops playing
  audio.addEventListener('ended', () => {

    if (questionInput.value === "") {
      answerOutput.innerHTML = "Please ask a question.";
      return;
    }
    const randomResponse = responses[Math.floor(Math.random() * responses.length)];
    answerOutput.innerHTML = randomResponse;
  });
  

}
// event listener for shake button
function shakeBall() {
  const ballContainer = document.getElementById('eight-ball-container');
  ballContainer.classList.add('shaking');

  // Remove the "shaking" class after the animation has completed 750ms
  setTimeout(() => {
    ballContainer.classList.remove('shaking');
  }, 750);
}
let responses = [];

// event listener for character selection
const characterSelect = document.getElementById("character-select");
characterSelect.addEventListener("change", () => {
  loadResponses(characterSelect.value);
});

loadResponses(characterSelect.value);
let audio = document.getElementById("myAudio")

