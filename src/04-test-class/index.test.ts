import {
  getBankAccount,
  InsufficientFundsError,
  TransferFailedError,
  SynchronizationFailedError,
  BankAccount,
} from './index';

describe('BankAccount', () => {
  test('should create account with initial balance', () => {
    const acc = getBankAccount(100);
    expect(acc.getBalance()).toBe(100);
  });

  test('should throw InsufficientFundsError error when withdrawing more than balance', () => {
    const acc = getBankAccount(50);
    expect(() => acc.withdraw(60)).toThrow(InsufficientFundsError);
  });

  test('should throw error when transferring more than balance', () => {
    const acc1 = getBankAccount(50);
    const acc2 = getBankAccount(0);
    expect(() => acc1.transfer(100, acc2)).toThrow(InsufficientFundsError);
  });

  test('should throw error when transferring to the same account', () => {
    const acc = getBankAccount(50);
    expect(() => acc.transfer(10, acc)).toThrow(TransferFailedError);
  });

  test('should deposit money', () => {
    const acc = getBankAccount(100);
    acc.deposit(50);
    expect(acc.getBalance()).toBe(150);
  });

  test('should withdraw money', () => {
    const acc = getBankAccount(100);
    acc.withdraw(40);
    expect(acc.getBalance()).toBe(60);
  });

  test('should transfer money', () => {
    const acc1 = getBankAccount(100);
    const acc2 = getBankAccount(0);
    acc1.transfer(50, acc2);
    expect(acc1.getBalance()).toBe(50);
    expect(acc2.getBalance()).toBe(50);
  });

  test('fetchBalance should return number if request did not fail', async () => {
    const acc = getBankAccount(0);
    const spy = jest
      .spyOn(BankAccount.prototype, 'fetchBalance')
      .mockResolvedValue(42);
    const result = await acc.fetchBalance();
    expect(result).toBe(42);
    spy.mockRestore();
  });

  test('should set new balance if fetchBalance returned number', async () => {
    const acc = getBankAccount(0);
    jest.spyOn(BankAccount.prototype, 'fetchBalance').mockResolvedValue(77);
    await acc.synchronizeBalance();
    expect(acc.getBalance()).toBe(77);
  });

  test('should throw SynchronizationFailedError if fetchBalance returned null', async () => {
    const acc = getBankAccount(0);
    jest.spyOn(BankAccount.prototype, 'fetchBalance').mockResolvedValue(null);
    await expect(acc.synchronizeBalance()).rejects.toThrow(
      SynchronizationFailedError,
    );
  });
});
