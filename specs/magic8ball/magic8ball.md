# magic8ball.html
The html page contains a header, a text input, a character select menu, a submit button with an audio element, and a div with the 8-ball elements.
The 8 ball itself contains the image and a paragraph element with the answers.
The elements are labeled with their respective ids so that the javascript file can select the appropriate element.

# magic8ball.css
The css file changes the color scheme to dark mode and makes the website itself look like an 8-ball.
It also changes the font to arial, since times new roman is ugly.
shake animation function, animates the shaking for 8-ball
# magic8ball.js
Responses is an array that contains the responses.
The loadresponses() function loads the responses from the json file into the responses array.
It takes in a string that represents the character to be loaded.
The getAnswer() function chooses a random response from the responses array for the loaded character
and changes the internal html of the answer element to contain the answer.
It plays audio and clears the screen before changing the response.
It also replies with "Please ask a question" if no question is asked.
The shakeBall() function adds a shaking animation to the 8-ball image for 750ms.

# responses.json
This is a json that contains the responses the 8 ball can give for each character.