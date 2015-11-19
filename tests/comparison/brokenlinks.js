//brokenlinks.js created by Joshua Pinsent
//This script checks for broken links across a single page and compares them to another page.
//Args: The urls to be compared (argv[4], arg[5]).
//Failures: Link does not work on the first page, but works on the second.
var link_tot = 0;
var urls = [];
var broken = [];

module.exports = {
  'Broken Link Test' : function(browser) {
  browser
    .url(process.argv[4])
    .assert.urlContains("uoguelph.ca", "Checking that link is a uoguelph website.")
    .waitForElementVisible("body", 1000, "Loading body.")
  },

  //ERROR: auto appending / to the end of URLs cannot be located in content
  //DOUBLE ERROR: does not retrieve relative URLs; turns into absolute
  'Get Links' : function(browser) {
  browser
    //Get a WebElement JSON object array of all urls
    browser.elements("css selector", "div.field-item.even a", function(link_array) {
      link_tot = link_array.value.length;
      //Fetch the url from each 'a' tag in the content
      for (var x = 0; x < link_tot; x++){
        browser.elementIdAttribute(link_array.value[x].ELEMENT, "href", function(links) {
          console.log(links.value);
          urls.push(links.value);
        });
      }
    })
  },

  'Click Links' : function(browser) {
  browser
    urls.reverse()
    var click_url

    //Click all links and check if they are broken
    for (var x = 0; x < link_tot; x++){
      click_url = urls.pop()
      browser.click("div.field-item.even a[href='" + click_url + "']");
      browser.pause(1000);

      //Conditionals for on-site 404/403 links
      browser.execute(function() {
        return document.querySelector("meta[content='Error Document']");
      }, 
      //Grabs url if link is broken
      function(errors){
        if (errors.value != null) {
          browser.url(function(link) {
            broken.push(link.value);
            console.log("BROKEN LINK: " + link.value + broken.length);
          });
        }
      });

      //Go back to previous page
      browser.url(process.argv[5]);
      browser.pause(1000);
    }
  },

 'Open Old Page' : function(browser) {
  browser
    .url(process.argv[3])
    .pause(1000)
    .assert.urlContains("uoguelph.ca", "Checking that link is a uoguelph website.")
    .waitForElementVisible("body", 1000, "Loading body.")
  },

  'Link Compare' : function(browser) {
  browser
    var broken_url;
    broken.reverse()
    links_tot = broken.length;

    //Click all links that are broken on the new site
    for (var x = 0; x < links_tot; x++) {
      broken_url = broken.pop();
      
      //ENHANCEMENT: Skip ahead in loop if link is not present on page
      //Ends test if link is not found on page
      browser.waitForElementPresent("div.field-item.even a[href='" + broken_url + "']", 1000, "Checking if link is present on both pages.");

      browser.click("div.field-item.even a[href='" + broken_url + "']");
      browser.pause(1000);
      
      //Passes test if link is broken, fails if not
      browser.execute(function() {
        return document.querySelector("meta[content='Error Document']");
      }, 
      function(result){
        //Prints broken urls in report (pass or fail)
        browser.url(function(link) {
          //Fails test if link works
          if (result.value == null) {
            browser.verify.fail(result.value, null, "The link (" + link.value + ") was broken during migration.");
          }
          //Passes test if link is broken
          else {
            browser.verify.elementPresent("meta[content='Error Document']", "The link (" + link.value + ") was broken prior to migration.");
          }
        });
      });

      //Go back to previous page
      browser.url(process.argv[3]);
      browser.pause(1000);
    }

    browser.end();
  }
};