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
    if (birthday.length != 10 || birthday[4] != '-' || birthday[7] != '-') {
        alert("Please enter a valid date in the format MM/DD/YYYY");
        return false;
    }
    if (isNaN(Date.parse(birthday))) {
        alert("Please enter a valid date in the format MM/DD/YYYY");
        return false;
    }
    if (new Date(birthday) > new Date()) {
        alert("Please enter a valid date in the past");
        return false;
    }
    if (new Date(birthday) < new Date("1900-01-01")) {
        alert("Please enter a valid date after 1900");
        return false;
    }
    return true;
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