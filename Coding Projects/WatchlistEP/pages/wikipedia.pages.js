const { expect } = require('@playwright/test');

class WikiPages {
  constructor(page) {
    this.page = page;

    this.loginLocators = {
      loginLink: page.locator('#pt-login-2 span'), 
      username: page.locator('#wpName1'),
      password: page.locator('#wpPassword1'), 
      loginButton: page.locator('#wpLoginAttempt'),
    };

    this.wikiWatchList = {
      searchButton: page.locator('#searchform .cdx-button'),
      searchField: page.locator('#searchform .cdx-text-input__input'),
      starIconWatch: page.locator('#ca-watch'),
      starUnwatch: page.locator('#ca-unwatch'),

      listHyperLink: (articleName) => page.locator(`a[href="/wiki/${articleName}"]`),
      removedFromWatchlistBody: page.locator('#mw-content-text'), 
      articleHeading: page.locator('#firstHeading'),
    }
  }
}

module.exports = { WikiPages };