# Libraries

## Used libraries

* Axios for HTTP-Request handling to ensure the library works on node and web (MIT License)
* [isbn3](https://www.npmjs.com/package/isbn3) package is used to hyphenate and validate ISBN numbers (MIT License)
* [Cheerio](https://www.npmjs.com/package/cheerio) will be used to scrape HTML (MIT License)
* tslint, prettier and jest are used because they are pretty much industry standard

## Considered but not used

* [JSSoup](https://www.npmjs.com/package/jssoup) is a possible alternative to Cheerio but is not uses because Cheerio seems to be a more active project
* we are not using [price-finder](https://www.npmjs.com/package/price-finder) to scrape prices from Amazon and Google because i has vulnerable dependencies

# Other Technical Decisions

* Unit and Component tests are merged checkout [testing](testing.md) for more information