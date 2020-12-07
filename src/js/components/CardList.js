import Component from '../base/Component';

export default class CardList extends Component {
  constructor(elements, props) {
    super(elements, props);

    this.generateCards();

    this.rootElement = this.createComponentWithAppend('div', this.cards, 'card-list');
  }

  generateCards() {
    const { isPlayMode } = this.props;
    this.cards = [];
    Object.keys(this.props.cards).forEach((card) => {
      const { category, route } = this.props.cards[card];
      const firstWord = this.props.cards[card].words[0];
      const playClass = isPlayMode ? 'play' : null;
      const img = this.createImageComponent(firstWord.image, category, 'card__img');
      const span = this.createComponentWithText('span', category, 'card__word');
      const a = this.createLinkComponent(route, [img, span], 'card', 'category', playClass);
      this.cards.push(a);
    });
  }

  update({ isPlayMode }) {
    this.cards.forEach((card) => {
      card.classList.toggle('play', isPlayMode);
    });
  }
}
