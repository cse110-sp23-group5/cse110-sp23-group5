let responses = [];

//get responses from json file
function loadResponses() {
  fetch('responses.json')
    .then(response => response.json())
    .then(data => {
      responses = data.responses;
    })
    .catch(error => console.error(error));
}

// returns a random answer from the responses array
function getAnswer() {
  // questionInput is not used as of now
  //const questionInput = document.getElementById('question-input');
  const answerOutput = document.getElementById('answer');
  
  // error handling if responses isn't loaded
  if (responses.length === 0) {
    answerOutput.innerHTML = "Error: responses not loaded.";
    return;
  }
  
  // pick random response and set answer
  const randomResponse = responses[Math.floor(Math.random() * responses.length)];
  answerOutput.innerHTML = randomResponse;
}

loadResponses();