const cm = ContextMenusBase.bind({

  download: {
    title: "Download this gallery",
  },

  runTests: {
    title: "Run tests",
  },

  onDownload: onClickDownload,

  onRunTests: (info, tab) => {
    const runner = new Runner([PageURLTest]);
    runner.run();
  },

});

function onClickDownload(info, tab) {
  let garellyUrl = GarellyURL.fromString(tab.url);
  let garellyPromise = fetch("GET", garellyUrl.toString(), () => {});
  garellyPromise.then((xhr) => {
    let garellyExtractor = new GarellyExtractor(xhr.responseText, "text/html");
    let pageUrls = garellyExtractor.pageAnchorHrefs().map((href) => {
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
