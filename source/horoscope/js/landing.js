import { dateToHoroscope } from './horoscope.js';

const birthdayElement = document.getElementById('birthday-input');
const HOROSCOPE_PAGE = 'horoscope.html';
const HISTORY_PAGE = 'history.html'
const DAILY_PAGE = 'daily.html'
const LANDING_PAGE = 'landing.html';
// UNCOMMENT WHEN LOVE COMPATIBILITY PAGE IS READY
// const LOVE_PAGE = 'compatibility.html';

window.addEventListener('DOMContentLoaded', init);
async function init() {
    const submit = document.getElementById('submit');
    submit.addEventListener('click', button);

    // Mobile Menu
    document.getElementById('mobile-menu').addEventListener('click', function() {
        var nav = document.querySelector('.nav');
        if (nav.style.display === 'block') {
            nav.style.display = 'none';
        } else {
            nav.style.display = 'block';
        }
    });    

    // Load in the Birthday if stored
    let birthday = localStorage.getItem('birthday');
    if (birthday) {
        birthdayElement.value = birthday 
    }

    // fr-ca to get date in YYYY-MM-DD set max day to Today
    birthdayElement.max = new Date().toLocaleDateString('fr-ca');

    const daily = document.getElementById("daily-horoscope");
    if (daily) {
        daily.addEventListener('click', () => {
            window.location.href = DAILY_PAGE;
        })
    }

    // UNCOMMENT WHEN LOVE COMPATIBILITY PAGE IS READY
    // const love = document.getElementById("love-compatibility");
    // if (love) {
    //     love.addEventListener('click', () => {
    //         window.location.href = LOVE_PAGE;
    //     })
    // }

    const history = document.getElementById("history");
    if (history) {
        history.addEventListener('click', () => {
            window.location.href = HISTORY_PAGE;
        })
    }
}

/**
 * runs on GO button click
 * adds proper values to local storage and redirects to horoscope page
 * @returns {void}
 */
function button() {
    let birthday = birthdayElement.value;

    //check if birthday is valid Alerts Given in function
    if (!checkValidBirthday(birthday)) {
        return;
    }

    let sign = dateToHoroscope(birthday);
    if (!checkValidSign(sign)) {
        return;
    }

    let categoryElement = document.querySelector('input[name="category"]:checked');
    if (!checkValidCategory(categoryElement)){
        return;
    };

    // console.log(categoryElement.value);
    //save horoscope to local storage for sidebar
    localStorage.setItem('birthday', birthday);
    localStorage.setItem('sign', sign);
    localStorage.setItem('category', categoryElement.value);

    //redirect to horoscope page
    window.location.href = HOROSCOPE_PAGE;
}

/**
 * Checks if the birthday is valid
 * @param {string} birthday 
 * @returns {boolean} true if valid, false otherwise
 */
function checkValidBirthday(birthday) {
    if (birthday.length != 10 || birthday[4] != '-' || birthday[7] != '-') {
        alert("Please enter a valid date in the format MM/DD/YYYY");
    }
    else if (isNaN(Date.parse(birthday))) {
        alert("Please enter a valid date in the format MM/DD/YYYY");
    }
    else if (new Date(birthday) > new Date()) {
        alert("Please enter a valid date in the past");
    }
    else if (new Date(birthday) < new Date("1900-01-01")) {
        alert("Please enter a valid date after 1900");
    } else {
        return true;
    }
    return false;
}

/**
 * Checks if the sign is valid
 * @param {string} sign
 * @returns {boolean} true if valid, false otherwise
 */
function checkValidSign(sign) {
    if (sign === "NO SIGN FOUND") {
        alert("Please enter a valid date");
        return false;
    }
    return true;
}

/**
 * Checks if the category is valid
 * @param {string} category
 * @returns {boolean} true if valid, false otherwise
 */
function checkValidCategory(category) {
    if (!category) {
        alert("Please select a category");
        return false;
    }
    return true;
}
