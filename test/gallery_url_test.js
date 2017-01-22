const GalleryURLTest = {
  initializetionShouldSuccess: () => {
    const galleryUrl = new GalleryURL(123);
    return true;
  },

  fromStringShouldSuccess: () => {
    const galleryUrl = GalleryURL.fromString("https://nhentai.net/g/123")
    return true;
  },

  toStringShouldValidValue: () => {
    const galleryUrl = new GalleryURL(123, 456);
    return galleryUrl.toString() === "https://nhentai.net/g/123";
  },
};
