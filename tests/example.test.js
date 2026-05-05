import { describe, it, expect, beforeEach } from 'vitest';

/**
 * Example Test Suite
 * 
 * This demonstrates how to write tests for your components and functions.
 * Place all test files in the tests/ directory with .test.js extension.
 */

// Example component/function to test
class Calculator {
  add(a, b) {
    return a + b;
  }

  subtract(a, b) {
    return a - b;
  }

  multiply(a, b) {
    return a * b;
  }

  divide(a, b) {
    if (b === 0) {
      throw new Error('Division by zero');
    }
    return a / b;
  }
}

// Tests
describe('Calculator', () => {
  let calculator;

  beforeEach(() => {
    calculator = new Calculator();
  });

  describe('add', () => {
    it('should add two positive numbers', () => {
      const result = calculator.add(2, 3);
      expect(result).toBe(5);
    });

    it('should add negative numbers', () => {
      const result = calculator.add(-2, -3);
      expect(result).toBe(-5);
    });

    it('should handle zero', () => {
      const result = calculator.add(0, 5);
      expect(result).toBe(5);
    });
  });

  describe('subtract', () => {
    it('should subtract two numbers', () => {
      const result = calculator.subtract(5, 3);
      expect(result).toBe(2);
    });

    it('should return negative when subtracting larger number', () => {
      const result = calculator.subtract(3, 5);
      expect(result).toBe(-2);
    });
  });

  describe('multiply', () => {
    it('should multiply two numbers', () => {
      const result = calculator.multiply(4, 5);
      expect(result).toBe(20);
    });

    it('should return zero when multiplying by zero', () => {
      const result = calculator.multiply(5, 0);
      expect(result).toBe(0);
    });
  });

  describe('divide', () => {
    it('should divide two numbers', () => {
      const result = calculator.divide(10, 2);
      expect(result).toBe(5);
    });

    it('should throw error when dividing by zero', () => {
      expect(() => calculator.divide(10, 0)).toThrow('Division by zero');
    });
  });
});
