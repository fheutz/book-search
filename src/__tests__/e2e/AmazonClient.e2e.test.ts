import {AmazonClient} from '../../AmazonClient';
import { Currency, TopLevelDomain } from '../../common/types';

const amazonClient = new AmazonClient();
const ULTRALEARNINGISBN = '006285268X';
describe('Amazon Client tests against Amazon', () => {
  it('Returns an € price when currency is set to Euro; It Contains a directlink for the amazon.de tld', async () => {
    let shopOffer = await amazonClient.getBookPriceByISBN(ULTRALEARNINGISBN);
    expect(shopOffer.currency).toContain('€');
    expect(shopOffer.directLink).toContain('https://amazon.de');
  });
  it('returns a $ price when setting currency to dollar; It Contains a directlink for the amazon.com tld', async () => {
    amazonClient.setCurrency(Currency.DOLLAR);
    let shopOffer = await amazonClient.getBookPriceByISBN(ULTRALEARNINGISBN);
    expect(shopOffer.currency).toContain('$');
    expect(shopOffer.directLink).toContain('https://amazon.com');
  });
});
