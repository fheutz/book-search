import { AmazonClient, EbayClient, ISBNClient, Pricechecker, Currency } from '../..';
import { CurrencyHandler } from '../../common/classes';
import { IsbnResult, ShopOffer } from '../../common/types';

// Initiating the Clients
const pricechecker = new Pricechecker();
const currencyHandler = new CurrencyHandler();

// Setup the Mock in File would
// TODO: Setting up mocks in __mock__ directory
describe('Unit Tests: PriceChecker', () => {
  it('changes currency for all clients', async () => {
    pricechecker.setCurrency(Currency.DOLLAR);
    expect(pricechecker.ebayClient.getCurrency()).toMatchObject(currencyHandler.DOLLAR);
    pricechecker.setCurrency(Currency.EURO_GER);
    expect(pricechecker.ebayClient.getCurrency()).toMatchObject(currencyHandler.EURO_GER);
  });
});
describe('Unit Tests: PriceChecker with mocks', () => {
  jest.mock('../../EbayClient');
  jest.mock('../../AmazonClient');
  jest.mock('../../ISBNClient');
  jest.mock('../../ThaliaClient');
  const mockEbayOffer: Promise<ShopOffer> = new Promise((resolve) =>
    resolve({ currency: '€', directLink: 'testlink', price: 12.5 }),
  );
  const mockAmazonOffer: Promise<ShopOffer> = new Promise((resolve) =>
    resolve({ currency: '€', directLink: 'testlink', price: 11.5 }),
  );
  const mockThaliaOffer: Promise<ShopOffer> = new Promise((resolve) =>
  resolve({ currency: '€', directLink: 'testlink', price: 14.5 }),
);
  const mockISBNResponse: Promise<IsbnResult> = new Promise((resolve) =>
    resolve({ title: 'CoolBook', isbn: [{ type: 'isbn10', identifier: 'testISBN' }] }),
  );
  pricechecker.ebayClient.getBookPriceByISBN = jest.fn().mockImplementation(async () => mockEbayOffer);
  pricechecker.amazonClient.getBookPriceByISBN = jest.fn().mockImplementation(async () => mockAmazonOffer);
  pricechecker.thaliaClient.getBookPriceByISBN = jest.fn().mockImplementation(async () => mockThaliaOffer);
  pricechecker.isbnClient.getFirstISBNByTitle = jest.fn().mockImplementation(async () => mockISBNResponse);

  it('returns the best price', async () => {
    const bestOffer = await pricechecker.getBestPriceByBookTitle('doesnt matter');
    const rightOffer = await mockAmazonOffer;
    expect(bestOffer).toBe(rightOffer);
  });

  it('returns a list of prices', async () => {
    const offerList = await pricechecker.comparePricesByBookTitle('doesnt matter');
    expect(offerList.length).toBe(3);
  });

  it('throws an error when looking up an empty string', async () => {
    expect(pricechecker.comparePricesByBookTitle('')).resolves.toThrowError();
    expect(pricechecker.getBestPriceByBookTitle('')).resolves.toThrowError();
  });
});
