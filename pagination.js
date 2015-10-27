//pagination.js created by Joshua Pinsent
//This script tests pagination. It starts from the first page and then clicks next, previous, first and last. 
//Failures: Pagination not found, Next/Last button present on Last page, Prev/First button present on First page,
//          incorrect page numbers (on pages 1, 2 and the last page), class 'disabled last' not found on last page,
//          class 'disabled first' not found on first page.
var max_page = "";

module.exports = {
  'Pagination' : function (browser) {
    browser
      .url('https://www-stage.uoguelph.ca/oac/news')
      .useXpath()
      .waitForElementVisible('//body', 1000)
    },

    //End test if pagination is not present
    'Pagination Present' : function (browser) {
    browser
      .waitForElementPresent("//div/nav/ul[@class='pagination']", 1000, "No pagination found on page.")
    },

    //Get max page number
    'Parse Max Page Number' : function (browser) {
      browser
      .getText("//div/nav/ul/li[@class='disabled first']/span", function(result) {
        var str = result.value;

        //Parse string in reverse for numbers
        for (var i = str.length - 1; !isNaN(str[i]); i--) {
          if (str[i] != ' ')
            max_page += str[i];
        }

        //Reverse string
        max_page = max_page.split("").reverse().join("");
      })
    },

    'Next Button' : function(browser) {
      browser
      .click("//div/nav/ul/li[@class='next']/a")
      .pause(1000)
      .waitForElementVisible('//body', 1000)
      .assert.containsText("//div/nav/ul/li[@class='disabled']", "Page 2 of " + max_page, "Page numbers are wrong on second page.")
    },

    'Prev Button' : function(browser) {
      browser
      .click("//div/nav/ul/li[@class='prev']/a")
      .pause(1000)
      .waitForElementVisible('//body', 1000)
      .assert.containsText("//div/nav/ul/li[@class='disabled first']", "Page 1 of " + max_page, "Page numbers are wrong on first page.")
    },

    'Last Button' : function(browser) {
      browser
      .click("//div/nav/ul/li[@class='pager-last last']/a")
      .pause(1000)
      .waitForElementVisible('//body', 1000)

      //Check Last & Next buttons are not present
      .waitForElementNotPresent("//div/nav/ul/li[@class='pager-last last']/a", 1000, "Last button shouldn't show up on last page.")
      .waitForElementNotPresent("//div/nav/ul/li[@class='next']/a", 1000, "Next button shouldn't show up on last page.")
      //Disabled last class
      .waitForElementVisible("//div/nav/ul/li[@class='disabled last']", 1000, "Class 'disabled last' is not present on last page.")
      //Check if last page
      .assert.containsText("//div/nav/ul/li[@class='disabled last']", "Page " + max_page + " of " + max_page, "Page numbers are wrong on last page.")
    },

    'First Button' : function(browser) {
      browser
      .click("//div/nav/ul/li[@class='pager-first first']/a")
      .pause(1000)
      .waitForElementVisible('//body', 1000)

      //Check First & Prev buttons are not present
      .waitForElementNotPresent("//div/nav/ul/li[@class='pager-first first']/a", 1000, "First button shouldn't show up on first page.")
      .waitForElementNotPresent("//div/nav/ul/li[@class='prev']/a", 1000, "Previous button shouldn't show up on first page.")
      //Disabled first class
      .waitForElementVisible("//div/nav/ul/li[@class='disabled first']", 1000, "Class 'disabled first' is not present on first page.")
      //Check if first page
      .assert.containsText("//div/nav/ul/li[@class='disabled first']", "Page 1 of " + max_page, "Page numbers are wrong on first page.")

      .end();
  }
};