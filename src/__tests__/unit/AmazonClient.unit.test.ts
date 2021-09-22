import {AmazonClient} from '../../AmazonClient';
import axios from 'axios';
import { Currency, TopLevelDomain } from '../../common/types';
import { CurrencyHandler } from '../../common/classes';

const amazonClient = new AmazonClient();
const currencyHandler = new CurrencyHandler();
const ULTRALEARNINGISBN = '006285268X';
const EUR_HTML_BODY = '<html><span class="a-color-price">12,90€<span></html>';
const DOLLAR_HTML_BODY = '<html><span class="a-color-price">$12,90<span></html>';

afterEach(() => jest.clearAllMocks());
describe('MOCK: Amazon Client tests with mocks', () => {
  it('Throws an error when you cannot fetch from Amazon', async () => {
    jest.mock('axios');
    axios.get = jest.fn().mockImplementationOnce(() => new Error('Generic Error'));
    expect(amazonClient.getBookPriceByISBN(ULTRALEARNINGISBN)).resolves.toThrowError();
  });

  it('Returns a Price in € for a book', async () => {
    jest.mock('axios');
    // Need to wrap the HTML String in a axios like return Object otherwise it will fail.
    const axiosReturnObject = { data: EUR_HTML_BODY };
    axios.get = jest.fn().mockImplementationOnce(() => new Promise((resolve) => resolve(axiosReturnObject)));
    const shopOffer = await amazonClient.getBookPriceByISBN(ULTRALEARNINGISBN);
    expect(shopOffer.price).toBe(12.9);
    expect(shopOffer.currency).toBe('€');
  });

  it('Sets the Currency Correctly', () => {
    amazonClient.setCurrency(Currency.DOLLAR);
    expect(amazonClient.getCurrency()).toMatchObject(currencyHandler.DOLLAR);
    amazonClient.setCurrency(Currency.EURO_GER);
    expect(amazonClient.getCurrency()).toMatchObject(currencyHandler.EURO_GER);
  });

  it('gets the € Price from a HTML Body', () => {
    amazonClient.setCurrency(Currency.EURO_GER);
    const shopOffer = amazonClient.getPriceFromBody(EUR_HTML_BODY);
    expect(shopOffer.price).toBe(12.9);
    expect(shopOffer.currency).toBe('€');
  });

  it('gets the $ Price from a HTML Body', () => {
    amazonClient.setCurrency(Currency.DOLLAR);
    const shopOffer = amazonClient.getPriceFromBody(DOLLAR_HTML_BODY);
    expect(shopOffer.price).toBe(12.9);
    expect(shopOffer.currency).toBe('$');
  });
});
