import axios from 'axios';
import * as cheerio from 'cheerio';
import { CurrencyHandler } from './common/classes';
import { TopLevelDomain, ShopClient, errors, Currency, CurrencyType, ShopOffer } from './common/types';
// When looking for books this seems to be the reliable selector to get a price :)
const BOOKS_PRICE_SELECTOR = '.s-item__price';
const BOOKS_LINK_SELECTOR = '.s-item__link';
class EbayClient implements ShopClient {
  private baseURL = 'https://www.ebay.de/sch/i.html?_nkw=';
  private currencyHandler = new CurrencyHandler();
  private currency: CurrencyType = this.currencyHandler.getCurrencyObject(Currency.EURO_GER);
  private currencyIdentifier = this.currency.shortHand;

  setTopLevelDomain = (toplevelDomain: TopLevelDomain) => {
    this.baseURL = `https://www.ebay${toplevelDomain}/sch/i.html?_nkw=`;
  };

  getCurrency = (): CurrencyType => {
    return this.currency;
  };

  setCurrency = (targetCurrency: Currency): void => {
    this.currency = this.currencyHandler.getCurrencyObject(targetCurrency);
    this.setTopLevelDomain(this.currency.topLevelDomain);
    this.currencyIdentifier = this.currency.shortHand;
  };

  getBookPriceByISBN = async (ISBN: string): Promise<ShopOffer> => {
    const URL = this.baseURL + ISBN;
    try {
      const response = await axios.get(URL);
      const price = this.getPriceFromBody(response.data);
      return price;
    } catch (error) {
      throw new errors.connectionError('Ebay');
    }
  };

  getPriceFromBody = (body: string): ShopOffer => {
    const $ = cheerio.load(body);
    const resultElement = $('#srp-river-results');
    // Get the price <span> element from Ebay
    let price = resultElement.find(BOOKS_PRICE_SELECTOR).first().text();
    // Create an array of the Ebay Prices, they are seperated by the Currency Identifier, then take the first one
    price = price.trim().split(this.currencyIdentifier)[1];
    // Replace , with . for european notation so that the price can be parsed to float
    price = price.replace(',', '.');
    let directlink = resultElement.find(BOOKS_LINK_SELECTOR).first().attr('href');
    if (directlink === undefined) directlink = 'no direct link found';
    // Return the first element of the Array
    return { currency: this.currencyIdentifier, price: parseFloat(price), directLink: directlink };
  };
}

export default EbayClient;
