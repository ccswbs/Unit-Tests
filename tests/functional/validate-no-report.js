//validate-no-report.js created by Joshua Pinsent
//This script plugs a link into the W3C Markup Validation Service and returns whether it passed or failed.
//Args: The url to be tested (argv[4]).
//Failures: An error is generated via the W3C validator.
var errors = 0;
var messages = [];

module.exports = {
  'Validator Test' : function(browser) {
    browser
      .url("https://validator.w3.org/")
      .useXpath()
      .waitForElementVisible("//body", 1000, "Loading W3C Markup Validation Service body.")
    },

  'Input URL' : function(browser) {
    browser
      .setValue("//input[@type='text']", process.argv[4])
      .waitForElementVisible("//a[@class='submit']", 1000)
      .click("//a[@class='submit']")
      .pause(1000)
      .waitForElementVisible("//body", 1000, "Loading results page body.")
    },

  'Error Check' : function(browser) {
    browser
    .execute(function() {
        return document.querySelectorAll('.error').length;
      }, 
      function(result){
        browser.assert.equal(result.value, 0, "Checking for errors.")
      })
      
      browser.end();
    }
};