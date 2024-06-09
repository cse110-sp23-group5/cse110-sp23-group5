import { Horoscope, saveHoroscope } from "./history.js";
import {dateToHoroscope} from "./horoscope.js";

const COMPATIBILITY_PAGE = 'compatibility.html';
const HISTORY_PAGE = 'history.html';
const COMPATIBILITYNAMES = ['Aries + Libra','Taurus + Scorpio','Gemini + Sagittarius','Cancer + Capricorn','Leo + Aquarius','Virgo + Pisces'];


window.addEventListener('DOMContentLoaded', init);

async function init() {
    // initialization of elements relevant to fortunePage.html
    let save = document.getElementById('save-compatibility');
    let redo = document.getElementById('redo-compatibility');
    let fortuneElement = document.getElementById('horoscope-fortune');
    let backgroundVideo=document.getElementById("bgvideo");
    let fortuneElementTitle = document.getElementById('horoscope-title');

    // begin horoscope animation upon opening site
    let date1 = localStorage.getItem('birthday1');
    let date2 = localStorage.getItem('birthday2');


    if (backgroundVideo) {
        backgroundVideo.setAttribute("src","https://github.com/ZhouYuantian/CSE110-Storge/raw/main/"+dateToHoroscope(date1)+".mp4");
    }

    if (document.getElementById("output")) {
        startMove(document.getElementById("output"));
    }

    // get and load in the fortune as well as the sign
    if (fortuneElement) {
        fortuneElement.innerText = await getPromptCompability();
        fortuneElementTitle.innerText = datesToHoroscope(date1, date2);
    }

// no need to save these results
    // Add event listener for the save button
    if (save) {
        save.addEventListener('click', async () => {
            let date1 = localStorage.getItem('birthday1');
            let date2 = localStorage.getItem('birthday2');

            let sign = datesToHoroscope(date1, date2);
            let category = "Compatibility";
            let message = fortuneElement.innerText;
            let today = new Date();
            
            //save horoscope to local storage for sidebar
            let horoscopeElement = new Horoscope(sign, date1,today, message, category);
            saveHoroscope(horoscopeElement);
            window.location.href = HISTORY_PAGE;
        })
    }

    // Add event listener for the redo button
    if (redo) {
        redo.addEventListener('click', async () => {
            window.location.href = COMPATIBILITY_PAGE;
        }) 
    }

    // function that parses the birthday and retreives the fortune from the json file
    async function getPromptCompability() {
        let promptDB;

        return new Promise(async (resolve, reject) => {
            await fetch('../json/compatibilityResponses.json')
            .then(response => response.json())
            .then(data => {
                //parse json
                promptDB = JSON.parse(JSON.stringify(data));
                let date1 = localStorage.getItem('birthday1');
                let date2 = localStorage.getItem('birthday2');
                let sign = 'Default'
                let sign1 = datesToHoroscope(date1, date2);
                let sign2 = datesToHoroscope(date2, date1);
                //if the sign is not in the list, use the default incompatible response
                if (COMPATIBILITYNAMES.includes(sign1)) {
                    sign = sign1;
                }
                else if (COMPATIBILITYNAMES.includes(sign2)) {
                    sign = sign2;
                }
                let horoscopeprompt = promptDB[sign];
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
    return dateToHoroscope(dateString1) + " + " + dateToHoroscope(dateString2);
} 