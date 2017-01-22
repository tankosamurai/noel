class TestRunner {

  constructor(tests) {
    this.tests = tests;
  }

  succeeded(test, testName, index, keys) {
    console.log(`[success] ${index + 1}/${keys.length} ${testName}`);
  }

  failed(test, testName, index, keys, e) {
    console.log(`[failed] ${index + 1}/${keys.length} ${testName}`);
  }

  run() {
    const collections = [];

    this.tests.forEach((test) => {
      const keys = Object.keys(test);
      const results = new TestResultCollection();

      keys.forEach((testName, index) => {
        try {
          if (test[testName]()) {
            results.push(new TestResult(testName, true));
          } else {
            results.push(new TestResult(testName, false));
          }
        } catch(e) {
          results.push(new TestResult(testName, false));
        }
      });

      collections.push(results);
    });

    return collections;
  }

}
