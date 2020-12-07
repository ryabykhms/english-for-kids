import Component from '../base/Component';

export default class Cards extends Component {
  constructor(elements, props) {
    super(elements, props);

    const cardsWrapper = this.createWrapperComponent(
      'div',
      this.getRootOfElements(),
      'cards__wrapper'
    );

    this.rootElement = this.createComponentWithAppend('div', [cardsWrapper], 'cards');
  }
}
