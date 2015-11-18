//breadcrumb_enhanced.js created by Joshua Pinsent
//This script compares breadcrumbs between two websites by checking the levels, strings and urls of each breadcrumb.
//Args: The urls to be compared (argv[2], arg[3]).
//Failures: The levels do not match, The strings do not match, The urls do not match,
//          Link is not a uoguelph website, Body content does not load.
var count = 0;
var crumb_txt = [];
var crumb_url = [];

module.exports = {
  'Breadcrumb Test' : function(browser) {
    browser
      .url(process.argv[2])
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
          crumb_txt.push(result.value);
        });
      }
    },

    'Get Breadcrumb Links' : function(browser) {
    browser
      for (var x = 1; x < count + 1; x++) {
        browser.getAttribute("css selector", "ol[class='breadcrumb'] li:nth-child(" + x + ") a", "href", function(result) {
          crumb_url.push(result.value);
        });
      }
    },

    'Open New Page' : function(browser) {
    browser
      .url(process.argv[3])
      .assert.urlContains("uoguelph.ca", "Checking that link is a uoguelph website.")
      .waitForElementVisible("//body", 1000, "Loading body.")
    },

    'Level Compare' : function(browser) {
    browser
      .execute(function() {
        return document.querySelectorAll("ol[class='breadcrumb'] li").length;
      },
      function(result){
        browser.assert.equal(result.value, count, "Checking that breadcrumb trails have the same number of levels.");
      })
    },

    'String Compare' : function(browser) {
    browser
      var str
      crumb_txt.reverse()

      for (x = 1; x < count + 1; x++) {
        browser.getText("css selector", "ol[class='breadcrumb'] li:nth-child(" + x + ")", function(result) {
          str = crumb_txt.pop();
          browser.assert.equal(result.value, str, "Checking that breadcrumb strings '" + str + "' and '" + result.value + "' are the same.");
        });
      }
    },

    'URL Compare' : function(browser) {
    browser
      var url
      crumb_url.reverse()

      for (x = 1; x < count + 1; x++) {
        browser.getAttribute("css selector", "ol[class='breadcrumb'] li:nth-child(" + x + ") a", "href", function(result) {
          url = crumb_url.pop();
          browser.assert.equal(result.value, url, "Checking that breadcrumb urls '" + url + "' and '" + result.value + "' are the same.");
        });
      }

      browser.end()
    }
};