//validate.js created by Joshua Pinsent
//This script plugs a link into the W3C Markup Validation Service and returns whether it passed or failed.
//Args: The url to be tested (argv[4]).
//Failures: An error is generated via the W3C validator.
var errors = 0;

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

  //Count the errors on the page
  'Error Check' : function(browser) {
    browser
    .execute(function() {
        return document.querySelectorAll('.error').length;
      }, 
      function(result){
        errors = result.value;
      })
    },

  //Print errors to report
  'Error Log' : function(browser) {
    browser
    if (errors != 0) {
      browser.waitForElementPresent("//li[@class='error']", 1000, "Loading error boxes.");

      for (var x = 1; x < errors + 1; x++) {
        browser.getText("//ol/descendant::li[@class='error'][position()=" + x + "]", function(result) {
          browser.verify.equal(errors, 0, result.value);
        });
      }
    }
    browser.end();
  }
};