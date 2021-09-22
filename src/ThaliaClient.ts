import axios from 'axios';
import * as cheerio from 'cheerio';
import { CurrencyHandler } from './common/classes';
import { TopLevelDomain, ShopClient, Currency, ShopOffer, CurrencyType, errors } from './common/types';

// When looking for books this seems to be the reliable selector to get a price :)
const BOOKS_PRICE_SELECTOR = '.preis';
export class ThaliaClient implements ShopClient {
  private baseURL: string = 'https://www.thalia.de/suche?sq=';
  private currencyHandler = new CurrencyHandler();
  private currency: CurrencyType = this.currencyHandler.getCurrencyObject(Currency.EURO_GER);
  private isbnString: string = '';

  getCurrency = (): CurrencyType => {
    return this.currency;
  };

  setCurrency = (targetCurrency: Currency) => {
    if(targetCurrency != Currency.EURO_GER) {
        throw new Error('Thalia is a German only shop you cannot change currency')
    }
  };

  getBookPriceByISBN = async (ISBN: string): Promise<ShopOffer> => {
    this.isbnString = ISBN;
    const URL = this.baseURL + ISBN;
    try {
      const response = await axios.get(URL);
      const price = this.getPriceFromBody(response.data);
      return price;
    } catch (error) {
      throw new errors.connectionError('Thalia');
    }
  };

  getPriceFromBody = (body: string): ShopOffer => {
    const $ = cheerio.load(body);
    // Selecting the price by the Thalia Price Class
    let price = $(BOOKS_PRICE_SELECTOR).first().text();
    // Removing the Currency Symbols and whitespaces
    price = price.trim().replace('€', '');
    // Replace , with . for european notation so that the price can be parsed to float
    price = price.replace(',', '.');
    return { currency: '€', price: parseFloat(price), directLink: this.baseURL + this.isbnString };
  };
}
