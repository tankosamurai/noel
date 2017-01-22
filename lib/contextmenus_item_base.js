class ContextMenusItemBase {

  constructor(options, onClicked) {
    this.options = options;
    this.onClicked = onClicked;
  }

  create() {
    return chrome.contextMenus.create(this.options);
  }

  update() {
    return chrome.contextMenus.update(this.options.id, this.options);
  }

  remove() {
    return chrome.contextMenus.remove(this.options.id);
  }

}
