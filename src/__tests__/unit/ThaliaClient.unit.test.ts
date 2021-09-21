import ThaliaClient from '../../ThaliaClient';
import axios from 'axios';
import { Currency } from '../../common/types';
import { CurrencyHandler } from '../../common/classes';

const thaliaClient = new ThaliaClient();
const currencyHandler = new CurrencyHandler();
const ULTRALEARNINGISBN = '006285268X';
const EUR_HTML_BODY = '<html><span class="preis">12,90 €<span></html>';

afterEach(() => jest.clearAllMocks());
describe('MOCK: Amazon Client tests with mocks', () => {
  it('Throws an error when you cannot fetch from Amazon', async () => {
    jest.mock('axios');
    axios.get = jest.fn().mockImplementationOnce(() => new Error('Generic Error'));
    expect(thaliaClient.getBookPriceByISBN(ULTRALEARNINGISBN)).resolves.toThrowError();
  });

  it('Returns a Price in € for a book', async () => {
    jest.mock('axios');
    // Need to wrap the HTML String in a axios like return Object otherwise it will fail.
    const axiosReturnObject = { data: EUR_HTML_BODY };
    axios.get = jest.fn().mockImplementationOnce(() => new Promise((resolve) => resolve(axiosReturnObject)));
    const shopOffer = await thaliaClient.getBookPriceByISBN(ULTRALEARNINGISBN);
    expect(shopOffer.price).toBe(12.9);
    expect(shopOffer.currency).toBe('€');
  });

  it('Sets the Currency Correctly', () => {
    thaliaClient.setCurrency(Currency.EURO_GER);
    expect(thaliaClient.getCurrency()).toMatchObject(currencyHandler.EURO_GER);
  });

  it('throws an Error when not setting to EURO_GER', () => {
    expect(() => thaliaClient.setCurrency(Currency.DOLLAR)).toThrow(Error);
  });

  it('gets the € Price from a HTML Body', () => {
    const shopOffer = thaliaClient.getPriceFromBody(EUR_HTML_BODY);
    expect(shopOffer.price).toBe(12.9);
    expect(shopOffer.currency).toBe('€');
  });

});
