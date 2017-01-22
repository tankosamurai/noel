class Runner {

  constructor(tests) {
    this.tests = tests;
  }

  succeeded(test, testName) {
    console.log(`[success] ${testName}`);
  }

  failed(test, testName, e) {
    console.log(`[failed] ${testName}`);
  }

  run() {
    this.tests.forEach((test) => {
      Object.keys(test).forEach((testName) => {
        try {
          if (test[testName]()) {
            this.succeeded(test, testName);
          } else {
            this.failed(test, testName, {});
          }
        } catch(e) {
          this.failed(test, testName, e);
        }
      });
    });
  }

}
