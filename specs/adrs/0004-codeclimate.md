# 0004-codeclimate

Status: Accepted <br>
Date: 2023-05-21 <br>
Deciders: Merrick Qiu <br>
Consulted: None <br>
Informed: The rest of team through slack 

## Context and Problem Statement

In our CI/CD pipeline we need something that can automatically check whether the code quality is good before each pull request.
Automating our code quality checks is good because it reduces the time it takes to manually check code and it is less error prone.

<!-- This is an optional element. Feel free to remove. -->
## Decision Drivers

* Cost(should be free)
* Customizable
* Integrated with Github

## Considered Options

* Codeclimate
* Codeacy

## Decision Outcome

Chosen option: "Codeclimate", because
Codeclimate is customizable, free(for open source), and has a github app.
Although Codeacy was also an option, codeclimate is more well-established and reputable.
Codeclimate thus has more options for customization and integration than Codeacy
