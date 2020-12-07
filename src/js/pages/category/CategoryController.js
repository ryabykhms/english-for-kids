import Controller from '../../base/Controller';
import CategoryView from './CategoryView';
import CategoryModel from './CategoryModel';
import Cards from '../../components/Cards';
import CardFlipList from '../../components/CardFlipList';
import Main from '../../components/Main';
import PlayButton from '../../components/PlayButton';
import Rating from '../../components/Rating';
import GameOver from '../../components/GameOver';

export default class CategoryController extends Controller {
  constructor() {
    super();
    this.model = new CategoryModel();
    this.view = new CategoryView();
  }

  index(args) {
    this.model.setCurrentCategory(args);
    const { state } = this.model;

    const rating = new Rating(null, state);
    this.rating = rating;

    const cardList = new CardFlipList(null, state);
    this.cardList = cardList;
    this.cardList.on('cardClick', ({ category, card, i }) => this.cardClick({ category, card, i }));

    const playButton = new PlayButton(null, state);
    playButton.on('play', (target) => this.play(target));

    const cards = new Cards([rating, cardList, playButton], state);
    const main = new Main([cards], state);

    this.view.on('playGame', (target) => this.playGame(target));

    this.gameOver = new GameOver(null, state);

    this.constAudios = {
      success: new Audio('../../assets/sounds/success.mp3'),
      failure: new Audio('../../assets/sounds/failure.mp3'),
      correct: new Audio('../../assets/sounds/correct.mp3'),
      error: new Audio('../../assets/sounds/error.mp3'),
    };

    this.addMainContent(main, state, args);
    super.index();
  }

  cardClick({ category, card, i }) {
    const { isPlayMode } = this.model.state;
    if (!isPlayMode) {
      this.model.addClick(category, card, i);
    }
  }

  handleRightAnswer(category, index) {
    this.model.addRightAnswer(category, index);
    this.rating.rightStar.textContent = this.model.counterAnswers.right;
    this.constAudios.correct.play();
    this.setCurrentAudioAndWord();
    if (this.currentAudio) {
      this.currentAudio.audio.play();
    } else {
      this.endGame();
    }
  }

  handleWrongAnswer(category, index) {
    this.model.addWrongAnswer(category, index);
    this.rating.wrongStar.textContent = this.model.counterAnswers.wrong;
    this.constAudios.error.play();
  }

  playGame(target) {
    if (!this.model.isPlayGame()) return;

    const card = target.closest('.card-flip');
    const isRepeatBtn = target.classList.contains('play-button--repeat');
    const isCardExists = !!card;
    const cardWasSuccess =
      isCardExists && card.firstElementChild.classList.contains('card-flip--inactive');
    const isRightAnswer = isCardExists && card.dataset.word === this.currentAudio.word;

    if (isCardExists && isRightAnswer && !cardWasSuccess) {
      card.firstElementChild.classList.add('card-flip--inactive');
      this.handleRightAnswer(this.currentWord.category, this.currentWord.index);
    }

    if (isCardExists && !isRightAnswer && !cardWasSuccess) {
      this.handleWrongAnswer(this.currentWord.category, this.currentWord.index);
    }

    if (isRepeatBtn) {
      this.currentAudio.audio.play();
    }
  }

  endGame() {
    const { right, wrong } = this.model.counterAnswers;
    const isSuccess = wrong === 0;
    const result = isSuccess ? right : wrong;
    this.gameOver.setResult(isSuccess, result);
    this.view.rootElement.innerHTML = '';
    this.view.rootElement.append(this.gameOver.rootElement);
    if (isSuccess) {
      this.constAudios.success.play();
    } else {
      this.constAudios.failure.play();
    }
    setTimeout(() => {
      window.location = '/';
    }, 5000);
  }

  setCurrentAudioAndWord() {
    const random = Math.floor(Math.random() * this.audios.length);
    const [audio] = this.audios.splice(random, 1);
    const [card] = this.cards.splice(random, 1);
    this.currentAudio = audio;
    this.currentWord = card
      ? {
          category: card.dataset.category,
          index: card.dataset.index,
        }
      : null;
  }

  play(target) {
    const isPlayMode = this.model.isPlayMode();
    if (!target.classList.contains('play-button--repeat') && isPlayMode) {
      this.model.startPlayGame();
      this.audios = this.cardList.audio.slice();
      this.cards = this.cardList.cards.slice();
      this.setCurrentAudioAndWord();
    } else if (!isPlayMode) {
      this.model.endPlayGame();
    }
    target.classList.add('play-button--repeat', isPlayMode);
  }

  changeMode() {
    const isPlayMode = this.model.isPlayMode();

    if (!isPlayMode) {
      this.model.resetAnswerCounter();
      this.rating.rightStar.textContent = 0;
      this.rating.wrongStar.textContent = 0;
    }

    return super.changeMode();
  }
}
