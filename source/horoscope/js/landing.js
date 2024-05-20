import { dateToHoroscope } from './horoscope.js';

const categoryElement = document.getElementById('category');
const birthdayElement = document.getElementById('birthday-input');
const HOROSCOPE_PAGE = 'horoscope.html';

window.addEventListener('DOMContentLoaded', init);
async function init() {
    const submit = document.getElementById('submit');
    submit.addEventListener('click', button);
}
/**
 * runs on GO button click
 * adds proper values to local storage and redirects to horoscope page
 * @returns {void}
 */
function button() {
    let birthday;

    //check if birthday is valid, if not use the one in local storage if it exists
    // If neither, do not proceed
    if (checkValidBirthday(birthdayElement.value)) {
        birthday = birthdayElement.value;
    } else if (localStorage.getItem('birthday')) {
        birthday = localStorage.getItem('birthday');
    } else {
        return;
    }

    let sign = dateToHoroscope(birthday);
    let category = categoryElement.value;
    if (!checkValidCategory(category)){
        alert("Please select a category");
        return;
    };

    //save horoscope to local storage for sidebar
    localStorage.setItem('birthday', birthday);
    localStorage.setItem('sign', sign);
    localStorage.setItem('category', category);

    //redirect to horoscope page
    window.location.href = HOROSCOPE_PAGE;
}

/**
 * Checks if the birthday is valid
 * @param {string} birthday 
 * @returns {boolean} true if valid, false otherwise
 */
function checkValidBirthday(birthday) {
    check = true;
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
    if (category === "Select a category") {
        alert("Please select a category");
        return false;
    }
    return true;
}
