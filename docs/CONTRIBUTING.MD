# Repository Structure

* `./src` contains the main Source Code of the repository
* `./src/__test__` contains the tests for all files in `./src`
* `./src/common` mainly contains all common types in the `types.ts`-file 
* `./doc` contains all documentation files except the `README.MD` and the `LICENSE.MD`
* `./lib` is the build output directory
* `./coverage` is the test coverage output directory

# Getting Started with Development
If you want to know why a certain library/technology was used please check out [Technical Decisions](technicalDecision.md)
## Local Setup
Clone the code via
```bash
git clone https://github.com/fheutz/book-search.git
```
Install the packages with
```bash
# Required Node version 16+ with npm 7+
npm install
```

NPM Scripts:
```bash
npm run test:unit       # Jest tests
npm run test:e2e        # Jest tests
npm run build           # Building the Library
npm run format          # Formating using prettier 
npm run lint            # Linting using TSLint
```
## Adding Currencies

1. add the currency to the Currency enum in `src/common/types.ts`
2. add the currency to the CurrencyHandler in `src/common/classes.ts` and create a complete CurrencyType for it
3. check the ShopClients in `src` if they need special handeling of the currency think about 
   1. Is the Currency before or after the Value
   2. Does the currency symbol differ from the international shorthand
   3. Is the target site using different alphabets etc.
4. Make sure that Unit tests are completed for your added Currencies
5. (Optional) add E2E tests to your currency

## Creating a new ShopClient:

1. New shop clients can be created in the `./src` folder and should follow the naming pattern `${SHOPNAME}Client.ts`. 
2. For each new client create a testfile: `./src/__test__/unit/${SHOPNAME}Client.test.ts` to work correctly with the current [Testing](docs/testing.md) configuration.
3. Each new client should be an implementation of the `ShopClient`-Interface found in `./src/common/types.ts` to ensure reusability and conmformity
4. You can add the new Client to the top-level `PriceChecker` but it is not required as of now
5. Make sure you have a least 95% Test Coverage and run all test, format and linting scripts. 

# Roadmap
Possible additions to this Package could be 
* Implement more Shops and Currencies
* Implement a Digital vs Physical Book search
* Implement audio Book search
* More in depth cleanup of inputs
* Implement Clients for common book search APIs as well as support for some ShopAPIs if a developer can get a hold of API-Keys ;)
  * Ebay would be a prime candidate for that