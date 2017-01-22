class ContextMenusBase {

  constructor(options, iKeys, cKeys) {
    this.options = options;
    this.idKeys = iKeys;
    this.callbackKeys = cKeys;
  }

  static isCallbackNameConvention(string) {
    return /^on[A-Z]/.test(string);
  }

  static bind(options) {
    const keys = Object.keys(options);

    const idKeys = keys.filter((key) => {
      return !ContextMenusBase.isCallbackNameConvention(key);
    });

    const callbackKeys = keys.filter((key) => {
      return ContextMenusBase.isCallbackNameConvention(key);
    });

    const instance = new ContextMenusBase(options, idKeys, callbackKeys);
    instance.createItems();
    instance.addListener();
    return instance;
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
    const id = info.menuItemId;
    const callbackName = "on" + id.charAt(0).toUpperCase() + id.slice(1);
    this.options[callbackName](info, tab);
  }

}
