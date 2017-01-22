class ContextMenusBase {

  constructor(items) {
    this.items = items;
  }

  static bind(items) {
    const instance = new ContextMenusBase(items);
    instance.createItems();
    instance.addListener();
    return instance;
  }

  createItems() {
    this.items.forEach((item) => {
      browser.contextMenus.create(item.options);
    })
  }

  addListener() {
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
