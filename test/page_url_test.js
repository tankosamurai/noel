const PageURLTest = {
  initializetionShouldSuccess: () => {
    const pageUrl = new PageURL(123, 456);
    return true;
  },

  fromStringShouldSuccess: () => {
    const pageUrl = PageURL.fromString("https://nhentai.net/g/123/456")
    return true;
  },

  toStringShouldValidValue: () => {
    const pageUrl = new PageURL(123, 456);
    return pageUrl.toString() === "https://nhentai.net/g/123/456";
  },
};
