class ContextMenusItemBase {

  constructor(options, onClicked) {
    this.options = options;
    this.onClicked = onClicked;
  }

  create() {
    return browser.contextMenus.create(this.options);
  }

  update() {
    return browser.contextMenus.update(this.options.id, this.options);
  }

  remove() {
    return browser.contextMenus.remove(this.options.id);
  }

}
