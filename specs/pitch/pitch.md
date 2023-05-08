# Project Pitch: Horoscope App

## CSE 110 | PowellPoint Pundits (Team 5)

### Statement of Purpose
Our goal is to build a horoscope app that is accessible, enjoyable, easy to use, and helps users receive reassurance and information about themselves.  

### Problem
- Boredom
  - ex. As someone looking to fill their time and escape boredom, I’d like to have a fun app that allows me to entertain myself.
- Confusion about self
  - ex. As someone who wants to know more about myself, I want to engage with information that might tell me more about who I am.
- Uncertainty about the Future
  - ex. As someone anxious about my life, I want to have guidance as to what my future might hold.
- Loneliness
  - ex. As a lonely person, I want to connect with other people about their beliefs and interests.

### User Personas
- People looking for simple, quick, easy-to-access entertainment
  - teens/young adults; ex: bored in class and want a distraction
- People who are interested in learning more about themselves
  - Again, targets teens/young adults who may be seeking to understand themselves and find explanations for certain qualities they have
- People who are uncertain about the future
  - Young people are very anxious nowadays and have a lot on their mind
- People who feel lonely
  - Technology and COVID have isolated young people from each other and crave connection
  - Teens/young adults are likely to feel that they don’t “fit in,” may be looking for something to tell them they belong to a group or collective (Ex: You are an Aries, all Aries share these qualities with you)

### Problem Definition (Appetite)
- We are constrained by the time limits of our course, so we would need to develop everything by the end of the quarter.
- Ideally, it would take us no more than 5 weeks to implement our idea.
  - We should aim to get a working product first before implementing more complicated features.
- 5 weeks is a short time; so the project we come up with will be limited
  - Might not be able to incorporate all details in horoscopes
  - Accessories like background graphics, music, etc may not be a priority
  - Limit in the variety of “predictions” we can tell
  - Limit in how personalized app can be

### Solution
Our solution is to make a horoscope app that solves the previously mentioned problems:
- Boredom
  - Provide an engaging interface and interesting information
- Confusion about self
  - Have content tailored to the user, via their inputted birth date/time/location
- Uncertainty
  - Write content with certainty and reassurance
- Loneliness
  - Tell users their sign, allowing them to find others with the same sign.

### Features
- Input birth information
- Gives you predictions in one or more categories of your life
- Different prediction based on personal horoscope.
- Daily Horoscopes that change
- (Illusion of) Calculations to create prediction 
- Minimalistic UI

### Wireframe
See ![wireframe](specs/interface/wireframes/wireframes.png)

### Technical Details
Inputs: user information (birthday, birth location, etc.), category selection
Outputs: Text paragraph explaining user’s signs + a prediction based on that sign. We can start with a yearly or monthly prediction; and develop towards weekly/daily predictions if time allows.

### Additional Features
To be added in incremental updates:
- Remember user data (accounts/login) to prevent users from having to re-input information every time
- Generate daily horoscopes (as opposed to monthly or yearly)
- Option to read out the horoscopes (audio)

### Rabbit Holes
- Birth time and birth location: depending on the time we have available, we don’t want to spend too much on this portion. There’s no way to create personalized content for all locations and times, so we may incorporate more locations + times if we can, but it is not a priority.
  - One solution is to separate locations by continents/regions rather than cities
- Variety of outputs/predictions
  - Doesn’t have to be too serious, can generate simple predictions from a small library of possible predictions; don’t need to have a huge variety

### No Gos
- Avoid taking in information that isn’t related to birth
- Avoid adding compatibility predictions between users: it would require not only the storage of user profiles but also comparison between an undefined amount of possible combinations, finding an API or putting in the work to make this feature is not as important as making a clean and perfectly functioning web app.
- Don’t overwhelm users with information: the purpose of the app is meant to be something light and easily accessible. Our app's target audience is not necessarily people who want to know all of the specfic variety of sub signs that accompany each.
  - Stick to sun sign (and perhaps basic overview of moon, rising)
  - No need to get into twelve signs, house information, interpreting the entire star chart, etc.
