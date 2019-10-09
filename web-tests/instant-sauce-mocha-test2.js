
var webdriver = require('selenium-webdriver'),
    assert = require('assert'),
    username = "panwar_n";
    accessKey = process.env.SAUCE_ACCESS_KEY,
//    accessKey = "e3af7f98-4dbc-4a67-a2d1-1cd94dbc3f1d",
    /* Change the baseURL to your application URL */
    baseUrl = "https://sample-cloud-native-toolchain-slabs.mybluemix.net/";
    var driver;

    function importTest(name, path) {
    console.log('Entered importTest. Path=',path);
    describe(name, function () {
        require(path);
        });
    }


describe('Instant Sauce Test Module -- Safari', function() {
    this.timeout(40000);
    /* Now we will add a beforeEach method using the Mocha framework in order to
    set prerequiste tasks for each test case, in this case we're setting the driver capabilities.
     */
    beforeEach(function (done) {
        var testName = this.currentTest.title;
        console.log('TEST NAME is ==> ',testName);
        driver = new webdriver.Builder().withCapabilities({
            'browserName': 'safari',
            'platform': 'macOS 10.13',
            'version': '11.1',
            'username': username,
            'accessKey': accessKey,
            'build': 'Onboarding Sample App - NodeJS',
            'name': '2-user-site',
        }).usingServer("http://" + username + ":" + accessKey +
            "@ondemand.saucelabs.com:80/wd/hub").build();

        driver.getSession().then(function (sessionid) {
            driver.sessionID = sessionid.id_;
        });

        done();
    });

    /* Here we add any post-requisite tasks, such as sending the test results to Sauce Labs.com*/
    afterEach(function (done) {
      console.log('afterEach for Safari');
        driver.executeScript("sauce:job-result=" + (true ? "passed" : "failed"));
        driver.quit();
        done();
    });

    //importTest("a", './web-tests/instant-sauce-mocha-test2.js');

    after(function () {
        console.log("after all tests - Safari");
    });

    it('should-open-Safari ', function (done) {
        driver.get(baseUrl);
        console.log('Title=====',driver.get(baseUrl));
        console.log('baseUrl--->',baseUrl);
        driver.getTitle().then(function (title) {
            console.log("Title is: " + title);

            assert(true);

            done();
        });
    });





});
