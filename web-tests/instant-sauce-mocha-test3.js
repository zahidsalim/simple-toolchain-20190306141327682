
const promise = require('selenium-webdriver');
let expect = require('chai').expect;
let webdriver = require('selenium-webdriver');

promise.USE_PROMISE_MANAGER = false;

let   username = "yadav.o",
     accessKey = "bb24ec0b-cf6f-4c84-acbe-5fe1a6fbc6b5",
   /* Change the baseURL to your application URL */
   baseUrl = "https://simple-sauce-lab.mybluemix.net/";
   tags = ["simple-sauce-lab", "on-boarding", "node", "mocha" ],
   driver;

    function importTest(name, path) {
    console.log('Entered importTest. Path=',path);
    describe(name, function () {
        require(path);
        });
    }


describe('Instant Sauce Test Module 3', function() {
    this.timeout(40000);
    /* Now we will add a beforeEach method using the Mocha framework in order to
    set prerequiste tasks for each test case, in this case we're setting the driver capabilities.
     */
    beforeEach(async function () {
      driver = await new webdriver.Builder().withCapabilities({
        'browserName': 'chrome',
        'platformName': 'Windows 10',
        'browserVersion': 'latest',
        'goog:chromeOptions' : { 'w3c' : true },
        'sauce:options': {
            'username': username,
            'accessKey': accessKey,
            'build': 'Onboarding Sample App - NodeJS + Mocha',
            'name': '4-best-practices',
            /* As a best practice, set important test metadata and execution options
            such as build info, tags for reporting, and timeout durations.
            */
            'maxDuration': 3600,
            'idleTimeout': 1000,
            'tags': tags
          }
        }).usingServer("http://" + username + ":" + accessKey +
            "@ondemand.saucelabs.com:80/wd/hub").build();
            await driver.getSession().then(function (sessionid) {
                  driver.sessionID = sessionid.id_;
              });
        });

    });

    /* Here we add any post-requisite tasks, such as sending the test results to Sauce Labs.com*/
    afterEach(function (done) {
      console.log('afterEach 3');
      await driver.executeScript("sauce:job-result=" + (this.currentTest.state));
        await driver.quit();
    });

    //importTest("a", './web-tests/instant-sauce-mocha-test2.js');

    after(function () {
        console.log("after all tests");
    });

    it('should-open-chrome ', function (done) {
      await driver.get(baseUrl);
      const title = await driver.getTitle();
      console.log('Page Title is: ' + title);
      expect(title).equals('Swag Labs');
        });
});
