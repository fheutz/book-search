import EbayClient from '../../EbayClient';
import axios from 'axios';
import { Currency } from '../../common/types';
import { CurrencyHandler } from '../../common/classes';

const ebayClient = new EbayClient();
const currencyHandler = new CurrencyHandler();
const ULTRALEARNINGISBN = '006285268X';

// Mock HTML Bodys contain Prices and a testlink
const EUR_HTML_BODY =
  '<html><div id="srp-river-results"><span class="s-item__price">EUR 12,90<span><a href="testlink" class="s-item__link"/></div></html>';
const DOLLAR_HTML_BODY =
  '<html><div id="srp-river-results"><span class="s-item__price">$12,90<span><a href="testlink" class="s-item__link"/></div></html>';
const DOLLAR_HTML_BODY_NO_DIRECTLINK =
  '<html><div id="srp-river-results"><span class="s-item__price">$12,90<span></div></html>';

afterEach(() => jest.clearAllMocks());
describe('Unit Tests: ebay Client tests with mocks', () => {
  it('Throws an error when you cannot fetch from ebay', async () => {
    jest.mock('axios');
    axios.get = jest.fn().mockImplementationOnce(() => new Error('Generic Error'));
    expect(ebayClient.getBookPriceByISBN(ULTRALEARNINGISBN)).resolves.toThrowError();
  });

  it('Returns a Price in € for a book', async () => {
    jest.mock('axios');
    // Need to wrap the HTML String in a axios like return Object otherwise it will fail.
    const axiosReturnObject = { data: EUR_HTML_BODY };
    axios.get = jest.fn().mockImplementationOnce(() => new Promise((resolve) => resolve(axiosReturnObject)));
    const shopOffer = await ebayClient.getBookPriceByISBN(ULTRALEARNINGISBN);
    expect(shopOffer.price).toBe(12.9);
    expect(shopOffer.currency).toBe('EUR');
  });

  it('Sets the Currency Correctly', () => {
    ebayClient.setCurrency(Currency.DOLLAR);
    expect(ebayClient.getCurrency()).toMatchObject(currencyHandler.DOLLAR);
    ebayClient.setCurrency(Currency.EURO_GER);
    expect(ebayClient.getCurrency()).toMatchObject(currencyHandler.EURO_GER);
  });

  it('gets the € Price from a HTML Body', () => {
    ebayClient.setCurrency(Currency.EURO_GER);
    const shopOffer = ebayClient.getPriceFromBody(EUR_HTML_BODY);
    expect(shopOffer.price).toBe(12.9);
    expect(shopOffer.currency).toBe('EUR');
  });

  it('gets the $ Price from a HTML Body', () => {
    ebayClient.setCurrency(Currency.DOLLAR);
    const shopOffer = ebayClient.getPriceFromBody(DOLLAR_HTML_BODY);
    expect(shopOffer.price).toBe(12.9);
    expect(shopOffer.currency).toBe('$');
  });

  it('doesnt find a direct Link', () => {
    ebayClient.setCurrency(Currency.DOLLAR);
    const shopOffer = ebayClient.getPriceFromBody(DOLLAR_HTML_BODY_NO_DIRECTLINK);
    expect(shopOffer.directLink).toBe('no direct link found');
  });
});
