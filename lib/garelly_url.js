class GarellyURL {

  constructor(id) {
    this.id = id;
  }

  static fromString(string) {
    let result = string.match(/\/\/nhentai\.net\/g\/(\d+)/);
    return new GarellyURL(result[1]);
  }

  toString() {
    return `https://nhentai.net/g/${this.id}`;
  }

}
