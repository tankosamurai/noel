class GarellyExtractor extends Extractor {

  h1() {
    return this.sizzle("#info h1:first")[0].innerHTML;
  }

  pageAnchorHrefs() {
    return this.sizzle("#thumbnail-container .thumb-container a").map((el) => {
      return el.getAttribute("href");
    })
  }

}
