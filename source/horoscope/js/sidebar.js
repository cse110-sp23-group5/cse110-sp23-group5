window.addEventListener('DOMContentLoaded', init);

class Horoscope{
    constructor(imgSrc, imgAlt, sign, birthday, date) {
        this.imgSrc = imgSrc;
        this.imgAlt = imgAlt;
        this.sign = sign;
        this.birthday = birthday;
        this.date = date;
    }
}

function init() {
    
    //TODO: get actual horoscopes and save, this is a placeholder for testing
    const arr = [
        new Horoscope("./images/Horoscopes/Capricorn.png", "Capricorn", "Capricorn", "1/1/2000", "9:14 am"),
        new Horoscope("./images/Horoscopes/Capricorn.png", "Capricorn", "Capricorn", "1/1/2000", "Wed"), 
        new Horoscope("./images/Horoscopes/Capricorn.png", "Capricorn", "Capricorn", "1/1/2000", "Tues"), 
    ];
    console.log(arr);
    saveHoroscopesToStorage(arr);
    
    // Get the horoscopes from localStorage
    let horoscopes = getHoroscopesFromStorage();
    // Add each horoscopes to the <main> element
    addHoroscopesToDocument(horoscopes);
    
    const card = document.querySelector('past-entry-card');
    const deleteButton = card.shadowRoot.querySelector('.delete');

    card.addEventListener('click', onClick);
    deleteButton.addEventListener('click', deleteCard);
}

/**
 * When card is clicked, display the information on the main page
 */
function onClick() {

}

/**
 * When delete button is clicked, delete the card and its data
 */
function deleteCard() {

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
 * to sidebar
 * @param {Array<Horoscope>} horoscopes An array of horoscopes
 */
function addHoroscopesToDocument(horoscopes) {
    const sidebar = document.querySelector('#sidebar');
  
    for (let horo of horoscopes) {
      let card = document.createElement('past-entry-card');
      card.data = horo;
      sidebar.appendChild(card);
    }
}

/**
 * Takes in an array of horoscopes, converts it to a string, and then
 * saves that string to 'horoscopes' in localStorage
 * @param {Array<Object>} horoscopes An array of horoscopes
 */
function saveHoroscopesToStorage(horoscopes) {
    localStorage.setItem('horoscopes', JSON.stringify(horoscopes));
  }