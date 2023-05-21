// math.test.js

// Import the math functions
const { add, subtract, multiply, divide } = require('./math');

// Test the add function
test('add function should correctly add two numbers', () => {
  expect(add(2, 3)).toBe(5);
  expect(add(0, 0)).toBe(0);
  expect(add(-5, 5)).toBe(0);
});

// Test the subtract function
test('subtract function should correctly subtract two numbers', () => {
  expect(subtract(5, 3)).toBe(2);
  expect(subtract(0, 0)).toBe(0);
  expect(subtract(-5, 5)).toBe(-10);
});

// Test the multiply function
test('multiply function should correctly multiply two numbers', () => {
  expect(multiply(2, 3)).toBe(6);
  expect(multiply(0, 5)).toBe(0);
  expect(multiply(-5, -5)).toBe(25);
});

// Test the divide function
test('divide function should correctly divide two numbers', () => {
  expect(divide(6, 2)).toBe(3);
  expect(divide(0, 5)).toBe(0);
  expect(() => divide(10, 0)).toThrow('Division by zero is not allowed');
});
