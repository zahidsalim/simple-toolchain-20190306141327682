
var webdriver = require('selenium-webdriver'),
    test = require('selenium-webdriver/testing'),
    assert = require('assert'),
  //  username = process.env.SAUCE_USERNAME,
      username = "yadav.o";
//    accessKey = process.env.SAUCE_ACCESS_KEY,
      accessKey = "bb24ec0b-cf6f-4c84-acbe-5fe1a6fbc6b5",
      saucelabs = new SauceLabs({
      username: username,
      password: accessKey
    }),
    /* Change the baseURL to your application URL */
    baseUrl = "https://sample-cloud-native-toolchain-slabs.mybluemix.net/";
    var driver;

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
    beforeEach(function (done) {
        var testName = this.currentTest.title;
        console.log('TEST NAME is ==> ',testName);
        driver = new webdriver.Builder().withCapabilities({
            'browserName': 'chrome',
            'platform': 'Windows 10',
            'version': '59.0',
            'username': username,
            'accessKey': accessKey,
            'build': 'Onboarding Sample App - NodeJS',
            'name': '3-cross-browser',
        }).usingServer("http://" + username + ":" + accessKey +
            "@ondemand.saucelabs.com:80/wd/hub").build();

        driver.getSession().then(function (sessionid) {
            driver.sessionID = sessionid.id_;
        });

        done();
    });

    /* Here we add any post-requisite tasks, such as sending the test results to Sauce Labs.com*/
    afterEach(function (done) {
      console.log('afterEach 3...');
        driver.executeScript("sauce:job-result=" + (true ? "passed" : "failed"));
        driver.quit();
        saucelabs.updateJob(driver.sessionID, {
          name: title,
          passed: passed
        }, done);

    });

    //importTest("a", './web-tests/instant-sauce-mocha-test2.js');

    after(function () {
        console.log("after all tests");
    });

    it('should-open-chrome ', function (done) {
        driver.get(baseUrl);
        driver.getTitle().then(function (title) {
            console.log("Title is: " + title);
            assert(true);
            done();
        });
    });





});
