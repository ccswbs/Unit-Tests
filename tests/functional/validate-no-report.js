//validate-no-report.js created by Joshua Pinsent
//This script plugs a link into the W3C Markup Validation Service and returns whether it passed or failed.
//Args: The url to be tested (argv[4]).
//Failures: The validation is run with a fatal error (page doesn't load), An error is generated via the W3C validator,
//          The body content doesn't load.
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
    .waitForElementNotPresent("//ol[@id='fatal-errors']", 1000)

    .execute(function() {
        return document.querySelectorAll('.error').length;
      }, 
      function(result){
        browser.assert.equal(result.value, 0, "Checking for errors.")
      })
      
      browser.end();
    }
};