class PageURL {

  constructor(galleryId, id) {
    this.galleryId = galleryId;
    this.id = id;
  }

  static fromString(string) {
    let result = string.match(/\/g\/(\d+)\/(\d+)/);
    return new PageURL(result[1], result[2]);
  }

  toString() {
    return `https://nhentai.net/g/${this.galleryId}/${this.id}`;
  }

}
