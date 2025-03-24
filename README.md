# Endpoint "Homework Assignment"

Project to automate test scripts for Wikipedia's Watchlist features using [Playwright](https://playwright.dev/). 

## Features

1. Add two pages to your watchlist 
2. Removes one of the articles from your watchlist 
3. Makes sure that the second article is still present in the watchlist 
4. Goes to the article in the watchlist and makes sure that the title matches 

=======================================

### Run Test in Terminal

### `Commands/Environment Variables to run on terminal`

```
WIKI_USERNAME={ username } WIKI_PASSWORD={ password } WIKI_ARTICLE_NAME1="{ article_name }" WIKI_ARTICLE_NAME2="{ article_name2 }" CI=true npx playwright test tests/wikipedia.test.js
```

*WIKI_ARTICLE_NAME* to be written with an underscore between words instead of spaces. Capitalization matters.

***exmaple:***

```
WIKI_USERNAME=uyennguyen WIKI_PASSWORD=endpointQAtest WIKI_ARTICLE_NAME1="Strawberry_Shortcake" WIKI_ARTICLE_NAME2="Bananas_in_Pyjamas" CI=true npx playwright test tests/wikipedia.test.js;
```

**Important Note**

Please use a wikipedia account that doesn't have an important watchlist items as the test will clear out all the ones in the list after all the test is completed.

=======================================

### Structures

### `tests/wikipedia.test.js`

This file contains the main test cases for Wikipedia's watchlist features. 

- **`Before All`**

    - Launches the Chrome browser and logs in using the credentials provided at runtime in the terminal.

- **`Add 2 Articles to Watchlist`**: 

    1. Opens Wikipedia website. 
    2. Uses search bar to search for the two articles from user input in terminal: 
    *WIKI_ARTICLE_NAME1, WIKI_ARTICLE_NAME2*
    3. Verifies the URL once on article page.
    4. Clicks the star icon on the article's page to the watchlist and verify that it's clicked.
    5. Go to Edit Watchlist url and verify that the articles have been added to the Watchlist.

- **`Remove 1 of the Articles from Watchlist`**: 

    1. Opens Wikipedia's Watchlist Edit page.
    2. Remove the first article (*WIKI_ARTICLE_NAME1*) from the watchlist.
    3. Verify that the article has been removed from the list

- **`Verify that the Second Article is still on Watchlist`**: 

    1. Opens Wikipedia's Watchlist Edit page.
    2. Verifies that *WIKI_ARTICLE_NAME1* is not visible.
    3. Verffies that *WIKI_ARTICLE_NAME2* is visible and click on page to verify that the link matches the title 

- **`After All`**

    - Go to Watchlist and delete all the articles in the Watchlist before closing the tests

- **`Helper functions`**

    - *removeUnderscores*:
    - *addArticleToWatchlist*
    - *verifyArticleInWatchlist*
    - *goToWatchlist*


### `pages/wikipedia.pages.js`

Locators that are neccessary for the tests are located here

=======================================

### Notes from Uyen

Actions are failing on github because I didn't add the env for them in the yml file - mainly because it needs to have the username and password - and I don't want to insert public credentials on github. Please run it on the terminal with the environment stated above. 

Thank you for taking the time to read my README.md and code! I appreciate being considered for this position and look forward to hearing back from the team!   
