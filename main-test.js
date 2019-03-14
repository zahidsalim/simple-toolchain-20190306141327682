var webdriver = require('selenium-webdriver'),
    assert = require('assert');

function importTest(name, path) {
    describe(name, function () {
        require(path);
    });
}


describe("Executing Main Test Script", function () {
    beforeEach(function () {
       console.log("running something before each test");
    });
    importTest("a", './web-tests/instant-sauce-mocha-test2.js');
    importTest("b", './web-tests/instant-sauce-mocha-test3.js');

  //  importTest("c", './web-tests/instant-sauce-mocha-test1.js');
  //  importTest("d", './web-tests/instant-sauce-mocha-test4.js');
    after(function () {
        console.log("after all tests");
    });
});
