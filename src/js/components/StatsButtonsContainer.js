import Component from '../base/Component';

export default class StatsButtonsContainer extends Component {
  constructor(elements, props) {
    super(elements, props);

    this.rootElement = this.createComponentWithAppend(
      'div',
      this.getRootOfElements(),
      'stats__buttons'
    );
  }
}
