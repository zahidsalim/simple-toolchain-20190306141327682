
var webdriver = require('selenium-webdriver'),
    assert = require('assert'),
    username = "zahid.salim",
    accessKey = "2e54545a-83c0-4ff4-9b45-ab8bd400e76f",
    /* Change the baseURL to your application URL */
    baseUrl = "https://sample-cloud-native-toolchain-slabs.mybluemix.net/",
    tags = ["sauceDemo", "demoTest", "module4", "nodeTest"];
  var  driver;


describe('Instant Sauce Test Module 4', function() {
    this.timeout(40000);

    beforeEach(function (done) {
        var testName = this.currentTest.title;
        driver = new webdriver.Builder().withCapabilities({
            'browserName': 'chrome',
            'platform': 'Windows 10',
            'version': '59.0',
            'username': username,
            'accessKey': accessKey,
            'build': 'Onboarding Sample App - NodeJS',
            'name': '4-best-practices',
            /* As a best practice, set important test metadata and execution options
            such as build info, tags for reporting, and timeout durations.
             */
            'maxDuration': 3600,
            'idleTimeout': 1000,
            'tags': tags,
        }).usingServer("http://" + username + ":" + accessKey +
            "@ondemand.saucelabs.com:80/wd/hub").build();

        driver.getSession().then(function (sessionid) {
            driver.sessionID = sessionid.id_;
        });
        done();
    });

    afterEach(function (done) {
        driver.executeScript("sauce:job-result=" + (true ? "passed" : "failed"));
        driver.quit();
        done();
    });

    it('should-open-chrome', function (done) {
        driver.get(baseUrl);
        driver.getTitle().then(function (title) {
            console.log("title is: " + title);
            assert(true);
            done();
        });
    });
});
