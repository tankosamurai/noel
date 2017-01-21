class Extractor {

  constructor(source, type) {
    let parser = new DOMParser();
    this.el = parser.parseFromString(source, type);
  }

  sizzle(selector, el) {
    if (el === undefined) {
      el = this.el;
    }

    return Sizzle(selector, el);
  }

}
