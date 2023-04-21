# magic8ball.html
The html page contains a header, a text input, a submit button, and an output paragraph.
The "question-input" id indicates to the javascript to use the text in the input
as the prompt being asked to the magic 8 ball.
The "answer" id indicates that the output answer should be displayed in that paragraph element.

# magic8ball.css
The css file changes the color scheme to dark mode and makes the website itself look like an 8-ball.
It also changes the font to arial, since times new roman is ugly.

# magic8ball.js
Responses is an array that contains the responses.
The loadresponses() function loads the responses from the json file into the responses array.
The getAnswer() function chooses a random response from the responses array after
it has been loaded and changes the internal html of the answer element to contain the answer.

# responses.json
This is a json that contains the responses the 8 ball can give.