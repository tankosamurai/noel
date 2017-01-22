class Runner {

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
    this.tests.forEach((test) => {
      const keys = Object.keys(test);
      keys.forEach((testName, index) => {
        try {
          if (test[testName]()) {
            this.succeeded(test, testName, index, keys);
          } else {
            this.failed(test, testName, index, keys, {});
          }
        } catch(e) {
          this.failed(test, testName, index, keys, e);
        }
      });
    });
  }

}
