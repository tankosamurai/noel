class ImageURL {

  constructor(galleryId, id, ext) {
    this.galleryId = galleryId;
    this.id = parseInt(id);
    this.ext = ext;
  }

  static fromString(string) {
    let result = string.match(/galleries\/(\d+)\/(\d+)\.(.+)/);
    return new ImageURL(result[1], result[2], result[3]);
  }

  toString() {
    return `https://i.nhentai.net/galleries/${this.galleryId}/${this.id}.${this.ext}`;
  }

}
