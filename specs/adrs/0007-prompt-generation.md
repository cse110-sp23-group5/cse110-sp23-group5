# 0007- Prompt Generation Final 

Status: {accepted} <br>
Date: {2002-06-02} when the decision was last updated} <br>
Deciders: Merrick Qiu, Alex Tahan, Vivin Vinil, Andrew Onozuka, Julia Poon, Leo Lee, Abhi Shrivastava <br>
Consulted: Entire Team, Internet <br>
Informed: Entire team

## Context and Problem Statement

In order to maximise user experience as well as maintain dependabiltity we needed to decide how to generate prompts. 


## Decision Drivers

* Dependabililty of prompts 
* Appropriateness of responses and control over user experience
* Execution complexity and time investemnt for devs

## Considered Options

* External API 
* Local JSON database
## Decision Outcome

Chosen option: Local JSON database, because it ensures we are in control of the prompts and we are not liable for third party code that is poorly designed. Moreover, after many dry runs reappearance of prompts is extremely rare and will not affect user experience. 

### Consequences

* Good, because our team will have a lot more time to work on other features and does not have to deal with the complexities of using third party code. 
* Bad, because we have to generate a large number of these prompts manually. 

## Validation

Manual Testing by various devs on the team to certify quality of prompts as well as ensure low chance of repetition.

## More Information

We spent a large time working on the JSON database and are quite comfortable with its working. We have also streamlined the process for our responses and can provide a postive user experience without taking on the added risk of using third party API's. 