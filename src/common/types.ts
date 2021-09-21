/**Interface for implementing ShopClients */
export interface ShopClient {
  setCurrency(currency: Currency): void;
  getCurrency(): CurrencyType;
  getBookPriceByISBN(ISBN: string): Promise<ShopOffer>;
  setApiKey?(key: string): void;
  login?(): Promise<boolean | Error>;
  setTopLevelDomain?(topLevelDomain: TopLevelDomain): void;
}

/** Currently supported Currencies */
export enum Currency {
  DOLLAR,
  EURO_GER,
}

export type CurrencyType = {
  topLevelDomain: TopLevelDomain;
  shortHand: string;
  symbol: string;
};

/** Type to Store Currency and Value of price */
export type ShopOffer = {
  currency: string;
  price: number;
  directLink: string;
};

/**Result type from ISBN Lookup against GoogleBooksAPI */
export type IsbnResult = {
  title: string;
  isbn: IndustryIdentifiers[];
};

/**Type for storing ISBN Numbers and their Type */
export type IndustryIdentifiers = {
  type: string;
  identifier: string;
};

/**Enum storing currently Supported ShopClients */
export enum ShopClients {
  AMAZON,
  EBAY,
}

class ConnectionError extends Error {
  constructor(provider: string) {
    super('Could not connect to: ' + provider);
  }
}
class InvalidInputError extends Error {
  constructor() {
    super('Invalid Booktitle Input');
  }
}

export const errors = {
  inputError: InvalidInputError,
  connectionError: ConnectionError,
};

/** Enum to store Toplevel Domains */
export enum TopLevelDomain {
  DE = '.de',
  US = '.com',
  FR = '.fr',
  DK = '.dk',
  CH = '.ch',
}
