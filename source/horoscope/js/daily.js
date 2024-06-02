// JavaScript File for Daily Horoscope Predictions

const LANDING_PAGE = 'landing.html';
const SIGNNAMES = ['Aquarius', 'Pisces', 'Aries', 'Taurus', 'Gemini', 'Cancer', 'Leo', 'Virgo', 'Libra', 'Scorpio', 'Sagittarius', 'Capricorn'];

window.addEventListener('DOMContentLoaded', init);

async function init() {
   let userSign = localStorage.getItem('sign');
   let goBack = document.getElementById('back');
   goBack.addEventListener("click", () => {
      window.location.href = LANDING_PAGE;
   });

   if (userSign) {
      moveSignToTop(userSign);
   }

   let dailyPredictions = await fetchDailyHoroscopePrediction();
   populatePredictions(dailyPredictions);
}

/**
 * Called to fetch the Horoscope Prediction for a given sign for a given day
 * @returns {map} map object with sign to prediction mapping
 */
async function fetchDailyHoroscopePrediction() {
   let predictions;
   let categories = ['Love', 'Career', 'Health'];
   let selectedPredictions = new Map();
   let date;
   let day;

   return new Promise(async (resolve, reject) => {
      await fetch('../json/horoResponses.json')
         .then(response => response.json())
         .then(data => {
            //parse json
            predictions = JSON.parse(JSON.stringify(data));
            date = new Date();
            day = date.getDate();

            SIGNNAMES.forEach((sign) => {
               let prediction = predictions[sign][categories[day % 3]][day % 26];
               selectedPredictions.set(sign, prediction)
            }) 
            
            resolve(selectedPredictions);
         })
         .catch(error => {
            console.error('Error:', error);
            reject(error);
         });
   });
}

/**
 * Populate the daily Page with the predictions.
 * @param {Map} dailyPred daily predictions for everysign
 */
function populatePredictions(dailyPred) {
   let readingsElement;

   SIGNNAMES.forEach((sign) => {
      readingsElement = document.getElementById(sign + "Reading");
      readingsElement.innerHTML = dailyPred.get(sign);
   })
}

/**
 * If the User's Sign is known move the readings for the user's sign to the top
 * @param {string} sign users' Sign
 */
function moveSignToTop(sign) {
   let elToMove = document.getElementById(sign+"Card");
   let parentEl = elToMove.parentNode;
   let moveBeforeEl = parentEl.firstChild;

   parentEl.insertBefore(elToMove,moveBeforeEl);
}