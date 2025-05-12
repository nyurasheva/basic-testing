import {
  throwError,
  throwCustomError,
  resolveValue,
  MyAwesomeError,
  rejectCustomError,
} from './index';

describe('resolveValue', () => {
  test('should resolve provided value', async () => {
    const numberRef = 42;
    const stringRef = 'test';
    const nullRef = null;
    const undefinedRef = undefined;

    await expect(resolveValue(numberRef)).resolves.toBe(numberRef);
    await expect(resolveValue(stringRef)).resolves.toBe(stringRef);
    await expect(resolveValue(nullRef)).resolves.toBeNull();
    await expect(resolveValue(undefinedRef)).resolves.toBeUndefined();
  });
});

describe('throwError', () => {
  test('should throw error with provided message', () => {
    const customMessage = 'Custom message';
    expect(() => throwError(customMessage)).toThrow(customMessage);
  });

  test('should throw error with default message if message is not provided', () => {
    const defaultMessage = 'Oops!';
    expect(() => throwError()).toThrow(defaultMessage);
  });
});

describe('throwCustomError', () => {
  test('should throw custom error', () => {
    expect(() => throwCustomError()).toThrow(MyAwesomeError);
    expect(() => throwCustomError()).toThrow(
      'This is my awesome custom error!',
    );
  });
});

describe('rejectCustomError', () => {
  test('should reject custom error', async () => {
    await expect(rejectCustomError()).rejects.toThrow(MyAwesomeError);
    await expect(rejectCustomError()).rejects.toThrow(
      'This is my awesome custom error!',
    );
  });
});
