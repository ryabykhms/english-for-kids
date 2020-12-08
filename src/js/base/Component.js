import EventEmitter from './EventEmitter';

export default class Component extends EventEmitter {
  constructor(elements, props) {
    super();
    this.elements = elements;
    this.props = props;
  }

  createComponent(tag, ...classes) {
    const component = document.createElement(tag);
    component.classList.add(...classes);
    return component;
  }

  createComponentWithText(tag, text, ...classes) {
    const component = this.createComponent(tag, ...classes);
    component.textContent = text;
    return component;
  }

  createComponentWithHtml(tag, html, ...classes) {
    const component = this.createComponent(tag, ...classes);
    component.innerHTML = html;
    return component;
  }

  createComponentWithAppend(tag, children, ...classes) {
    let component = {};

    if (children.length === 1 && typeof children[0] === 'string') {
      component = this.createComponentWithText(tag, children[0], ...classes);
    } else {
      component = this.createComponent(tag, ...classes);
      component.append(...children);
    }

    return component;
  }

  createWrapperComponent(tag, children, ...classes) {
    const component = this.createComponentWithAppend(tag, children, 'wrapper');
    component.classList.add(...classes);
    return component;
  }

  createLinkComponent(href, children, ...classes) {
    const component = this.createComponentWithAppend('a', children, ...classes);
    component.href = href;
    return component;
  }

  createImageComponent(src, alt, ...classes) {
    const component = this.createComponent('img', ...classes);
    component.src = src;
    component.alt = alt;
    return component;
  }

  createCheckboxComponent(...classes) {
    const component = this.createComponent('input', ...classes);
    component.type = 'checkbox';
    return component;
  }

  createComponetWithDataset(tag, dataset, children, ...classes) {
    const component = this.createComponentWithAppend(tag, children, ...classes);
    Object.keys(dataset).forEach((field) => {
      component.dataset[field] = dataset[field];
    });
    return component;
  }

  getRootOfElements() {
    return this.elements.map((element) => element.rootElement);
  }

  update(props) {
    if (this.elements) {
      this.elements.forEach((element) => element.update(props));
    }
  }
}
