import axios from 'axios';
import * as cheerio from 'cheerio';
import { CurrencyHandler } from './common/classes';
import { TopLevelDomain, ShopClient, Currency, ShopOffer, CurrencyType, errors } from './common/types';

// When looking for books this seems to be the reliable selector to get a price :)
const BOOKS_PRICE_SELECTOR = '.a-color-price';
class AmazonClient implements ShopClient {
  private baseURL: string = 'https://amazon.de/dp/';
  private currencyHandler = new CurrencyHandler();
  private currency: CurrencyType = this.currencyHandler.getCurrencyObject(Currency.EURO_GER);
  private isbnString: string = '';

  setTopLevelDomain = (toplevelDomain: TopLevelDomain) => {
    this.baseURL = `https://amazon${toplevelDomain}/dp/`;
  };

  getCurrency = (): CurrencyType => {
    return this.currency;
  };

  setCurrency = (targetCurrency: Currency) => {
    this.currency = this.currencyHandler.getCurrencyObject(targetCurrency);
    this.setTopLevelDomain(this.currency.topLevelDomain);
  };

  getBookPriceByISBN = async (ISBN: string): Promise<ShopOffer> => {
    this.isbnString = ISBN;
    const URL = this.baseURL + ISBN;
    try {
      const response = await axios.get(URL);
      const price = this.getPriceFromBody(response.data);
      return price;
    } catch (error) {
      throw new errors.connectionError('Amazon');
    }
  };

  getPriceFromBody = (body: string): ShopOffer => {
    const $ = cheerio.load(body);
    // Selecting the price by the Amazon Price Class
    let price = $(BOOKS_PRICE_SELECTOR).text();
    // Removing the Currency Symbols and whitespaces
    price = price.trim().replace(this.currency.symbol, '');
    // Replace , with . for european notation so that the price can be parsed to float
    price = price.replace(',', '.');
    return { currency: this.currency.symbol, price: parseFloat(price), directLink: this.baseURL + this.isbnString };
  };
}

export default AmazonClient;
