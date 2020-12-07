import EventEmitter from './EventEmitter';

export default class View extends EventEmitter {
  constructor(root) {
    super();
    this.root = document.querySelector(root);
  }

  render(components) {
    components.forEach((component) => {
      const view = component.getView();
      view.render();
    });
    this.root.append();
  }
}
