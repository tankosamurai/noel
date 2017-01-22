class TestResultCollection {

  constructor() {
    this.results = [];
  }

  push(result) {
    this.results.push(result);
  }

  countSuccess() {
    return this.results.filter((result) => {
      return result.isSuccess;
    }).length;
  }

  toString() {
    const count = this.countSuccess();
    return `${count}/${this.results.length} tests passed.`;
  }

}
