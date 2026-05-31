import { getBillingIntervalLabel } from './billing-label.util';

describe('getBillingIntervalLabel', () => {
  it('should return "Каждый день" for daily with interval 1', () => {
    expect(getBillingIntervalLabel('daily', 1)).toBe('Каждый день');
  });

  it('should return "Каждую неделю" for weekly with interval 1', () => {
    expect(getBillingIntervalLabel('weekly', 1)).toBe('Каждую неделю');
  });

  it('should return "Каждый месяц" for monthly with interval 1', () => {
    expect(getBillingIntervalLabel('monthly', 1)).toBe('Каждый месяц');
  });

  it('should return "Каждый год" for yearly with interval 1', () => {
    expect(getBillingIntervalLabel('yearly', 1)).toBe('Каждый год');
  });

  it('should return plural for daily interval 2', () => {
    expect(getBillingIntervalLabel('daily', 2)).toBe('Каждые 2 дня');
  });

  it('should return plural for daily interval 5', () => {
    expect(getBillingIntervalLabel('daily', 5)).toBe('Каждые 5 дней');
  });

  it('should return plural for monthly interval 3', () => {
    expect(getBillingIntervalLabel('monthly', 3)).toBe('Каждые 3 месяца');
  });

  it('should return plural for monthly interval 6', () => {
    expect(getBillingIntervalLabel('monthly', 6)).toBe('Каждые 6 месяцев');
  });

  it('should return plural for weekly interval 2', () => {
    expect(getBillingIntervalLabel('weekly', 2)).toBe('Каждые 2 недели');
  });

  it('should return plural for yearly interval 3', () => {
    expect(getBillingIntervalLabel('yearly', 3)).toBe('Каждые 3 года');
  });

  it('should return plural for yearly interval 10', () => {
    expect(getBillingIntervalLabel('yearly', 10)).toBe('Каждые 10 лет');
  });
});
