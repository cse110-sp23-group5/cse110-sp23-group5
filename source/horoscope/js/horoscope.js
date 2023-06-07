import { Horoscope, saveHoroscope } from "./sidebar.js";
window.addEventListener('DOMContentLoaded', init);
function init() {
    let submit = document.getElementById('submit');

    // date to horoscope
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
    *                       }
    */
    window.setHoroscope = (Horoscope) => {
        let sign = Horoscope.sign;
        let birthday = Horoscope.birthday;

        //switch sign display text
        let signDisplay = document.getElementById("sign-display");
        signDisplay.textContent = "Your sign: " + sign;

        //switch sign display image
        let signImage = document.getElementById("sign-image");
        const forImage = "images/Horoscopes/" + sign + ".png";
        signImage.src = forImage;
        
        let dateDisplay = document.getElementById("date-display");
        dateDisplay.textContent = "TODAY IS " + new Date().toLocaleDateString();

        //update birthday
        document.getElementById('birthday').value = birthday;
    }
    /**
    * Called when you want to clear the horoscope on the main page
    */
    window.clearHoroscope = () => {
        let birthdayInput = document.getElementById('birthday');
        birthdayInput.value = '';
        
        let locationInput = document.getElementById('location');
        locationInput.value = '';
        
        //switch sign display text
        let signDisplay = document.getElementById("sign-display");
        signDisplay.textContent = "Find your Sign!";

        //switch sign display image
        let signImage = document.getElementById("sign-image");
        const forImage = "images/placeholder.png";
        signImage.src = forImage;
        
        let dateDisplay = document.getElementById("date-display");
        dateDisplay.textContent = "Today is " + new Date().toLocaleDateString();

        let fortuneElement = document.getElementById('horoscope-fortune')
        console.log(fortuneElement);
        fortuneElement.textContent = "Enter your birthday above and choose a category to see your daily horoscope!";
    }



    // Add event listener for the submit window
    submit.addEventListener('click', (event) => {
        //get birthday and location
        let birthday = document.getElementById('birthday').value;
        let location = document.getElementById('location').value;

        //make horoscope object
        let sign = dateToHoroscope(birthday);
        let horoscope = {birthday: birthday,
                        place: location,
                        sign: sign};

        setHoroscope(horoscope);
        categoryElement.dispatchEvent(new Event('change'));

        //save horoscope to local storage for sidebar
        var today = new Date();
        var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
        let horoscopeElement = new Horoscope(sign, birthday, time);
        saveHoroscope(horoscopeElement);
        // let storageHoroscopes =  JSON.parse(localStorage.getItem('horoscopes') || '[]');
        // storageHoroscopes.push(horoscopeElement);
        // localStorage.setItem('horoscopes', JSON.stringify(storageHoroscopes));
        // addHoroscopesToDocument([horoscopeElement]);
    })


    //create event listener for option change
    let categoryElement = document.getElementById('category');
    let fortuneElement = document.getElementById('horoscope-fortune');

    //add event listener for category change
    categoryElement.addEventListener('change',  (event) => {
        let promptDB;

        fetch('./json/horoResponses.json')
            .then(response => response.json())
            .then(data => {
                //parse json
                promptDB = JSON.parse(JSON.stringify(data));
                //console.log(promptDB);
                let date = document.getElementById('birthday').value;
                let sign = dateToHoroscope(date);
                let horoscopeprompt = promptDB[sign][event.target.value];
                let selectedPrompt = horoscopeprompt[Math.floor((Math.random() * horoscopeprompt.length)%horoscopeprompt.length)];
                fortuneElement.textContent = selectedPrompt;
                //console.log(selectedPrompt);
            })
            .catch(error => console.error('Error:', error));        
    });

    //clear page when user clicks new horoscope
    let newHoroscopeButton = document.getElementById('new-horo');
    newHoroscopeButton.addEventListener('click', (event => {
        window.clearHoroscope();
    }));
}
