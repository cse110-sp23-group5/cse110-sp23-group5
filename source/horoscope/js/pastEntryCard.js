
/**
 * Card displaying a past horoscope entry
 * 
 */
class pastEntryCard extends HTMLElement {
    constructor() {
        super();

        const shadow = this.attachShadow({ mode: "open" });

        const article = document.createElement('article');

        const style = document.createElement('link');
        style.setAttribute('rel', 'stylesheet');
        style.setAttribute('href', 'css/pastEntryCard.css');


        shadow.appendChild(style);
        shadow.appendChild(article);
    }

    /**
     * Called when the .data property is set on this element
     * 
     * @param {Horoscope} data - The data to pass into <past-entry-card>, 
     *                          of following format:
     *                          {
     *                              "imgSrc": "string",
     *                              "imgAlt": "string",
     *                              "sign": "string",
     *                              "birthday": "string",
     *                              "date": "string",
     *                          }
     */
    set data(data) {
        //if nothing passed, return
        if (!data) return;

        const article = this.shadowRoot.querySelector('article');
        console.log(data);

        /**
         * Display the image and name of the user's horoscope, 
         * as well as the birthday and date created, and a delete button
         */
        article.innerHTML = `
        <img class="horo" src="${data.imgSrc}"
            alt="${data.imgAlt}">
        <span class="sign">${data.sign}</span>
        <span class="birthday">${data.birthday}</span>
        <span class="date">${data.date}</span>
        <button class="delete" aria-label="Close alert" type="button">
            <span class="delete" aria-hidden="true">&#x2715;</span>         <!--Could also use &#10006;-->
        </button>
        `;
    }

    


}

customElements.define('past-entry-card', pastEntryCard);