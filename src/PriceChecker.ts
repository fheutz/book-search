import { AmazonClient, EbayClient, ISBNClient } from '.';
import { Currency, ShopOffer, errors } from './common/types';

class Pricechecker {
  amazonClient = new AmazonClient();
  ebayClient = new EbayClient();
  isbnClient = new ISBNClient();

  setCurrency = (currency: Currency) => {
    this.ebayClient.setCurrency(currency);
    this.amazonClient.setCurrency(currency);
  };

  comparePricesByBookTitle = async (title: string): Promise<ShopOffer[]> => {
    if (title === '') throw new errors.inputError();
    const isbnResult = await this.isbnClient.getFirstISBNByTitle(title);
    const isbn = isbnResult.isbn[0].identifier;
    const bookPrices: ShopOffer[] = [];
    const ebayPrice = await this.ebayClient.getBookPriceByISBN(isbn);
    bookPrices.push(ebayPrice);
    const amazonPrice = await this.amazonClient.getBookPriceByISBN(isbn);
    bookPrices.push(amazonPrice);
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

export default Pricechecker;
