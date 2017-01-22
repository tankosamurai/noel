browser.contextMenus.create({
  id: "download",
  title: "Download this garally",
  contexts: ["all"],
  enabled: true,
});

browser.contextMenus.create({
  id: "runTests",
  title: "Run tests",
  enabled: true,
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

browser.contextMenus.onClicked.addListener((info, tab) => {
  if (info.menuItemId === "download") {
    onClickDownload(info, tab);
  } else if (info.menuItemId === "runTests") {
    const runner = new Runner([PageURLTest]);
    runner.run();
  }
});
