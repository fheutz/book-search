import ISBNClient from '../../ISBNClient';
const isbnClient = new ISBNClient();
import { IsbnResult } from '../../common/types';
describe('ISBN Client tests without mocks', () => {
  it('finds the ISBN for Ultralearning', async () => {
    let response: IsbnResult = await isbnClient.getFirstISBNByTitle('Ultralearning');
    expect(response.title).toBe('Ultralearning');
    expect(response.isbn[0].identifier).toBe('006285268X');
    expect(response.isbn[1].identifier).toBe('9780062852687');
  });

  it('finds a list of Books containing Ultralearning', async () => {
    let response: IsbnResult[] = await isbnClient.getISBNByTitle('Ultralearning');
    let ultralearning: IsbnResult = {
      title: 'Ultralearning',
      isbn: [
        { identifier: '006285268X', type: 'ISBN_10' },
        { identifier: '9780062852687', type: 'ISBN_13' },
      ],
    };
    expect(response).toContainEqual(ultralearning);
  });
});
