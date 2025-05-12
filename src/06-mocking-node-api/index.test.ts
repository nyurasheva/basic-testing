import { readFileAsynchronously, doStuffByTimeout, doStuffByInterval } from '.';
import { join } from 'path';
import * as fs from 'fs';
import * as fsPromises from 'fs/promises';

jest.mock('fs');
jest.mock('fs/promises');
jest.mock('path');

describe('doStuffByTimeout', () => {
  const timeout = 1000;

  beforeAll(() => {
    jest.useFakeTimers();
  });

  afterAll(() => {
    jest.useRealTimers();
  });

  beforeEach(() => {
    jest.spyOn(global, 'setTimeout');
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test('should set timeout with provided callback and timeout', () => {
    const callback = jest.fn();

    doStuffByTimeout(callback, timeout);

    expect(setTimeout).toHaveBeenCalledWith(callback, timeout);
  });

  test('should call callback only after timeout', () => {
    const callback = jest.fn();

    doStuffByTimeout(callback, timeout);

    expect(callback).not.toBeCalled();

    jest.advanceTimersByTime(timeout);

    expect(callback).toBeCalledTimes(1);
  });
});

describe('doStuffByInterval', () => {
  const interval = 1000;

  beforeAll(() => {
    jest.useFakeTimers();
  });

  afterAll(() => {
    jest.useRealTimers();
  });

  beforeEach(() => {
    jest.spyOn(global, 'setInterval');
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test('should set interval with provided callback and timeout', () => {
    const callback = jest.fn();

    doStuffByInterval(callback, interval);

    expect(setInterval).toHaveBeenCalledWith(callback, interval);
  });

  test('should call callback multiple times after multiple intervals', () => {
    const callback = jest.fn();

    doStuffByInterval(callback, interval);

    const callCount = 3;
    jest.advanceTimersByTime(interval * callCount);

    expect(callback).toHaveBeenCalledTimes(callCount);
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
    const fileText = 'Hello, World!';

    (fs.existsSync as jest.Mock).mockReturnValue(true);
    (fsPromises.readFile as jest.Mock).mockResolvedValue(fileText);

    const result = await readFileAsynchronously(fakePath);

    expect(result).toBe(fileText);
  });
});
