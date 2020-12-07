import Component from '../base/Component';

export default class StatsContainer extends Component {
  constructor(elements, props) {
    super(elements, props);

    const statsWrapper = this.createWrapperComponent(
      'div',
      this.getRootOfElements(),
      'stats__wrapper'
    );

    this.rootElement = this.createComponentWithAppend('div', [statsWrapper], 'stats-section');
  }
}
