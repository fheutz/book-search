import { AmazonClient, EbayClient, ISBNClient, ThaliaClient } from '.';
import { Currency, ShopOffer, errors, ShopClients } from './common/types';

export class Pricechecker {
  amazonClient = new AmazonClient();
  ebayClient = new EbayClient();
  isbnClient = new ISBNClient();
  thaliaClient = new ThaliaClient();

  setCurrency = (currency: Currency) => {
    this.ebayClient.setCurrency(currency);
    this.amazonClient.setCurrency(currency);
  };

  comparePricesByBookTitle = async (title: string): Promise<ShopOffer[]> => {
    if (title === '') throw new errors.inputError();
    const isbnResult = await this.isbnClient.getFirstISBNByTitle(title);
    const isbn = isbnResult.isbn[0].identifier;
    const bookPrices: ShopOffer[] = [];

    try {
      const ebayPrice = await this.ebayClient.getBookPriceByISBN(isbn);
      bookPrices.push(ebayPrice);
    } catch (error) {
      // We want to have those errors none blocking here, so we are just logging them for now
      console.log(error)
    }
    try {
      const amazonPrice = await this.amazonClient.getBookPriceByISBN(isbn);
      bookPrices.push(amazonPrice);
    } catch (error) {
      // We want to have those errors none blocking here, so we are just logging them for now
      console.log(error)
    }
    try {
      const thaliaPrice = await this.thaliaClient.getBookPriceByISBN(isbn);
      bookPrices.push(thaliaPrice);
    } catch (error) {
      // We want to have those errors none blocking here, so we are just logging them for now
      console.log(error)
    }
    return bookPrices;
  };

  getBestPriceByBookTitle = async (title: string): Promise<ShopOffer> => {
    if (title === '') throw new errors.inputError();
    const shopOffers = await this.comparePricesByBookTitle(title);
    let bestPrice: ShopOffer = shopOffers[0];
    shopOffers.map((offer) => {
      if (offer.price < bestPrice.price) bestPrice = offer;
    });
    return bestPrice;
  };
}
