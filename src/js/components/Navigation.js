import Component from '../base/Component';

export default class Navigation extends Component {
  constructor(elements, props) {
    super(elements, props);

    this.menuItems = props.menuItems;
    const items = this.generateItems();
    this.menu = this.createComponentWithAppend('ul', items, 'menu');

    const burger = this.createComponentWithAppend(
      'div',
      [
        this.createBurgerItem('top'),
        this.createBurgerItem('middle'),
        this.createBurgerItem('bottom'),
        this.menu,
      ],
      'burger'
    );

    const navCheckbox = this.createCheckboxComponent('navigation__checkbox');

    const navWrrapper = this.createWrapperComponent(
      'label',
      [navCheckbox, burger],
      'navigation__burger'
    );

    this.rootElement = this.createComponentWithAppend(
      'nav',
      [navWrrapper],
      'header__menu',
      'navigation'
    );
  }

  createBurgerItem(position) {
    return this.createComponent('span', 'burger__item', `burger__${position}`);
  }

  generateItems() {
    const items = [];
    this.menuItems.forEach((menuItem) => {
      const isCurrentMenuItem = menuItem.key === this.props.currentMenuItem;
      const currentItem = isCurrentMenuItem ? 'menu__link--current' : null;
      const a = this.createLinkComponent(
        menuItem.route,
        [menuItem.name],
        'menu__link',
        currentItem
      );
      const li = this.createComponentWithAppend('li', [a], 'menu-item');
      items.push(li);
    });
    return items;
  }

  update({ isPlayMode }) {
    this.menu.classList.toggle('play', isPlayMode);
  }
}
