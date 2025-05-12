import { generateLinkedList } from './index';

describe('generateLinkedList', () => {
  const input1 = [1, 2, 3];
  const expectedResult1 = {
    value: 1,
    next: {
      value: 2,
      next: {
        value: 3,
        next: {
          value: null,
          next: null,
        },
      },
    },
  };

  const input2 = ['a', 'b'];
  const expectedResult2 = {
    value: 'a',
    next: {
      value: 'b',
      next: {
        value: null,
        next: null,
      },
    },
  };

  test('should generate linked list from values 1', () => {
    const result = generateLinkedList(input1);
    expect(result).toStrictEqual(expectedResult1);
  });

  test('should generate linked list from values 2', () => {
    const result = generateLinkedList(input2);
    expect(result).toStrictEqual(expectedResult2);
  });
});
