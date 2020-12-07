import Component from '../base/Component';

export default class CardList extends Component {
  constructor(elements, props) {
    super(elements, props);

    this.generateCards();
    this.rootElement = this.createComponentWithAppend('div', [...this.cards], 'card-list');
    this.rootElement.addEventListener('click', (e) => this.emit('flipCard', e.target));

    this.on('playAudio', (target) => this.playAudio(target));
    this.on('flipCard', (target) => {
      if (target.classList.contains('rotate-img')) {
        const cardFlipInner = target.closest('.card-flip__inner');
        cardFlipInner.classList.add('card-flip--flipped');
      }
    });
    this.on('flipCardEnd', (target) => {
      const cardFlipInner = target.firstElementChild;
      if (cardFlipInner.classList.contains('card-flip--flipped')) {
        cardFlipInner.classList.remove('card-flip--flipped');
      }
    });
  }

  playAudio(target) {
    const parent = target.closest('.card-flip');
    const isRotateBtn = target.classList.contains('rotate-img');
    const isFlipped = target.closest('.card-flip--flipped');
    const isPlay = target.closest('.card-flip--play');
    if (parent && !isRotateBtn && !isFlipped && !isPlay) {
      this.audio[parent.dataset.index].audio.play();
    }
  }

  generateCards() {
    this.cards = [];
    this.audio = [];
    const { cards, currentCategory, repeatWords } = this.props;
    let cardList = [];
    const isRepeatCategory = currentCategory === 'repeat';
    if (isRepeatCategory) {
      cardList = repeatWords;
    } else {
      cardList = cards[currentCategory].words;
    }

    cardList.forEach((item, i) => {
      const category = isRepeatCategory ? item.category : currentCategory;
      const card = isRepeatCategory ? item.word : item;
      const cardRotateImg = this.createImageComponent(
        '/assets/images/rotate.svg',
        'Rotate',
        'rotate-img'
      );

      const cardRotateBtn = this.createComponentWithAppend(
        'button',
        [cardRotateImg],
        'card-flip__rotate'
      );

      const cardFlipBackImg = this.createImageComponent(
        card.image,
        card.translation,
        'card-flip__img'
      );

      const cardWord = this.createComponentWithText('span', card.word, 'card__word');

      const cardFlipButtons = this.createComponentWithAppend(
        'div',
        [cardWord, cardRotateBtn],
        'card-flip__buttons'
      );

      const cardFlipImg = this.createImageComponent(card.image, card.word, 'card-flip__img');

      const cardFlipFront = this.createComponentWithAppend(
        'div',
        [cardFlipImg, cardFlipButtons],
        'card-flip__front'
      );

      const cardBackWord = this.createComponentWithText('span', card.translation, 'card__word');

      const cardFlipBackButtons = this.createComponentWithAppend(
        'div',
        [cardBackWord],
        'card-flip__buttons'
      );

      const cardFlipBack = this.createComponentWithAppend(
        'div',
        [cardFlipBackImg, cardFlipBackButtons],
        'card-flip__back'
      );

      const cardFlipInner = this.createComponentWithAppend(
        'div',
        [cardFlipFront, cardFlipBack],
        'card-flip__inner'
      );

      const cardFlip = this.createComponetWithDataset(
        'div',
        {
          index: i,
          word: card.word,
          category,
        },
        [cardFlipInner],
        'card-flip'
      );

      cardFlip.addEventListener('mouseleave', (e) => this.emit('flipCardEnd', e.target));
      cardFlip.addEventListener('click', () => this.emit('cardClick', { category, card, i }));
      cardFlip.addEventListener('click', (e) => this.emit('playAudio', e.target));

      this.audio.push({ word: card.word, audio: new Audio(card.audioSrc) });
      this.cards.push(cardFlip);
    });
  }

  update({ isPlayMode }) {
    this.cards.forEach((card) => {
      card.classList.toggle('card-flip--play', isPlayMode);
    });
  }
}
