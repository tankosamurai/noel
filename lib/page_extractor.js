class PageExtractor extends Extractor {

  imageSrc() {
    return this.sizzle("#image-container img")[0].attribute("src");
  }

}
