class PageURL {

  constructor(garellyId, id) {
    this.garellyId = garellyId;
    this.id = id;
  }

  static fromString(string) {
    let result = string.match(/\/\/nhentai.net\/g\/(\d+)\/(\d)/);
    return new PageURL(result[1], result[2]);
  }

  toString() {
    return `https://nhentai.net/g/${this.garellyId}/${this.id}`;
  }

}
