import Component from '../base/Component';

export default class RepeatButton extends Component {
  constructor(elements, props) {
    super(elements, props);

    this.rootElement = this.createComponentWithText(
      'button',
      'Repeat difficult words',
      'button',
      'stats__button',
      'stats__repeat'
    );
    this.rootElement.addEventListener('click', () => this.emit('repeatDifficult'));

    this.update(props);
  }

  update({ isPlayMode }) {
    this.rootElement.classList.toggle('button--train', !isPlayMode);
  }
}
