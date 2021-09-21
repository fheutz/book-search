# Testing 
## Testing Concept
Two types of tests are set up for this Respository:
* Unit/Component Tests found in `/src/__tests__/unit` can be run with `npm run test:unit`
* E2E Tests found in `/src/__tests__/e2e` can be run with `npm run test:e2e`

NOTE: Generally you could seperate unit and component tests because you would not want any mocks inside your Unit tests, but need mocks for your component tests. But this Package has very limited functionality, thus these two test-types have been merged into one test.

Git actions will Run on every PR to main branch. You can find the configuration in `.github/workflows`

Test Coverage should be above 95% but you should always target 100%

The library used for testing is `jest`
## Unit Test Results and Coverage

```bash
-----------------|---------|----------|---------|---------|-------------------
File             | % Stmts | % Branch | % Funcs | % Lines | Uncovered Line #s 
-----------------|---------|----------|---------|---------|-------------------
All files        |     100 |      100 |     100 |     100 |                   
 AmazonClient.ts |     100 |      100 |     100 |     100 |                   
 EbayClient.ts   |     100 |      100 |     100 |     100 |                   
 ISBNClient.ts   |     100 |      100 |     100 |     100 |                   
 PriceChecker.ts |     100 |      100 |     100 |     100 |                   
 ThaliaClient.ts |     100 |      100 |     100 |     100 |                   
 index.ts        |     100 |      100 |     100 |     100 |                   
-----------------|---------|----------|---------|---------|-------------------
Test Suites: 6 passed, 6 total
Tests:       27 passed, 27 total
Snapshots:   0 total
Time:        3.446 s
```