import {ThaliaClient} from '../../ThaliaClient';
import { Currency, TopLevelDomain } from '../../common/types';

const thaliaClient = new ThaliaClient();
const ULTRALEARNINGISBN = '006285268X';
describe('Amazon Client tests against Amazon', () => {
  it('Returns an € price when currency is set to Euro; It Contains a directlink for the amazon.de tld', async () => {
    let shopOffer = await thaliaClient.getBookPriceByISBN(ULTRALEARNINGISBN);
    console.log(shopOffer)
    expect(shopOffer.currency).toContain('€');
    expect(shopOffer.directLink).toContain('https://www.thalia.de');
  });
});
