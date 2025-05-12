import { simpleCalculator, Action } from './index';

const testCases = [
  { a: 1, b: 2, action: Action.Add, expected: 3 },
  { a: 2, b: 2, action: Action.Add, expected: 4 },
  { a: 3, b: 2, action: Action.Add, expected: 5 },
  { a: 1, b: 2, action: Action.Subtract, expected: -1 },
  { a: 2, b: 2, action: Action.Subtract, expected: 0 },
  { a: 3, b: 2, action: Action.Subtract, expected: 1 },
  { a: 1, b: 2, action: Action.Divide, expected: 0.5 },
  { a: 2, b: 2, action: Action.Divide, expected: 1 },
  { a: 3, b: 2, action: Action.Divide, expected: 1.5 },
  { a: 1, b: 2, action: Action.Multiply, expected: 2 },
  { a: 2, b: 2, action: Action.Multiply, expected: 4 },
  { a: 3, b: 2, action: Action.Multiply, expected: 6 },
  { a: 1, b: 2, action: Action.Exponentiate, expected: 1 },
  { a: 2, b: 2, action: Action.Exponentiate, expected: 4 },
  { a: 3, b: 2, action: Action.Exponentiate, expected: 9 },
  { a: 3, b: 3, action: Action.Exponentiate, expected: 27 },

  { a: -1, b: -2, action: Action.Add, expected: -3 },
  { a: -1, b: -2, action: Action.Subtract, expected: 1 },
  { a: -1, b: -2, action: Action.Multiply, expected: 2 },
  { a: -1, b: -2, action: Action.Divide, expected: 0.5 },
  { a: -1, b: -2, action: Action.Exponentiate, expected: 1 },

  { a: 1, b: 0, action: Action.Add, expected: 1 },
  { a: 1, b: 0, action: Action.Subtract, expected: 1 },
  { a: 1, b: 0, action: Action.Multiply, expected: 0 },
  { a: 1, b: 0, action: Action.Divide, expected: Infinity },
  { a: 1, b: 0, action: Action.Exponentiate, expected: 1 },

  { a: 555555, b: 444444, action: Action.Add, expected: 999999 },
  { a: 555555, b: 444444, action: Action.Subtract, expected: 111111 },
  { a: 555555, b: 444444, action: Action.Multiply, expected: 246913086420 },
  { a: 555555, b: 444444, action: Action.Divide, expected: 1.25 },
  { a: 555555, b: 444444, action: Action.Exponentiate, expected: Infinity },

  { a: -11, b: 11, action: Action.Add, expected: 0 },
  { a: -11, b: 11, action: Action.Subtract, expected: -22 },
  { a: -11, b: 11, action: Action.Multiply, expected: -121 },
  { a: -11, b: 11, action: Action.Divide, expected: -1 },
  { a: -11, b: 11, action: Action.Exponentiate, expected: -285311670611 },

  { a: 1, b: 2, action: 'Invalid', expected: null },
  { a: 1, b: 'str', action: Action.Add, expected: null },
  { a: 'str', b: 33, action: Action.Multiply, expected: null },
  { a: false, b: true, action: Action.Add, expected: null },
  { a: null, b: 2, action: Action.Add, expected: null },
  { a: 1, b: undefined, action: Action.Add, expected: null },
  { a: [], b: 2, action: Action.Add, expected: null },
  { a: {}, b: 2, action: Action.Add, expected: null },
];

describe('simpleCalculator', () => {
  test.each(testCases)(
    'calculates $a $action $b = $expected',
    ({ a, b, action, expected }) => {
      const result = simpleCalculator({ a, b, action });
      expect(result).toBe(expected);
    },
  );
});
