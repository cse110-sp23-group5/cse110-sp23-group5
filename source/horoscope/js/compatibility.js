import { Horoscope, saveHoroscope } from "./history.js";
import {checkValidSign, checkValidBirthday} from "./landing.js"

const birthdayElement1 = document.getElementById('birthday-input1');
const birthdayElement2 = document.getElementById('birthday-input2');
const COMPATIBILITY_RESULT_PAGE = 'compatibility-results.html';

window.addEventListener('DOMContentLoaded', init);

async function init() {

    const submit = document.getElementById('submit');
    submit.addEventListener('click', button);

    // initialization of elements relevant to fortunePage.html
    let fortuneElementTitle = document.getElementById('horoscope-title');

    // function that parses the birthday and retreives the fortune from the json file
    async function getPrompt() {
        let promptDB;

        return new Promise(async (resolve, reject) => {
            await fetch('../json/compatibilityResponses.json')
            .then(response => response.json())
            .then(data => {
                //parse json
                promptDB = JSON.parse(JSON.stringify(data));
                let date = localStorage.getItem('birthday');
                let sign = dateToHoroscope(date);
                let horoscopeprompt = promptDB[sign][localStorage.getItem('category')];
                let selectedPrompt = horoscopeprompt[Math.floor((Math.random() * horoscopeprompt.length)%horoscopeprompt.length)];
                resolve(selectedPrompt);
            })
            .catch(error => {
                console.error('Error:', error);
                reject(error);
            });  
        });
    }
}

/**
 * Called when you want to clear the horoscope on the main page
 */
function clearHoroscope() {

    let fortuneElement = document.getElementById('horoscope-fortune')
    fortuneElement.textContent = "Enter your birthday above and choose a category to see your daily horoscope!";
    
    let fortuneElementTitle = document.getElementById('horoscope-title');
    fortuneElementTitle.textContent = "Your Horoscope";
}

/**
     * Determines horoscope sign based on birthday
     * @param {string} dateString string representation of the date in form YYYY-MM-DD
     * @returns name of the zodiac sign
     */
function dateToHoroscope(dateString) {
    // Array of signs. Capricorn is repeated since it crosses the new year
    
    const zodiacSigns = [
        { name: "Capricorn", start: "01-01", end: "01-19" },
        { name: "Aquarius", start: "01-20", end: "02-18" },
        { name: "Pisces", start: "02-19", end: "03-20" },
        { name: "Aries", start: "03-21", end: "04-19" },
        { name: "Taurus", start: "04-20", end: "05-20" },
        { name: "Gemini", start: "05-21", end: "06-20" },
        { name: "Cancer", start: "06-21", end: "07-22" },
        { name: "Leo", start: "07-23", end: "08-22" },
        { name: "Virgo", start: "08-23", end: "09-22" },
        { name: "Libra", start: "09-23", end: "10-22" },
        { name: "Scorpio", start: "10-23", end: "11-21" },
        { name: "Sagittarius", start: "11-22", end: "12-21" },
        { name: "Capricorn", start: "12-22", end: "12-31" },
    ];

    // Find the correct sign object.
    // Date is 1 day off when printing to console because of time zone conversions.
    const date = new Date(dateString); 
    const year = dateString.substring(0,4);

    const matchingSign = zodiacSigns.find(sign => {
        const start = new Date(`${year}-${sign.start}`).getTime();
        const end = new Date(`${year}-${sign.end}`).getTime();
        const birthdayTime = date.getTime();
        return (birthdayTime >= start && birthdayTime <= end);
    });
    
    // Check if a sign is found
    return matchingSign ? matchingSign.name : "NO SIGN FOUND";
} 

/**
 * runs on GO button click
 * adds proper values to local storage and redirects to horoscope page
 * @returns {void}
 */
function button() {
    console.log("HERE")
    let birthday1 = birthdayElement1.value;
    let birthday2 = birthdayElement2.value;
    //check if birthday is valid Alerts Given in function
    if (!checkValidBirthday(birthday1) || !checkValidBirthday(birthday2)) {
        return;
    }
    let sign1 = dateToHoroscope(birthday1);
    let sign2 = dateToHoroscope(birthday2);
    if (!checkValidSign(sign1) || !checkValidSign(sign2)) {
        return;
    }

  

    // console.log(categoryElement.value);
    //save horoscope to local storage for sidebar
    localStorage.setItem('birthday1', birthday1);
    localStorage.setItem('birthday2', birthday2);
    localStorage.setItem('sign1', sign1);
    localStorage.setItem('sign2', sign2);

    //redirect to horoscope page
    window.location.href = COMPATIBILITY_RESULT_PAGE;
}

export {dateToHoroscope, clearHoroscope}