import { Currency, CurrencyType, TopLevelDomain } from './types';

export class CurrencyHandler {
  public EURO_GER: CurrencyType = { symbol: '€', topLevelDomain: TopLevelDomain.DE, shortHand: 'EUR' };
  public DOLLAR: CurrencyType = { symbol: '$', topLevelDomain: TopLevelDomain.US, shortHand: '$' };

  /**Get a Currency Object for a certain Currency
   *
   */
  public getCurrencyObject = (currency: Currency): CurrencyType => {
    switch (currency) {
      case Currency.EURO_GER:
        return this.EURO_GER;
        break;
      case Currency.DOLLAR:
        return this.DOLLAR;
        break;
      default:
        throw new Error('No matching Currency Object found for ' + currency);
        break;
    }
  };
}
