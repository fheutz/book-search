# Book Search
<img src="docs/book_search_logo.png" alt="BooksIcon" width="100"/>

![example workflow](https://github.com/fheutz/book-search/actions/workflows/main.yaml/badge.svg)

----
## Description
Book search is a library that helps you find the best book prices for any book you are looking for.
It can also be used to find ISBN numbers of books, or search for book titles that you only know parts of.

----
## Features
This library currently supports the following shops:
* Amazon
* Thalia
* Ebay

These currencies are supported:
* Dollar
* EURO_GER

----
## Getting started

Installation
```bash
npm install @fheutz/book-search
```

Using the pricechecker Module

```Typescript
// Import Statement
import {Pricechecker, Currency} from 'book-search';
// Initializing the Client
const priceChecker = new Pricechecker();
// Setting the Currency of the Client to EURO using US Shops
pricechecker.setCurrency(Currency.DOLLAR);
// Geting the best offer by Bookname
const priceByName = pricechecker.getBestPriceByBookTitle('Ultralearing');
// Getting a list of offers by Bookname
const listOfOffers = pricechecker.comparePricesByBookTitle('Ultralearning');
```

Using the specific Clients to have more control of the processes

```Typescript
// Import Statement
import {ISBNClient, AmazonClient, Currency} from 'book-search';

// Initializing the Clients
const amazonClient = new AmazonClient();
const isbnClient = new ISBNClient();

// Getting an ISBN for a Booktitle
const isbn:string = isbnClient.getFirstISBNByTitle('Ultralearning').isbn[0].identifier
// Setting the Currency of the Client to EURO using German shops
amazonClient.setCurrency(Currency.EUR_GER)
// Executing getPriceByISBN on the Amazon client
const amazonOffer = amazonClient.getPriceByISBN(isbn) 
```
----
## Documentation

* [Technical Decisions](docs/technicalDecision.md) - technical decisions
* [Testing](docs/testing.md) - testing concept and current test results

----
## Contributing & Developing
This library is designed to be extended to use other bookshops and currencies, if you want to get into developing check the [development and contribution guide](docs/CONTRIBUTING.MD) for additional information.

----
## Limitations 

This library does not make a lot of sense for countries like Germany, because of laws that ensure Fixed book prices. Read Further: 
* [Fixed Book Prices [en]](https://en.wikipedia.org/wiki/Fixed_book_price) 
* [Buchpreisbindung [de]](https://de.wikipedia.org/wiki/Buchpreisbindung) 
  
German top level domains are still included, to check if your favourite bookshop has the book 😄

