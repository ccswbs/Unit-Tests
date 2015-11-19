//listing.js created by Joshua Pinsent
//This script tests the number of articles on a listing page and ensures that there are ten or less.
//Args: The url to be tested (argv[4]).
//Failures: More than 10 items on page, Next button is present & less than 10 items on page,
//          Link is not a uoguelph website, Body content does not load.
var count = 0;

module.exports = {
  'Listing Item Count' : function(browser) {
    browser
      .url(process.argv[4])
      .useXpath()
      .assert.urlContains("uoguelph.ca", "Checking that link is a uoguelph website.")
      .waitForElementVisible("//body", 1000, "Loading body.")
    },

  'Listing Count' : function(browser) {
    browser
      .execute(function() {
        return document.querySelectorAll('article').length;
      }, 
      function(result){
        count = result.value;

        if (count >= 10) {
          browser.assert.equal(count, 10, "Checking for 10 items on page.");
        }
        else if (count == 0) {
          browser.assert.equal(count, 0, "Listing has no content or page is not a listing page.");
        }
        else if (count < 10) {
          browser.waitForElementNotPresent("//li[@class='next']/a", 1000, "Checking for less than 10 items on last/only page.");
        }
      })

      .end();
    }
};