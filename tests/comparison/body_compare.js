//body_compare.js created by Joshua Pinsent
//This script compares the body content of two specified webpages. It first compares
//the text without any HTML tags, followed by the text with HTML tags.
//Args: The urls to be compared (argv[4], arg[5]).
//Failures: Content across each page does not match, HTML tags do not match.
var bodStr;
var bodHTML;

module.exports = {
  'Body Content Compare' : function(browser) {
    browser
      .url(process.argv[4])
      .useXpath()
      .assert.urlContains("uoguelph.ca", "Checking that link is a uoguelph website.")
      .waitForElementVisible("//body", 1000, "Loading body.")
    },

    'Get Content String' : function(browser) { 
    browser
      .waitForElementVisible("//div[@class='field-item even']", 1000, "Loading first page's body content.")

      //Copy body content without HTML tags
      .getText("//div[@class='field-item even']", function(result) {
        bodStr = result.value;
      })
    },

    'Get Content HTML' : function(browser) {
    browser
      //Copy body content with HTML tags
     .execute(function() {
        return document.querySelector(".field-item.even").innerHTML;
      }, 
      function(result) {  
        bodHTML = result.value;
      })
    },

    'Open New Page' : function(browser) {
    browser
      .url(process.argv[5])
      .pause(1000)
      .assert.urlContains("uoguelph.ca", "Checking that link is a uoguelph website.")
      .waitForElementVisible("//body", 1000, "Loading body.")
      .waitForElementVisible("//div[@class='field-item even']", 1000, "Loading second page's body content.")
    },

    'Compare Strings' : function(browser) {
    browser
      //Compare content as strings (no HTML tags)
      .getText("//div[@class='field-item even']", function(result) {

        if(result.value != bodStr) {
          browser.assert.fail(bodStr, result.value, "The pages' content do not match.")
        }
      })
    },

    'Compare HTML' : function(browser) {
    browser
      //Compare content as strings with HTML tags
      .execute(function() {
        return document.querySelector(".field-item.even").innerHTML;
      }, 
      function(result) {  

        if(result.value != bodHTML) {
          browser.assert.fail(bodHTML, result.value, "The pages' HTML tags do not match.")
        }
      })

      .end()
    }
};