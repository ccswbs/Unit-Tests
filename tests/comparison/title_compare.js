//title_compare.js created by Joshua Pinsent
//This script compares the titles of two specified webpages. 
//Args: The urls to be compared (argv[4], argv[5])
//Failures: Page titles do not match
var titleOld;

module.exports = {
  'Title Compare' : function(browser) {
    browser
      .url(process.argv[4])
      .useXpath()
      .assert.urlContains("uoguelph.ca", "Checking that link is a uoguelph website.")
      .waitForElementVisible("//body", 1000, "Loading body.")
    },

    'Get First Title' : function(browser) { 
    browser
      .waitForElementVisible("//h1", 1000, "Loading first page title.")

      //Copy the first page's title
      .getText("//h1", function(result) {
        titleOld = result.value;
      })
    },

    'Open New Page' : function(browser) {
    browser
      .url(process.argv[5])
      .useXpath()
      .assert.urlContains("uoguelph.ca", "Checking that link is a uoguelph website.")
      .waitForElementVisible("//body", 1000, "Loading body.")      
      .pause(1000)
      .waitForElementVisible("//h1", 1000, "Loading second page title.")
    },

    'Compare Titles' : function(browser) {
    browser
     .getText("//h1", function(result) {

        if(result.value != titleOld) {
          browser.assert.fail(titleOld, result.value, "The pages' titles do not match.")
        }
      })
      .end()
    }
};