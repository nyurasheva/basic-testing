import lodash from 'lodash';
import {
  getBankAccount,
  BankAccount,
  InsufficientFundsError,
  TransferFailedError,
  SynchronizationFailedError,
} from '.';

const initialBalance = 50;
let currentBankAccount: BankAccount;

describe('BankAccount', () => {
  beforeEach(() => {
    currentBankAccount = getBankAccount(initialBalance);
    jest.spyOn(lodash, 'random').mockReturnValueOnce(50);
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  test('should create account with initial balance', () => {
    expect(currentBankAccount.getBalance()).toBe(initialBalance);
  });

  test('should throw InsufficientFundsError error when withdrawing more than balance', () => {
    expect(() => currentBankAccount.withdraw(initialBalance * 2)).toThrow(
      InsufficientFundsError,
    );
  });

  test('should throw error when transferring more than balance', () => {
    expect(() => {
      const anotherAccount = getBankAccount(0);
      currentBankAccount.transfer(initialBalance * 2, anotherAccount);
    }).toThrow(InsufficientFundsError);
  });

  test('should throw error when transferring to the same account', () => {
    expect(() =>
      currentBankAccount.transfer(initialBalance / 2, currentBankAccount),
    ).toThrow(TransferFailedError);
  });

  test('should deposit money', () => {
    const newDeposit = 100;
    currentBankAccount.deposit(newDeposit);
    const newBalance = currentBankAccount.getBalance();
    expect(newBalance).toBe(initialBalance + newDeposit);
  });

  test('should withdraw money', () => {
    const newWithdrawal = initialBalance / 2;
    currentBankAccount.withdraw(newWithdrawal);
    const newBalance = currentBankAccount.getBalance();
    expect(newBalance).toBe(initialBalance - newWithdrawal);
  });

  test('should transfer money', () => {
    const newTransfer = initialBalance / 10;
    const anotherAccount = getBankAccount(0);
    currentBankAccount.transfer(newTransfer, anotherAccount);
    const newBalance = currentBankAccount.getBalance();
    expect(newBalance).toBe(initialBalance - newTransfer);
    const anotherAccountBalance = anotherAccount.getBalance();
    expect(anotherAccountBalance).toBe(newTransfer);
  });

  test('fetchBalance should return number in case if request did not failed', async () => {
    const fakeRandom1 = 50;

    jest.spyOn(lodash, 'random').mockReturnValueOnce(fakeRandom1);

    const fetchedBalance = await currentBankAccount.fetchBalance();
    expect(fetchedBalance).toBe(fakeRandom1);
  });

  test('should set new balance if fetchBalance returned number', async () => {
    const fakeFetchedBalance = 20;
    jest
      .spyOn(currentBankAccount, 'fetchBalance')
      .mockResolvedValue(fakeFetchedBalance);
    await currentBankAccount.synchronizeBalance();
    const newBalance = currentBankAccount.getBalance();
    expect(newBalance).toBe(fakeFetchedBalance);
  });

  test('should throw SynchronizationFailedError if fetchBalance returned null', async () => {
    jest.spyOn(currentBankAccount, 'fetchBalance').mockResolvedValue(null);
    await expect(currentBankAccount.synchronizeBalance()).rejects.toThrow(
      SynchronizationFailedError,
    );
  });
});
