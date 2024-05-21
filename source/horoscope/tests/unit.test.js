/**
 * @jest-environment jsdom
 */

//Unit tests for formatDynamicDate
const { formatDynamicDate } = require('../js/pastEntryCard.js');

describe('formatDynamicDate', () => {
  // Test case for a date within one minute
  test('should return "Just now" for a date within one minute', () => {
    const now = new Date();
    const date = new Date(now - 30 * 1000); // 30 seconds ago
    const result = formatDynamicDate(date);
    expect(result).toBe('Now');
  });

  // Test case for a date within one hour
  test('should return the minutes ago for a date within one hour', () => {
    const now = new Date();
    const date = new Date(now - 45 * 60 * 1000); // 45 minutes ago
    const result = formatDynamicDate(date);
    expect(result).toBe('45 min ago');
  });

  // Test case for a date within one day
  test('should return the hours ago for a date within one day', () => {
    const now = new Date();
    const date = new Date(now - 6 * 60 * 60 * 1000); // 6 hours ago
    const result = formatDynamicDate(date);
    expect(result).toBe('6 hours ago');
  });

  // Test case for yesterday's date
  test('should return "Yesterday" for yesterday\'s date', () => {
    const now = new Date();
    const date = new Date(now - 24 * 60 * 60 * 1000); // 1 day ago
    const result = formatDynamicDate(date);
    expect(result).toBe('Yesterday');
  });

  // Test case for a date within one week (other than yesterday)
  test('should return the full weekday name for a date within one week (other than yesterday)', () => {
    const now = new Date();
    const date = new Date(now - 3 * 24 * 60 * 60 * 1000); // 3 days ago
    const result = formatDynamicDate(date);
    const weekday = date.toLocaleDateString(undefined, { weekday: 'long' });
    expect(result).toBe(weekday);
  });

  // Test case for a date older than one week
  test('should return the full formatted date for a date older than one week', () => {
    const date = new Date('2023-05-01');
    const result = formatDynamicDate(date);
    const expected = date.toLocaleDateString(undefined, {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
    expect(result).toBe(expected);
  });
});


const { makeCounter } = require('../js/history.js');

describe('makeCounter', () => {
  it('should return a function that increments and returns the next number each time it is called', () => {
    const counter = makeCounter(0);

    expect(counter()).toEqual(1);
    expect(counter()).toEqual(2);
    expect(counter()).toEqual(3);
  });

  it('should increment from the provided starting number', () => {
    const counter = makeCounter(5);

    expect(counter()).toEqual(6);
    expect(counter()).toEqual(7);
    expect(counter()).toEqual(8);
  });
});

const { dateToHoroscope } = require('../js/horoscope.js');

describe('dateToHoroscope', () => {
  it('should return the correct zodiac sign for a given date within the range', () => {
    const sign = dateToHoroscope('1990-07-23');
    expect(sign).toEqual('Leo');
  });

  it('should return the correct zodiac sign when the date crosses the new year', () => {
    const sign = dateToHoroscope('2000-01-01');
    expect(sign).toEqual('Capricorn');
  });

  it('should return "NO SIGN FOUND" when no matching sign is found', () => {
    const sign = dateToHoroscope('2023-12-32');
    expect(sign).toEqual('NO SIGN FOUND');
  });

  it('should return the correct zodiac sign when the date is at the boundary of a sign', () => {
    const sign = dateToHoroscope('1999-12-21');
    expect(sign).toEqual('Sagittarius');
  });

  it('should handle leap years correctly', () => {
    const sign = dateToHoroscope('2000-02-29');
    expect(sign).toEqual('Pisces');
  });

  it('should handle invalid date strings gracefully', () => {
    const sign = dateToHoroscope('invalidDate');
    expect(sign).toEqual('NO SIGN FOUND');
  });
});


const { saveHoroscope } = require('../js/history.js');

// Mock localStorage
const localStorageMock = (() => {
  let store = {};
  return {
    getItem: key => store[key],
    setItem: (key, value) => {
      store[key] = value.toString();
    },
    clear: () => {
      store = {};
    }
  };
})();

// Mock the localStorage object
Object.defineProperty(window, 'localStorage', {
  value: localStorageMock
});

// Mock document.body.innerHTML
document.body.innerHTML = `
  <div id="saved-list"></div>
`;

// Test cases
describe('saveHoroscope function', () => {

  test('should save a new horoscope', () => {

    let today = new Date();
    // Define a mock horoscope object
    const horoscope = {
      id: 1,
      sign: 'Aries',
      birthday: 'March 21 - April 19',
      date: today.setHours(0,0,0,0),
      message: 'Some message',
      category: 'General'
    };

    // Call the saveHoroscope function
    saveHoroscope(horoscope);

    // Retrieve the saved horoscopes from localStorage
    const savedHoroscopes = JSON.parse(localStorage.getItem('horoscopes'));

    // Expect the savedHoroscopes array to contain the mock horoscope
    expect(savedHoroscopes).toContainEqual(horoscope);
  });

  

  test('should not save a duplicate horoscope', () => {

    let today = new Date();
    // Define a mock horoscope object
    const horoscope = {
      id: 1,
      sign: 'Aries',
      birthday: 'March 21 - April 19',
      date: today.setHours(0,0,0,0),
      message: 'Some message',
      category: 'General'
    };

    // Save the mock horoscope twice
    saveHoroscope(horoscope);
    saveHoroscope(horoscope);

    // Retrieve the saved horoscopes from localStorage
    const savedHoroscopes = JSON.parse(localStorage.getItem('horoscopes'));

    // Expect only one instance of the mock horoscope to be saved
    expect(savedHoroscopes.length).toBe(1);
  });
});