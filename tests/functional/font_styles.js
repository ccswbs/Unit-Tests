//font_styles.js created by Joshua Pinsent
//This script checks that the body content does not contain unneccessary styling attributes
//Args: The url to be tested (argv[4])
//Failures: Style attribute contains 'color' or 'font' styling,
//          Link is not a uoguelph website, Body content does not load.
var errors = 0;

module.exports = {
  'Font Size Test' : function(browser) {
  browser
    .url(process.argv[4])
    .assert.urlContains("uoguelph.ca", "Checking that link is a uoguelph website.")
    .waitForElementVisible("body", 1000, "Loading body.")
  },

  'Style Tag Check' : function(browser) {
  browser
    //Count the number of attributes with styling tags in the content
    browser.elements("css selector", "div[class='field-item even'] *[style]", function(tag_array) {
      tags = tag_array.value.length;

      //Retrieve style attribute value for each element
      for (var x = 0; x < tags; x++){
        browser.elementIdAttribute(tag_array.value[x].ELEMENT, "style", function(style) {

          //Fails if 'font' or 'color' is present in attribute
          if (style.value.indexOf("font") != -1) {
            browser.verify.fail("font", null, "The following tag contains font styling: " + style.value);
            errors = 1;
          }
          else if (style.value.indexOf("color") != -1) {
            browser.verify.fail("color", null, "The following tag contains color styling: " + style.value);
            errors = 1;
          }
        });
      }
    })

    if (errors == 0) {
      browser.assert.equal(errors, 0, "No tags in the content are using styling attributes.");
    }

    browser.end();
  }
};