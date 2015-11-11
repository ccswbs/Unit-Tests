//breadcrumb.js created by Joshua Pinsent
//This script compares breadcrumbs between two websites.
//Args: The urls to be compared (argv[2], arg[3]).
//Failures: The levels do not match on each page, The strings do not match on each page,
//          Link is not a uoguelph website, Body content does not load.

var count = 0;
var crumbs = [];

module.exports = {
  'Breadcrumb Test' : function(browser) {
    browser
      .url(process.argv[4])
      .useXpath()
      .assert.urlContains("uoguelph.ca", "Checking that link is a uoguelph website.")
      .waitForElementVisible("//body", 1000, "Loading body.")
    },

  'Level Count' : function(browser) {
    browser
      .execute(function() {
        return document.querySelectorAll("ol[class='breadcrumb'] li").length;
      }, 
      function(result){
        count = result.value;

        if (count == 0) {
          browser.assert.equal(count, 0, "There are no breadcrumbs present on this page.");
        }
      })
    },

    'Get Breadcrumb Strings' : function(browser) {
    browser
      for (var x = 1; x < count + 1; x++) {
        browser.getText("css selector", "ol[class='breadcrumb'] li:nth-child(" + x + ")", function(result) {
          crumbs.push(result.value);
        });
      }
    },

    'Level Compare' : function(browser) {
    browser
      .url(process.argv[5])
      .execute(function() {
        return document.querySelectorAll("ol[class='breadcrumb'] li").length;
      },
      function(result){
        browser.assert.equal(result.value, count, "Checking that breadcrumb trails have the same number of levels.");
      })
    },

    'Compare Breadcrumb Strings' : function(browser) {
    browser
      var str
      crumbs.reverse()

      for (x = 1; x < count + 1; x++) {
        browser.getText("css selector", "ol[class='breadcrumb'] li:nth-child(" + x + ")", function(result) {
          str = crumbs.pop();
          browser.assert.equal(result.value, str, "Checking that breadcrumb strings '" + str + "' and '" + result.value + "' are the same.");
        });
      }

      browser.end()
    }
};