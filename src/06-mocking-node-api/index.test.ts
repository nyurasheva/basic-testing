import { readFileAsynchronously, doStuffByTimeout, doStuffByInterval } from '.';
import { join } from 'path';
import * as fs from 'fs';
import * as fsPromises from 'fs/promises';

jest.mock('fs');
jest.mock('fs/promises');
jest.mock('path');
describe('doStuffByTimeout', () => {
  beforeAll(() => {
    jest.useFakeTimers();
  });

  beforeEach(() => {
    jest.spyOn(global, 'setTimeout');
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  afterAll(() => {
    jest.useRealTimers();
  });

  test('should set timeout with provided callback and timeout', () => {
    const cb = jest.fn();

    doStuffByTimeout(cb, 1000);

    expect(setTimeout).toHaveBeenCalledWith(cb, 1000);
  });

  test('should call callback only after timeout', () => {
    const cb = jest.fn();

    doStuffByTimeout(cb, 2000);

    expect(cb).not.toBeCalled();

    jest.advanceTimersByTime(2000);

    expect(cb).toBeCalledTimes(1);
  });
});

describe('doStuffByInterval', () => {
  beforeAll(() => {
    jest.useFakeTimers();
  });

  beforeEach(() => {
    jest.spyOn(global, 'setInterval');
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  afterAll(() => {
    jest.useRealTimers();
  });

  test('should set interval with provided callback and timeout', () => {
    const cb = jest.fn();

    doStuffByInterval(cb, 1500);

    expect(setInterval).toHaveBeenCalledWith(cb, 1500);
  });

  test('should call callback multiple times after multiple intervals', () => {
    const cb = jest.fn();

    doStuffByInterval(cb, 1000);

    jest.advanceTimersByTime(3000);

    expect(cb).toHaveBeenCalledTimes(3);
  });
});

describe('readFileAsynchronously', () => {
  const fakePath = 'some/file.txt';
  const fullPath = '/absolute/path/to/file.txt';

  beforeEach(() => {
    jest.clearAllMocks();
    (join as jest.Mock).mockReturnValue(fullPath);
  });

  test('should call join with pathToFile', async () => {
    (fs.existsSync as jest.Mock).mockReturnValue(false);

    await readFileAsynchronously(fakePath);

    expect(join).toHaveBeenCalledWith(__dirname, fakePath);
  });

  test('should return null if file does not exist', async () => {
    (fs.existsSync as jest.Mock).mockReturnValue(false);

    const result = await readFileAsynchronously(fakePath);

    expect(result).toBeNull();
  });

  test('should return file content if file exists', async () => {
    (fs.existsSync as jest.Mock).mockReturnValue(true);
    (fsPromises.readFile as jest.Mock).mockResolvedValue(
      Buffer.from('Hello, World!'),
    );

    const result = await readFileAsynchronously(fakePath);

    expect(result).toBe('Hello, World!');
  });
});
