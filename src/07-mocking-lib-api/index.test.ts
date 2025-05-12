import axios from 'axios';
import { throttledGetDataFromApi } from './index';

jest.mock('axios');

const mockedAxios = jest.mocked(axios, { shallow: false });
const BASE_URL = 'https://jsonplaceholder.typicode.com';
const successResponseData = {
  data: 'Fake Data',
  status: 200,
  statusText: 'OK',
  headers: {},
  config: {},
  request: {},
};
const urlPath = 'nonExistingPath';

describe('throttledGetDataFromApi', () => {
  beforeAll(() => {
    jest.useFakeTimers();
  });

  afterAll(() => {
    jest.restoreAllMocks();
    jest.useRealTimers();
  });

  beforeEach(() => {
    mockedAxios.create.mockReturnThis();
    mockedAxios.get.mockResolvedValue(successResponseData);
  });

  afterEach(() => {
    jest.runAllTimers();
  });

  test('should create instance with provided base url', async () => {
    await throttledGetDataFromApi(urlPath);
    expect(mockedAxios.create).toHaveBeenCalledWith({
      baseURL: BASE_URL,
    });
  });

  test('should perform request to correct provided url', async () => {
    await throttledGetDataFromApi(urlPath);
    expect(mockedAxios.get).toHaveBeenCalledWith(urlPath);
  });

  test('should return response data', async () => {
    const result = await throttledGetDataFromApi(urlPath);
    expect(result).toBe(successResponseData.data);
  });

  test('should handle axios error correctly', async () => {
    const errorMessage = 'Request failed';
    mockedAxios.get.mockRejectedValueOnce(new Error(errorMessage));

    await expect(throttledGetDataFromApi(urlPath)).rejects.toThrow(
      errorMessage,
    );
  });
});
