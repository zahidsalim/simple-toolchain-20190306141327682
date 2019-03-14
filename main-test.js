var webdriver = require('selenium-webdriver'),
    assert = require('assert');

function importTest(name, path) {
    describe(name, function () {
        require(path);
    });
}


describe("top", function () {
    beforeEach(function () {
       console.log("running something before each test");
    });
    importTest("a", './web-tests/instant-sauce-mocha-test2.js');
    importTest("b", './web-tests/instant-sauce-mocha-test3.js');
    after(function () {
        console.log("after all tests");
    });
});
