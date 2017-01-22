class ContextMenusBase {

  constructor(items) {
    this.items = items;
  }

  static isCallbackNameConvention(string) {
    return /^on[A-Z]/.test(string);
  }

  static bind(options) {
    const keys = Object.keys(options);

    const idKeys = keys.filter((key) => {
      return !ContextMenusBase.isCallbackNameConvention(key);
    });

    const items = idKeys.map((key) => {
      let option = options[key];
      option.id = key;
      const name = ContextMenusBase.getCallbackName(key);
      const item = new ContextMenusItemBase(option, options[name]);
      item.create();
      return item;
    });

    const instance = new ContextMenusBase(items);

    instance.addListener();

    return instance;
  }

  static getCallbackName(string) {
    return "on" + string.charAt(0).toUpperCase() + string.slice(1);
  }

  createItems() {
    this.idKeys.forEach((key) => {
      let option = this.options[key];
      option.id = key;
      browser.contextMenus.create(option);
    });
  }

  addListener() {
    browser.contextMenus.onClicked.addListener((info, tab) => {
      this.onClicked(info, tab);
    });
  }

  onClicked(info, tab) {
    this.items.find((item) => {
      return item.options.id === info.menuItemId;
    }).onClicked(info, tab);
  }

}
