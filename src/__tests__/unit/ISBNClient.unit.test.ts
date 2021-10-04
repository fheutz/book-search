import {ISBNClient} from '../../ISBNClient';
import axios from 'axios';

// Initiating the ISBN Client
const isbnClient = new ISBNClient();
// Generic Google ISBN Search Response For testing
const GOOGLE_RESPONSE = {
  items: [
    {
      volumeInfo: {
        title: 'CoolBook',
        industryIdentifiers: [{ type: 'isbn10', identifier: 'testISBN' }],
      },
    },
    {
      volumeInfo: {
        title: 'CoolBook2',
        industryIdentifiers: [{ type: 'isbn10', identifier: 'testISBN2' }],
      },
    },
  ],
};

const VALID_ISBN = '006285268X';
const VALID_ISBN_HYPENATED = '978-0-06-285268-7';
const INVALID_ISBN = 'alksdfjlaskdjflkj';

describe('ISBN Client tests with Mocks', () => {
  jest.mock('axios');
  it('throws an error if we get invalid Feedback from Google', async () => {
    axios.get = jest.fn().mockImplementationOnce(() => new Error('Generic Failure'));
    // We need to wait for the promise to resolve to get the error
    expect(isbnClient.getISBNByTitle('doesnt matter')).rejects.toThrow(Error);
  });

  it('gets a single ISBN for a title', async () => {
    axios.get = jest.fn().mockImplementationOnce(() => new Promise((resolve) => resolve({ data: GOOGLE_RESPONSE })));
    const isbnResult = await isbnClient.getFirstISBNByTitle('CoolBook');
    expect(isbnResult.isbn[0].identifier).toBe(GOOGLE_RESPONSE.items[0].volumeInfo.industryIdentifiers[0].identifier);
    expect(isbnResult.title).toBe('CoolBook');
  });

  it('gets a list of ISBN for a title', async () => {
    axios.get = jest.fn().mockImplementationOnce(() => new Promise((resolve) => resolve({ data: GOOGLE_RESPONSE })));
    const isbnResult = await isbnClient.getISBNByTitle('CoolBook');
    expect(isbnResult.length).toBe(2);
    expect(isbnResult[0].title).toBe('CoolBook');
    expect(isbnResult[1].title).toBe('CoolBook2');
  });

  it('validates and Hypenates a valid ISBN', () => {
    const validatedISBN = isbnClient.validateAndHyphenateIsbn(VALID_ISBN);
    expect(validatedISBN).toBe(VALID_ISBN_HYPENATED);
  });
  it('throws an Error for Invalid ISBN', () => {
    expect(isbnClient.validateAndHyphenateIsbn(INVALID_ISBN)).toBe(null);
  });
  it('thows an Errow when looking up an empty string', () => {
    expect(isbnClient.getISBNByTitle('')).rejects.toThrow();
  });
});
