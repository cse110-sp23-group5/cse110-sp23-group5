window.addEventListener('DOMContentLoaded', init);
function init() {
    let submit = document.getElementById('submit');

    // date to horoscope
    function date_to_horoscope(dateString) {
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

    submit.addEventListener('click', function() {
        //get birthday and location
        let birthday = document.getElementById('birthday').value;
        let location = document.getElementById('location').value;

        //make horoscope object
        let horoscope = {date: birthday,
                        place: location};
        let sign = date_to_horoscope(horoscope.date);
        horoscope.sign = sign;

        //switch sign display text
        let sign_display = document.getElementById("sign-display");
        sign_display.textContent = "Your sign is: " + sign;

        //switch sign display image
        let sign_image = document.getElementById("sign-image");
        const forImage = "images/Horoscopes/" + sign + ".png";
        sign_image.src = forImage;
        
        let date_display = document.getElementById("date-display");
        date_display.textContent = "TODAY IS " + new Date().toLocaleDateString();
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
                let sign = date_to_horoscope(date);
                let horoscopeprompt = promptDB[sign][event.target.value];
                let selectedPrompt = horoscopeprompt[Math.floor((Math.random() * horoscopeprompt.length)%horoscopeprompt.length)];
                fortuneElement.textContent = selectedPrompt;
                //console.log(selectedPrompt);
            })
            .catch(error => console.error('Error:', error));        
    });
}