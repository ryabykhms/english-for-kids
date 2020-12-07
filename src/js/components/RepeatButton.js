import Component from '../base/Component';

export default class RepeatButton extends Component {
  constructor(elements, props) {
    super(elements, props);

    this.rootElement = this.createComponentWithText(
      'button',
      'Repeat difficult words',
      'stats__repeat'
    );
    this.rootElement.addEventListener('click', () => this.emit('repeatDifficult'));
  }
}
