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