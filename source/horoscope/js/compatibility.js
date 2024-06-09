import { Horoscope, saveHoroscope } from "./history.js";
import {checkValidSign, checkValidBirthday} from "./landing.js"
import { dateToHoroscope } from "./horoscope.js";

const birthdayElement1 = document.getElementById('birthday-input1');
const birthdayElement2 = document.getElementById('birthday-input2');
const COMPATIBILITY_RESULT_PAGE = 'compatibility-results.html';

window.addEventListener('DOMContentLoaded', init);

async function init() {

    // fr-ca to get date in YYYY-MM-DD set max day to Today
    birthdayElement1.max = new Date().toLocaleDateString('fr-ca');
    birthdayElement2.max = new Date().toLocaleDateString('fr-ca');

    const submit = document.getElementById('submit-compatibility');
    submit.addEventListener('click', button);

    // Load in the Birthday if stored
    let birthday1 = localStorage.getItem('birthday1');
    if (birthday1) {
        birthdayElement1.value = birthday1 
    }
    let birthday2 = localStorage.getItem('birthday2');
    if (birthday2) {
        birthdayElement2.value = birthday2 
    }
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