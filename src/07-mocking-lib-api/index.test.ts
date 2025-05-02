import axios from 'axios';
import { throttledGetDataFromApi } from './index';

jest.mock('lodash', () => ({
  throttle: <T extends (...args: unknown[]) => unknown>(fn: T): T => fn,
}));

describe('throttledGetDataFromApi', () => {
  const mockGet = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();

    (axios.create as jest.Mock) = jest.fn(() => ({
      get: mockGet,
    }));
  });

  test('should create instance with provided base url', async () => {
    mockGet.mockResolvedValue({ data: {} });

    await throttledGetDataFromApi('/posts');

    expect(axios.create).toHaveBeenCalledWith({
      baseURL: 'https://jsonplaceholder.typicode.com',
    });
  });

  test('should perform request to correct provided url', async () => {
    mockGet.mockResolvedValue({ data: 'fake data' });

    await throttledGetDataFromApi('/posts');

    expect(mockGet).toHaveBeenCalledWith('/posts');
  });

  test('should return response data', async () => {
    mockGet.mockResolvedValue({ data: { title: 'Test Title' } });

    const result = await throttledGetDataFromApi('/posts');

    expect(result).toEqual({ title: 'Test Title' });
  });
});
