import Component from '../base/Component';

export default class ResetStatsButton extends Component {
  constructor(elements, props) {
    super(elements, props);

    this.rootElement = this.createComponentWithText('button', 'Reset', 'stats__reset');
    this.rootElement.addEventListener('click', () => this.emit('resetStats'));
  }
}
