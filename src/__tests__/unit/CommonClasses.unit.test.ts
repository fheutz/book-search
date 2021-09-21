import { CurrencyHandler } from '../../common/classes';
import { Currency, TopLevelDomain } from '../../common/types';

const currencyHandler = new CurrencyHandler();
describe('Unit Test Currency Handler', () => {
  it('returns correct Toplevel Domains', () => {
    expect(currencyHandler.getCurrencyObject(Currency.DOLLAR).topLevelDomain).toBe(TopLevelDomain.US);
    expect(currencyHandler.getCurrencyObject(Currency.EURO_GER).topLevelDomain).toBe(TopLevelDomain.DE);
  });
});
