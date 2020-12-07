import Component from '../base/Component';

export default class Main extends Component {
  constructor(elements, props) {
    super(elements, props);
    this.rootElement = this.createComponentWithAppend('main', this.getRootOfElements());
  }
}
