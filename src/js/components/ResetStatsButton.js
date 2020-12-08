import Component from '../base/Component';

export default class ResetStatsButton extends Component {
  constructor(elements, props) {
    super(elements, props);

    this.rootElement = this.createComponentWithText(
      'button',
      'Reset',
      'button',
      'stats__button',
      'stats__reset'
    );
    this.rootElement.addEventListener('click', () => this.emit('resetStats'));

    this.update(props);
  }

  update({ isPlayMode }) {
    this.rootElement.classList.toggle('button--train', !isPlayMode);
  }
}
