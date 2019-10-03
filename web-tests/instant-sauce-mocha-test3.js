const promise = require('selenium-webdriver');
let expect = require('chai').expect;
let webdriver = require('selenium-webdriver');

/* promise manager for selenium-webdriver is going to be deprecated */
/* you must use async/await as an alternative */
promise.USE_PROMISE_MANAGER = false;

let username = "yadav.o",
    accessKey = p"bb24ec0b-cf6f-4c84-acbe-5fe1a6fbc6b5",
    appURL = "https://sample-cloud-native-toolchain-slabs.mybluemix.net/",
    tags = ["sauceDemo", "async", "node", "webdriverjs", "headless" ],
    driver;

describe ('headless firefox test', function() {
    this.timeout(50000);
    beforeEach(async function () {
        driver = await new webdriver.Builder().withCapabilities({
            'browserName': 'firefox',
            'platformName': 'linux',
            'browserVersion': 'latest',
            'sauce:options': {
                'username': username,
                'accessKey': accessKey,
                'seleniumVersion': '3.141.59',
                'build': 'Sample Headless Tests',
                'name': 'headless-firefox-test-js',
                'maxDuration': 3600,
                'idleTimeout': 1000,
                'tags': tags
            }}).usingServer("https://ondemand.us-east-1.saucelabs.com/wd/hub")
            .build();
        await driver.getSession().then(function (sessionid) {
            driver.sessionID = sessionid.id_;
        });
    });

    afterEach(async function() {
        await driver.executeScript("sauce:job-result=" + (this.currentTest.state));
        await driver.quit();
    });

	after(function () {
        console.log("after all tests");
    });

    it('get-title-test', async function() {
        await driver.get(appURL);
        const title = await driver.getTitle();
        console.log('Page Title is: ' + title);
        expect(title).equals('Swag Labs');
    });
});
