# 0006-Camel Case Naming

Status: accepted <br>
Date: 2023-05-20 <br>
Deciders: Merrick Qiu, Abhimanyu Srivastava, Alex Tahan, Joseph Del Val, Vivin Vinil, Julia Poon, Jacob Felts, Yuantian Zhou, Leo Lee, Andrew Onozuka <br>
Consulted: Internet <br>

## Context and Problem Statement

In order to make the code more readable and consistent among the team, we need to decide on a variable naming system. These options are based on the ones Prof. Powell suggested and mentioned in class.

## Decision Drivers

* Consistent code style
* Code readability

## Considered Options

* Camel Case
* Snake Case
* Hungarian Case

## Decision Outcome

Chosen option: "Camel Case", because
people are most familiar with it and it is easier to read.

### Consequences

* Good, because it is easy to read and can be easily enforced.
* Neutral, because system functions share the same naming convention, so differentiating between the two may be slightly more difficult.

## More Information

This style is enforced by ESLint.
