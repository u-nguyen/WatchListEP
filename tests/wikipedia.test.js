// Uyen Nguyen

import { test, expect, chromium } from '@playwright/test';
import { WikiPages } from '../pages/wikipedia.pages'; // Import the WikiPages class (locators)

let browser, context, page, wikiPages;
const articleName1 = process.env.WIKI_ARTICLE_NAME1;
const articleName2 = process.env.WIKI_ARTICLE_NAME2;

function removeUnderscores(articleName) {
  return articleName.replace(/_/g, ' ');
};

const reformattedName1 = removeUnderscores(articleName1);
const reformattedName2 = removeUnderscores(articleName2);

// Launch the browser and login to Wikipedia
test.beforeAll(async () => {
  browser = await chromium.launch({ channel: 'chrome', headless: false });
  context = await browser.newContext();
  page = await context.newPage();
  wikiPages = new WikiPages(page);

  await page.goto('https://en.wikipedia.org/');
  await wikiPages.loginLocators.loginLink.click();
  await wikiPages.loginLocators.username.fill(process.env.WIKI_USERNAME);
  await wikiPages.loginLocators.password.fill(process.env.WIKI_PASSWORD);
  await wikiPages.loginLocators.loginButton.click();
});

test('Add Two Articles to Watchlist', async () => {
  await page.goto('https://en.wikipedia.org/');

  // Add the two articles to the watchlist
  await addArticleToWatchlist(articleName1);
  await addArticleToWatchlist(articleName2);

  // Verify that both articles are in the watchlist
  await goToWatchlist();
  await verifyArticleInWatchlist(articleName1);
  await verifyArticleInWatchlist(articleName2);
});

test('Remove One Article from Watchlist', async () => {
  await goToWatchlist();

  // Remove one of the articles from the watchlist - articleName1
  await page.getByRole('checkbox', { name: `${reformattedName1} (talk | history)` }).check();
  await expect(page.getByRole('checkbox', { name: `${reformattedName1} (talk | history)` })).toBeChecked();

  await page.getByRole('button', { name: 'Remove titles' }).click();

  // Verify that the article is removed from the watchlist
  await expect(wikiPages.wikiWatchList.removedFromWatchlistBody).toContainText('A single title was removed from your watchlist:');
  await expect(wikiPages.wikiWatchList.removedFromWatchlistBody).toContainText(reformattedName1);
});

test('Verify Second Article Remains in Watchlist', async () => {
  await goToWatchlist();

  // Verify that the first article is removed from the watchlist
  await expect(wikiPages.wikiWatchList.listHyperLink(articleName1)).toBeHidden();

  // Verify that the second article is still in the watchlist
  await verifyArticleInWatchlist(articleName2);
  await wikiPages.wikiWatchList.listHyperLink(articleName2).click();
  await expect(page).toHaveURL(`https://en.wikipedia.org/wiki/${articleName2}`);
  await expect(wikiPages.wikiWatchList.articleHeading).toHaveText(reformattedName2);
});

// Delete all articles from the watchlist and close the browser
test.afterAll(async () => {
  await goToWatchlist();
  const checkAllCheckbox = page.getByRole('checkbox', { name: 'Check all' });
  if (await checkAllCheckbox.isVisible()) {
    await checkAllCheckbox.check();
    await expect(checkAllCheckbox).toBeChecked();
    await page.getByRole('button', { name: 'Remove titles' }).click();
  }

  if (browser) {
    await browser.close();
  }
});

// Add Article to Watchlist
async function addArticleToWatchlist(articleName) {
  await wikiPages.wikiWatchList.searchField.fill(articleName);
  await wikiPages.wikiWatchList.searchButton.click();
  await expect(page).toHaveURL(`https://en.wikipedia.org/wiki/${articleName}`);
  await expect(wikiPages.wikiWatchList.starIconWatch).toBeVisible();
  await wikiPages.wikiWatchList.starIconWatch.click();
  await expect(wikiPages.wikiWatchList.starUnwatch).toBeVisible();
}

// Verify Article in Watchlist
async function verifyArticleInWatchlist(articleName) {
  await expect(wikiPages.wikiWatchList.listHyperLink(articleName)).toBeVisible();
  const reformattedName = await removeUnderscores(articleName)
  await expect(wikiPages.wikiWatchList.listHyperLink(articleName)).toHaveText(reformattedName);
}

// Go to Watchlist
async function goToWatchlist() {
  await page.goto('https://en.wikipedia.org/wiki/Special:EditWatchlist');
  await expect(page).toHaveURL('https://en.wikipedia.org/wiki/Special:EditWatchlist');
}