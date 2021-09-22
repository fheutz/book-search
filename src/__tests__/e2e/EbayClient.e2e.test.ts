import {EbayClient} from '../../EbayClient';
import { Currency } from '../../common/types';

const ebayClient = new EbayClient();
const ULTRALEARNINGISBN = '006285268X';
describe('Ebay Webscraper Client against Ebay.de', () => {
  it('Gets a price from ebay for the Ultralearning book.', async () => {
    const price = await ebayClient.getBookPriceByISBN(ULTRALEARNINGISBN);
    expect(price.currency).toBe('EUR');
  });
  it('Returns a book price in $', async () => {
    ebayClient.setCurrency(Currency.DOLLAR);
    const price = await ebayClient.getBookPriceByISBN(ULTRALEARNINGISBN);
    expect(price.currency).toBe('$');
  });
});
