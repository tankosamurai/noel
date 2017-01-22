class TestResult {

  constructor(name, isSuccess) {
    this.name = name;
    this.isSuccess = isSuccess;
  }

  toString() {
    if (this.isSuccess) {
      return `[success] ${this.name}`;
    } else {
      return `[failed] ${this.name}`;
    }
  }

}
