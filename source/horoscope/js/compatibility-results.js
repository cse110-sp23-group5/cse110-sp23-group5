import { Horoscope, saveHoroscope } from "./history.js";
import {dateToHoroscope} from "./horoscope.js";

const COMPATIBILITY_PAGE = 'compatibility.html';
const LANDING_PAGE = 'landing.html';
const HISTORY_PAGE = 'history.html';
const SIGNNAMES = ['Aries+Libra','Taurus+Scorpio','Gemini+Sagittarius','Cancer+Capricorn','Leo+Aquarius','Virgo+Pisces'];


window.addEventListener('DOMContentLoaded', init);

async function init() {
    // initialization of elements relevant to fortunePage.html
    let save = document.getElementById('save');
    let redo = document.getElementById('redo');
    let fortuneElement = document.getElementById('horoscope-fortune');
    let backgroundVideo=document.getElementById("bgvideo");
    let fortuneElementTitle = document.getElementById('horoscope-title');

    // begin horoscope animation upon opening site
    let date = localStorage.getItem('birthday');
    let date1 = localStorage.getItem('birthday1');
    let date2 = localStorage.getItem('birthday2');


    if (backgroundVideo) {
        backgroundVideo.setAttribute("src","https://github.com/ZhouYuantian/CSE110-Storge/raw/main/"+dateToHoroscope(date)+".mp4");
    }

    if (document.getElementById("output")) {
        startMove(document.getElementById("output"));
    }

    // get and load in the fortune as well as the sign
    if (fortuneElement) {
        fortuneElement.innerText = await getPrompt();
        fortuneElementTitle.innerText = datesToHoroscope(date1, date2);
    }

// no need to save these results
    // Add event listener for the save button
    // if (save) {
    //     save.addEventListener('click', async () => {
    //         let bday = localStorage.getItem('birthday');
    //         let sign = dateToHoroscope(bday);
    //         let category = localStorage.getItem('category');
    //         let message = fortuneElement.innerText;
    //         let today = new Date();
            
    //         //save horoscope to local storage for sidebar
    //         let horoscopeElement = new Horoscope(sign, bday, today, message, category);
    //         saveHoroscope(horoscopeElement);
    //         window.location.href = HISTORY_PAGE;
    //     })
    // }

    // Add event listener for the redo button
    if (redo) {
        redo.addEventListener('click', async () => {
            window.location.href = COMPATIBILITY_PAGE;
        }) 
    }

    // function that parses the birthday and retreives the fortune from the json file
    async function getPrompt() {
        let promptDB;

        return new Promise(async (resolve, reject) => {
            await fetch('../json/compatibility-responses.json')
            .then(response => response.json())
            .then(data => {
                //parse json
                console.log("data");
                console.log(data);
                promptDB = JSON.parse(JSON.stringify(data));
                console.log(promptDB)
                let date1 = localStorage.getItem('birthday1');
                let date2 = localStorage.getItem('birthday2');
                let sign = datesToHoroscope(date1, date2);
                let horoscopeprompt = promptDB[sign];
                // let selectedPrompt = horoscopeprompt[Math.floor((Math.random() * horoscopeprompt.length)%horoscopeprompt.length)];
                resolve(horoscopeprompt);
            })
            .catch(error => {
                console.error('Error:', error);
                reject(error);
            });  
        });
    }

}

/**
 * Called when you want to clear the horoscope on the main page
 */
function clearHoroscope() {

    let fortuneElement = document.getElementById('horoscope-fortune')
    fortuneElement.textContent = "Enter your birthday above and choose a category to see your daily horoscope!";
    
    let fortuneElementTitle = document.getElementById('horoscope-title');
    fortuneElementTitle.textContent = "Your Horoscope";
}

/**
 * Animates the opacity of a given element to fade in.
 * @param {HTMLElement} oDiv The element to animate
 */
function startMove(oDiv) {
    let alpha = 0;
    var timer = null;
    clearInterval(timer);
    timer = setInterval(function(){
        var speed = 1;               
        if(alpha == 100) {
            return;
        } else {
            alpha += speed;       
            oDiv.style.opacity = alpha/100; 
        }
    }, 30);
}

/**
     * Determines horoscope sign based on birthday
     * @param {string} dateString1 string representation of the date in form YYYY-MM-DD
     * @param {string} dateString2 string representation of the date in form YYYY-MM-DD
     * @returns combined name of the zodiac signs of the two dates
     */
function datesToHoroscope(dateString1, dateString2) {
    return dateToHoroscope(dateString1) + "+" + dateToHoroscope(dateString2);
} 

export {datesToHoroscope, clearHoroscope}