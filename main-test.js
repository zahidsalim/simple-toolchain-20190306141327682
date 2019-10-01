var webdriver = require('selenium-webdriver'),
    assert = require('assert');

    child.on('importTest' => {
      console.log(`Exit code is:`);
    });

    function importTest(name, path) {
      console.log('Entered importTest');
        describe(name, function () {
            require(path);
        });
    }

// function importTest(name, path) {
//   console.log('Entered inportTest');
//     describe(name, function () {
//         require(path);
//     });
// }


describe("Executing Main Test Script", function () {
  console.log("Entered describe...............");
    beforeEach(function () {
       console.log("running something before each test");
    });
  //  importTest("a", './web-tests/instant-sauce-mocha-test2.js');
    importTest("b", './web-tests/instant-sauce-mocha-test3.js');

  //  importTest("c", './web-tests/instant-sauce-mocha-test1.js');
  //  importTest("d", './web-tests/instant-sauce-mocha-test4.js');
    after(function () {
        console.log("after all tests");
    });
});
