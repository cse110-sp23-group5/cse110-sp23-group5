const LANDING_PAGE = 'landing.html';

window.addEventListener('DOMContentLoaded', init);

/**
 * A simple counter that increments each time it is called
 * @param start starting number
 * @returns function that returns an incremented number each time
 */
function makeCounter(start) {
    var i = start;
    return function() {
        return ++i;
    }
}

let counter;

/**
 * Horoscope object:
 * {
 *      "id": Number,
 *      "sign": string,
 *      "birthday": string,
 *      "date": Date,
 *      "message": string,
 *      "category": string
 * }
 */
class Horoscope{
    constructor(sign, birthday, date, message, category) {
        this.id = counter();
        this.sign = sign;
        this.birthday = birthday;
        this.date = date;
        this.message = message;
        this.category = category;
    }
}

let horoscopes = [];
let horoscopesJSON = new Set();

function init() {
    // Get the horoscopes from localStorage
    horoscopes = getHoroscopesFromStorage();
    let id = 0;
    horoscopes.forEach((horoscope) => {
        id = Math.max(id, horoscope.id);
    });
    //have the id start from the last saved id so none overlap
    counter = makeCounter(id);

    // Add each horoscopes to the #saved-list element
    addHoroscopesToDocument(horoscopes);

    const clear = document.querySelector("#clear-horos");
    const savedList = document.querySelector("#saved-list");
    if (clear) {
        //clear horoscopes when clear button is clicked
        clear.addEventListener('click', function () {
            localStorage.removeItem('horoscopes');
            horoscopes = [];
            horoscopesJSON.clear();
            savedList.innerHTML = "";
        });
    }

    const goBack = document.getElementById("back");
    if (goBack) {
        goBack.addEventListener('click', () => {
            window.location.href = LANDING_PAGE;
        })
    }
}

/**
 * Add horoscope to the array of horoscopes and save to local storage
 * @param {Horoscope} horoscope horoscope object to save
 */
function saveHoroscope(horoscope) {

    const replaceFields = (key, value) => {
        const fieldsToExclude = ['id', 'date'];
        if (fieldsToExclude.includes(key)) {
            return undefined; // Exclude these fields from the JSON string
        }
        return value;
    };

    if (horoscopesJSON.has(JSON.stringify(horoscope, replaceFields))) {
        alert("You have already saved this horoscope!");
        return;
    }
    horoscopes.push(horoscope);
    horoscopesJSON.add(JSON.stringify(horoscope, replaceFields));
    saveHoroscopesToStorage(horoscopes);
}

/**
 * When card is clicked, display the information on the main page
 */
function onClick() {
    let horo = this.data;
    setHoroscope(horo);
    //Todo: Since Separated Out Set Horoscope won't work Might Not need it.
}

/**
 * When delete button is clicked, delete the card and its data
 */
function deleteCard(event) {
    //get the id of the card and remove it from the array and localStorage
    let horoscopes = getHoroscopesFromStorage();
    const id = this.parentNode.dataset.id;
    horoscopes = horoscopes.filter(obj => obj.id != id);
    saveHoroscopesToStorage(horoscopes);

    // Remove the card from the DOM
    this.parentNode.parentNode.removeChild(this.parentNode);
    this.parentNode.remove();
    if(event.stopPropagation)
        event.stopPropagation();
}

/**
 * Reads 'horoscopes' from localStorage and returns an array of
 * all of the horoscopes found (parsed, not in string form). If
 * nothing is found in localStorage for 'horoscopes', an empty array
 * is returned.
 * @returns {Array<Horoscope>} An array of horoscopes found in localStorage
 */
function getHoroscopesFromStorage() {
    return JSON.parse(localStorage.getItem('horoscopes') || '[]');
}

/**
 * Takes in an array of Horoscopes and for each horoscope creates a
 * new <past-entry-card> element, adds the horoscope data to that card
 * using element.data = {...}, and then appends that new card
 * to the top of the history
 * @param {Array<Horoscope>} horoscopes An array of horoscopes
 */
function addHoroscopesToDocument(horoscopes) {
    const history = document.querySelector('#saved-list');

    if (history) {
        for (let horo of horoscopes) {
            let card = document.createElement('past-entry-card');
            card.data = horo;
            // need event listeners for each delete button
            const deleteButton = card.shadowRoot.querySelector('.delete');
            deleteButton.addEventListener('click', deleteCard);
            history.prepend(card);
        }
    }
}

/**
 * Takes in an array of horoscopes, converts it to a string, and then
 * saves that string to 'horoscopes' in localStorage
 * @param {Array<Horoscope>} horoscopes An array of horoscopes
 */
function saveHoroscopesToStorage(horoscopes) {
    localStorage.setItem('horoscopes', JSON.stringify(horoscopes));
}

export {Horoscope, addHoroscopesToDocument, saveHoroscope, makeCounter};
