import EventEmitter from '../../base/EventEmitter';

export default class CategoryView extends EventEmitter {
  constructor() {
    super();
    this.rootElement = document.getElementById('root');
    this.rootElement.innerHTML = '';
  }

  render(elements) {
    elements.forEach((element) => this.rootElement.append(element.rootElement));
    this.rootElement.addEventListener('click', (e) => this.emit('playGame', e.target));
  }
}
