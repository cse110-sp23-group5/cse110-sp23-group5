import { clearHoroscope } from "./horoscope.js";
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

class Horoscope{
    constructor(sign, birthday, date, message) {
        this.id = counter();
        this.sign = sign;
        this.birthday = birthday;
        this.date = date;
        this.message = message;
    }
}

let horoscopes = [];

function init() {
    // Get the horoscopes from localStorage
    horoscopes = getHoroscopesFromStorage();
    let id = 0;
    horoscopes.forEach((horoscope) => {
        id = Math.max(id, horoscope.id);
    });
    counter = makeCounter(id);

    // Add each horoscopes to the <main> element
    addHoroscopesToDocument(horoscopes);

    const clear = document.querySelector("#clear-horos");
    const savedList = document.querySelector("#saved-list");
    clear.addEventListener('click', function () {
        localStorage.clear();
        horoscopes = [];
        savedList.innerHTML = "";
        clearHoroscope();
    });
}

/**
 * Add horoscope to the array of horoscopes and save to local storage
 * @param {Horoscope} horoscope horoscope object to save
 */
function saveHoroscope(horoscope) {
    horoscopes.push(horoscope);
    addHoroscopesToDocument([horoscope]);
    saveHoroscopesToStorage(horoscopes);
}

/**
 * When card is clicked, display the information on the main page
 */
function onClick() {
    let horo = this.data;
    setHoroscope(horo);

    //let categoryElement = document.getElementById('category');
    //categoryElement.dispatchEvent(new Event('change')); // TODO: remember the saved horoscope instead of generating a new one
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

    clearHoroscope();

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
 * using element.data = {...}, and then appends that new recipe
 * to the top of the sidebar
 * @param {Array<Horoscope>} horoscopes An array of horoscopes
 */
function addHoroscopesToDocument(horoscopes) {
    const sidebar = document.querySelector('#saved-list');
  
    for (let horo of horoscopes) {
      let card = document.createElement('past-entry-card');
      card.data = horo;
      // need event listeners for each delete button
      const deleteButton = card.shadowRoot.querySelector('.delete');
      card.addEventListener('click', onClick);
      deleteButton.addEventListener('click', deleteCard);
      sidebar.prepend(card);
    }
}
export {addHoroscopesToDocument};

/**
 * Takes in an array of horoscopes, converts it to a string, and then
 * saves that string to 'horoscopes' in localStorage
 * @param {Array<Horoscope>} horoscopes An array of horoscopes
 */
function saveHoroscopesToStorage(horoscopes) {
    localStorage.setItem('horoscopes', JSON.stringify(horoscopes));
}

export {Horoscope, saveHoroscope};
