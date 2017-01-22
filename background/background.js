const cm = ContextMenusBase.bind({

  download: {
    title: "Download this gallery",
  },

  separator: {
    type: "separator",
  },

  runTests: {
    title: "Run tests",
  },

  onDownload: onClickDownload,

  onRunTests: (info, tab) => {
    const runner = new TestRunner([
      PageURLTest,
    ]);

    const collections = runner.run();

    if (browser.notifications) {
      collections.forEach((results) => {
        browser.notifications.create({
          type: "basic",
          title: "Running tests has finished.",
          message: results.toString(),
        });
      });
    }
  },

});

function onClickDownload(info, tab) {
  let galleryUrl = GalleryURL.fromString(tab.url);
  let galleryPromise = fetch("GET", galleryUrl.toString(), () => {});
  galleryPromise.then((xhr) => {
    let galleryExtractor = new GalleryExtractor(xhr.responseText, "text/html");
    let pageUrls = galleryExtractor.pageAnchorHrefs().map((href) => {
      let pageUrl = PageURL.fromString(href)
      return pageUrl;
    });

    pageUrls.reduce((promise, current, index) => {
      return promise.then(() => {
        return fetch("GET", current.toString(), (xhr) => {
          let pageExtractor = new PageExtractor(xhr.responseText, "text/html");
          let imageUrl = ImageURL.fromString(pageExtractor.imageSrc());

          browser.downloads.download({
            url: imageUrl.toString(),
            filename: imageFilenameTemplate("%gid%_%id%", imageUrl),
          });
        });
      }, () => {
        Promise.resolve(() => {
          console.log("error!");
        });
      });
    }, Promise.resolve());
  });

}
