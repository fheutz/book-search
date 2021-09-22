import axios from 'axios';
import { IsbnResult, IndustryIdentifiers, errors } from './common/types';
// This package has no Typescript declaration thus the require import statement
const ISBN = require('isbn3');

// This Type is used to Parse the google Books API Response
type GoogleResponseItem = {
  volumeInfo: {
    title: string;
    industryIdentifiers: IndustryIdentifiers[];
  };
};
const VOLUMESAPI = 'https://www.googleapis.com/books/v1/volumes';

/** Client to get ISBN numbers and validating them from GoogleBooks API */
export class ISBNClient {
  /**
   * @param  {string} title full title or keyword of the title
   * @returns a Promise<IsbnResult[]> returns a list of IsbnResults that match the title query terms
   */
  getISBNByTitle = async (bookTitle: string): Promise<IsbnResult[]> => {
    if (bookTitle === '') throw new errors.inputError();
    const queryString = `q=intitle:${bookTitle}`;
    const requestUrl = `${VOLUMESAPI}?${queryString}`;
    try {
      const response = await axios.get(requestUrl);
      // const IsbnList = response.data.items[0].volumeInfo.industryIdentifiers[0].identifier;
      const IsbnList: IsbnResult[] = response.data.items.map((item: GoogleResponseItem) => {
        const title = item.volumeInfo.title;
        const isbn = item.volumeInfo.industryIdentifiers;
        return { title, isbn };
      });
      return IsbnList;
    } catch (error) {
      throw error;
    }
  };

  /**
   * @param  {string} title full title or keyword of the title
   * @returns Promise<IsbnResult> returns the first matching Book on Google books
   */
  getFirstISBNByTitle = async (title: string): Promise<IsbnResult> => {
    const bookList: IsbnResult[] = await this.getISBNByTitle(title);
    return bookList[0];
  };

  /**
   * @param  {string} ISBNString any isbn13 or isbn10 string
   * @returns string returns either a valid isbn13 hyphenated string or throws an error for invalid ISBNs
   */
  validateAndHyphenateIsbn = (ISBNString: string): string | null => {
    const ISBNInfo = ISBN.parse(ISBNString);
    if (!ISBNInfo) {
      return null;
    }
    return ISBNInfo.isbn13h;
  };
}
