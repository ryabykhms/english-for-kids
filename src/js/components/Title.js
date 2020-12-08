import Component from '../base/Component';

export default class Title extends Component {
  constructor(elements, props) {
    super(elements, props);
    const linkToMainPage = this.createLinkComponent('/', ['English for Kids'], 'header__title');
    this.rootElement = this.createComponentWithAppend('h1', [linkToMainPage]);
  }
}
