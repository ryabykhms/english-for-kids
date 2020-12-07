import Component from '../base/Component';

export default class GameOver extends Component {
  constructor(elements, props) {
    super(elements, props);

    this.result = this.createComponent('div', 'game-over__result');
    this.smile = this.createComponent('div', 'game-over__smile');

    this.rootElement = this.createComponentWithAppend(
      'div',
      [this.result, this.smile],
      'game-over'
    );
  }

  setResult(isSuccess, count) {
    if (isSuccess) {
      this.result.textContent = 'Win';
      this.smile.classList.add('game-over__smile--win');
    } else {
      this.result.textContent = `${count} errors`;
      this.smile.classList.add('game-over__smile--loss');
    }
  }
}
