import Component from '../base/Component';

export default class PlayButton extends Component {
  constructor(elements, props) {
    super(elements, props);

    this.rootElement = this.createComponentWithText(
      'button',
      'Start Game',
      'button',
      'play-button'
    );
    this.rootElement.addEventListener('click', (e) => this.emit('play', e.target));

    this.update(props);
  }

  update({ isPlayMode }) {
    this.rootElement.classList.toggle('play-button--hide', !isPlayMode);
    this.rootElement.classList.toggle('play-button--repeat', !isPlayMode);
  }
}
