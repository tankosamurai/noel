class GalleryURL {

  constructor(id) {
    this.id = id;
  }

  static fromString(string) {
    let result = string.match(/\/g\/(\d+)/);
    return new GalleryURL(result[1]);
  }

  toString() {
    return `https://nhentai.net/g/${this.id}`;
  }

}
