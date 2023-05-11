window.addEventListener('DOMContentLoaded', init);

function init() {
    let submit = document.getElementById('submit');

    // date to horoscope
    function date_to_horoscope(d) {
        //split, take month and day
        const dateArray = d.split('-');
        let month = parseInt(dateArray[1]);
        let day = parseInt(dateArray[2]);
        let sign = "Capricorn";

        // Is there a better way to do this?
        if (((month == 12) && (day<22)) || ((month==11) && (day>21))){
            sign = "Sagittarius";
        } else if (((month == 11) && (day<22)) || ((month==10) && (day>22))){
            sign = "Scorpio"; 
        } else if (((month == 10) && (day<23)) || ((month==9) && (day>22))){
            sign = "Libra";
        } else if (((month == 9) && (day<23)) || ((month==8) && (day>22))){
            sign = "Virgo";
        } else if (((month == 8) && (day<23)) || ((month==7) && (day>22))){
            sign = "Leo";
        } else if (((month == 7) && (day<23)) || ((month==6) && (day>20))){
            sign = "Cancer";
        } else if (((month == 6) && (day<21)) || ((month==5) && (day>20))){
            sign = "Gemini";
        } else if (((month == 5) && (day<21)) || ((month==4) && (day>19))){
            sign = "Taurus";
        } else if (((month == 4) && (day<20)) || ((month==3) && (day>20))){
            sign = "Aries";
        } else if (((month == 3) && (day<21)) || ((month==2) && (day>18))){
            sign = "Pisces";
        } else if (((month == 2) && (day<19)) || ((month==1) && (day>19))){
            sign = "Aquarius";
        }
        return sign;
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

    })
}