class ContextMenusBase {

  constructor(items) {
    this.items = items;
  }

  createItems() {
    this.items.forEach((item) => {
      browser.contextMenus.create(item.options);
    })
  }

  bind() {
    console.log("bind called");
    browser.contextMenus.onClicked.addListener((info, tab) => {
      this.onClicked(info, tab);
    });
  }

  onClicked(info, tab) {
    const id = info.menuItemId;
    this.items.find((item) => {
      return id === item.options.id
    }).onClicked(info, tab);
  }

}
