import { simpleCalculator, Action } from './index';

describe('simpleCalculator (table tests)', () => {
  const testCases = [
    { a: 1, b: 2, action: Action.Add, expected: 3 },
    { a: 5, b: 3, action: Action.Subtract, expected: 2 },
    { a: 2, b: 4, action: Action.Multiply, expected: 8 },
    { a: 10, b: 2, action: Action.Divide, expected: 5 },
    { a: 3, b: 2, action: Action.Exponentiate, expected: 9 },
    { a: 'invalid', b: 2, action: Action.Add, expected: null },
    { a: 1, b: 2, action: 'wrong', expected: null },
  ] as const;

  test.each(testCases)(
    'calculates $a $action $b = $expected',
    ({ a, b, action, expected }) => {
      expect(simpleCalculator({ a, b, action })).toBe(expected);
    },
  );
});
