import Component from '../base/Component';

export default class SwitchButton extends Component {
  constructor(elements, props) {
    super(elements, props);

    const label = this.createComponent('span', 'switch__label');
    const switcher = this.createComponent('span', 'switch__switcher');

    this.checkbox = this.createCheckboxComponent('switch__checkbox');
    this.checkbox.addEventListener('change', () => this.emit('changeMode'));

    const switchWrapper = this.createComponentWithAppend(
      'label',
      [this.checkbox, label, switcher],
      'switch'
    );

    this.rootElement = this.createComponentWithAppend(
      'div',
      [switchWrapper],
      'header__switch',
      'switch-box'
    );
  }

  update({ isPlayMode }) {
    this.checkbox.checked = isPlayMode;
  }
}
