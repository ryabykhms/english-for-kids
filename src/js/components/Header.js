import Component from '../base/Component';

export default class Header extends Component {
  constructor(elements, props) {
    super(elements, props);

    const headerWrapper = this.createWrapperComponent(
      'div',
      this.getRootOfElements(),
      'header__wrapper'
    );

    this.rootElement = this.createComponentWithAppend('header', [headerWrapper], 'header');
  }

  update(props) {
    this.elements.forEach((element) => element.update(props));
  }
}
