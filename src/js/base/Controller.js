import Navigation from '../components/Navigation';
import Header from '../components/Header';
import Title from '../components/Title';
import SwitchButton from '../components/SwitchButton';
import Footer from '../components/Footer';

export default class Controller {
  constructor() {
    this.view = '';
    this.model = '';
    this.components = [];
  }

  addMainContent(main, state, menuItemKey) {
    this.model.setCurrentMenuItem(menuItemKey);

    const navigation = new Navigation(null, state);
    const title = new Title(null, state);

    const switchButton = new SwitchButton(null, state);
    switchButton.on('changeMode', () => this.changeMode());

    const header = new Header([navigation, title, switchButton], state);
    const footer = new Footer(null, state);

    this.components.push(header, main, footer);
    this.propagateState();
  }

  index() {
    this.view.render(this.components);
  }

  changeMode() {
    this.model.changeMode();

    this.propagateState();

    return this.model.isPlayMode();
  }

  propagateState() {
    const { state } = this.model;
    this.components.forEach((element) => {
      element.update(state);
    });
  }
}
