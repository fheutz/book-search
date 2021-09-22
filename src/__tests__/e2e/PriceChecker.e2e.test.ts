import { Currency, ShopOffer } from '../../common/types';
import {Pricechecker} from '../../PriceChecker';

// Initialize Clients
const priceChecker = new Pricechecker();
describe('PriceChecker E2E testing for Euro', () => {
  it('Returns a list with offers', async () => {
    const prices: ShopOffer[] = await priceChecker.comparePricesByBookTitle('Ultralearning');
    expect(prices.length).toBe(2);
  });

  it('Returns a list with offers in $', async () => {
    priceChecker.setCurrency(Currency.DOLLAR);
    const prices: ShopOffer[] = await priceChecker.comparePricesByBookTitle('Ultralearning');
    expect(prices.length).toBe(2);
  });

  it('Returns the best offer with offers', async () => {
    const prices: ShopOffer[] = await priceChecker.comparePricesByBookTitle('Ultralearning');
    const bestPrice: ShopOffer = await priceChecker.getBestPriceByBookTitle('Ultralearning');
    prices.map((offer) => {
      expect(offer.price).toBeGreaterThanOrEqual(bestPrice.price);
    });
  });
});
