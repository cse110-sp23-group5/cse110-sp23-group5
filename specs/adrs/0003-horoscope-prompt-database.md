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

Chosen option: "Json File", because it serves the purpose best.

### Consequences

* Good

<!-- This is an optional element. Feel free to remove. -->
## Validation

{describe how the implementation of/compliance with the ADR is validated. E.g., by a review or an ArchUnit test}

<!-- This is an optional element. Feel free to remove. -->
## Pros and Cons of the Options

### {title of option 1}

<!-- This is an optional element. Feel free to remove. -->
{example | description | pointer to more information | …}

* Good, because {argument a}
* Good, because {argument b}
<!-- use "neutral" if the given argument weights neither for good nor bad -->
* Neutral, because {argument c}
* Bad, because {argument d}
* … <!-- numbers of pros and cons can vary -->

### {title of other option}

{example | description | pointer to more information | …}

* Good, because {argument a}
* Good, because {argument b}
* Neutral, because {argument c}
* Bad, because {argument d}
* …

<!-- This is an optional element. Feel free to remove. -->
## More Information

{You might want to provide additional evidence/confidence for the decision outcome here and/or
 document the team agreement on the decision and/or
 define when this decision when and how the decision should be realized and if/when it should be re-visited and/or
 how the decision is validated.
 Links to other decisions and resources might here appear as well.}
