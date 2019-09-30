var webdriver = require('selenium-webdriver'),
    /* Use a run configuration and/or a bash profile to set your environment variables,
    for more information on how to do this, please visit:
    https://wiki.saucelabs.com/display/DOCS/Best+Practice%3A+Use+Environment+Variables+for+Authentication+Credentials
     */
    username = "yadav.o",
    accessKey = "bb24ec0b-cf6f-4c84-acbe-5fe1a6fbc6b5",

    /* Change the baseURL to your application URL */
    baseUrl = "https://sample-cloud-native-toolchain-slabs.mybluemix.net/";
    var driver;

describe('Instant Sauce Test Module 2', function() {
  console.log('Entered Instant Sauce Test Module 2');
    this.timeout(40000);
    it('should-open-safari', function (done) {
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

        driver.get(baseUrl);
        driver.getTitle().then(function (title) {
            console.log("title is: " + title);
        });
        driver.quit();
        done();
    });
});
