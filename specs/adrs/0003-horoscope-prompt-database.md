# ADR-0003 Horoscope Prompt Database

Status: Accepted <br>
Date: 2023-05-18 <br>
Deciders: Abhimanyu Srivastava <br>
Consulted: Merrick Qiu <br>
Informed: Andrew Onozuka, Alex Tahan, Joseph Del Val, Vivin Vinil, Julia Poon, Jacob Felts, Yuantian Zhou, Leo Lee

## Context and Problem Statement

We decided to store our prompts in the form of JSON files. This allows us to not be reliant on external APIs (see [ADR-0002 Extrenal API Integration](0002-external-api-integration.md)). The next step is to figure out the generation of the various responses and come up with unique answers.


## Considered Options

* JSON file, uses key value pairs, allows for a tree type structure for data storage.
* Java script object, Can model what we require.

## Decision Outcome

Chosen option: "Json File", because it serves the purpose best. We will be saving pre-generated sentences(strings) that will be prompted to give unique answers to user input. JSON does exactly that, saving data and objects as text in one file.

<!-- This is an optional element. Feel free to remove. -->
## More Information

There are no significant pros and cons in our application for choosing one or the other, as the only thing we need is save the promts to be able to "calculate" horoscope without the need for external APIs or data. Only that JSON file is simpler way that we can save these sentences into. However, if we were trying to generate individual responses everytime new input is given by the user, using Java Script Object might have been more applicable as we would need to create various functions to mix and match different outcomes. 
