import { Horoscope, saveHoroscope } from "./sidebar.js";
window.addEventListener('DOMContentLoaded', init);
async function init() {
    let save = document.getElementById('save');
    let birthday = document.getElementById('birthday');
    let categoryElement = document.getElementById('category');
    let fortuneElement = document.getElementById('horoscope-fortune');
    
    //clear the main page
    clearHoroscope();

    /**
     * Determines horoscope sign based on birthday
     * @param {string} dateString string representation of the date
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
        console.log(date);

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
    * Called when you want to update the horoscope on the main page
    * 
    * @param {Horoscope} - the data to update the page with,
    *                       of the following format:
    *                       {
    *                           "sign": string
    *                           "birthday": string
    *                           "message": string
    *                       }
    */
    window.setHoroscope = (Horoscope) => {
        let sign = Horoscope.sign;
        let birthday = Horoscope.birthday;
        let message = Horoscope.message;

        //switch sign display text
        //let signDisplay = document.getElementById("sign-display");
        //signDisplay.textContent = "Your sign: " + sign;

        //switch sign display image
        //let signImage = document.getElementById("sign-image");
        //const forImage = "images/Horoscopes/" + sign + ".png";
        //signImage.src = forImage;
        
        //let dateDisplay = document.getElementById("date-display");
        //dateDisplay.textContent = "TODAY IS " + new Date().toLocaleDateString();

        //update birthday
        document.getElementById('birthday').value = birthday;

        //set text content
        fortuneElement.textContent = message;
    }



    // Add event listener for the save button
    save.addEventListener('click', async (event) => {
        let bday = birthday.value;
        
        if (bday.length != 10 || bday[4] != '-' || bday[7] != '-') {
            alert("Please enter a valid date in the format MM/DD/YYYY");
            return;
        }
        
        let sign = dateToHoroscope(bday);
        let message = fortuneElement.innerText;
        let today = new Date();
        let time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
        
        //save horoscope to local storage for sidebar
        let horoscopeElement = new Horoscope(sign, bday, time, message);
        saveHoroscope(horoscopeElement);
    })

    // add event listener for birthday change
    birthday.addEventListener('change',  async (event) => {
        //get birthday
        let birthday = event.target.value;
        //check if the birthday is in date format: MM/DD/YYYY
        if (birthday.length != 10 || birthday[4] != '-' || birthday[7] != '-') {
            alert("Please enter a valid date in the format MM/DD/YYYY");
            return;
        }
        
        //update text
        fortuneElement.innerText = await getPrompt();
    });

    // add event listener for category change
    categoryElement.addEventListener('change',  async (event) => {
        fortuneElement.innerText = await getPrompt();       
    });

    /**
     * Generates horoscope prompt based on category and sign
     * Randomly selects prompt from database
     * @returns horoscope prompt
     */
    async function getPrompt() {
        let promptDB;

        return new Promise(async (resolve, reject) => {
            await fetch('./json/horoResponses.json')
            .then(response => response.json())
            .then(data => {
                //parse json
                promptDB = JSON.parse(JSON.stringify(data));
                //console.log(promptDB);
                let date = document.getElementById('birthday').value;
                let sign = dateToHoroscope(date);
                let horoscopeprompt = promptDB[sign][categoryElement.value];
                let selectedPrompt = horoscopeprompt[Math.floor((Math.random() * horoscopeprompt.length)%horoscopeprompt.length)];
                resolve(selectedPrompt);
                //console.log(selectedPrompt);
            })
            .catch(error => {
                console.error('Error:', error);
                reject(error);
            });  
        });
    }

    //clear page when user clicks new horoscope
    let newHoroscopeButton = document.getElementById('new-horo');
    newHoroscopeButton.addEventListener('click', (event => {
        clearHoroscope();
    }));

}

/**
 * Called when you want to clear the horoscope on the main page
 */
function clearHoroscope() {
    let birthdayInput = document.getElementById('birthday');
    birthdayInput.value = '';
    
    //let locationInput = document.getElementById('location');
    //locationInput.value = '';
    
    //switch sign display text
    //let signDisplay = document.getElementById("sign-display");
    //signDisplay.textContent = "Find your Sign!";

    //switch sign display image
    // let signImage = document.getElementById("sign-image");
    // const forImage = "images/placeholder.png";
    // signImage.src = forImage;
    
    // let dateDisplay = document.getElementById("date-display");
    // dateDisplay.textContent = "Today is " + new Date().toLocaleDateString();

    let fortuneElement = document.getElementById('horoscope-fortune')
    fortuneElement.textContent = "Enter your birthday above and choose a category to see your daily horoscope!";
}

export {clearHoroscope}
