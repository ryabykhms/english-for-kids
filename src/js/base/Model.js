import CARDS from '../constants/cards';
import MENU from '../constants/menu';
import EventEmitter from './EventEmitter';
import Storage from './Storage';

export default class Model extends EventEmitter {
  constructor() {
    super();
    this.storage = new Storage('localStorage');
    this.state = this.storage.get('rms_state') || {
      cards: CARDS,
      menuItems: MENU.MAIN,
      isPlayMode: false,
      isPlayGame: false,
      currentCategory: null,
      currentMenuItem: 'main',
    };

    this.on('changeState', (state) => this.changeState(state));
  }

  changeState(state) {
    this.storage.set('rms_state', state);
  }

  isPlayMode() {
    return this.state.isPlayMode;
  }

  isPlayGame() {
    return this.state.isPlayGame;
  }

  startPlayGame() {
    this.state.isPlayGame = true;
    this.emit('changeState', this.state);
  }

  endPlayGame() {
    this.state.isPlayGame = false;
    this.emit('changeState', this.state);
  }

  changeMode() {
    this.state.isPlayMode = !this.state.isPlayMode;
    if (!this.state.isPlayMode) {
      this.state.isPlayGame = false;
    }
    this.emit('changeState', this.state);
  }

  getState() {
    return this.state;
  }

  setState(state) {
    this.state = state;
    this.emit('changeState', state);
  }

  addCategory(category) {
    this.state.categories.push(category);
  }

  getCard(category) {
    return this.state.cards[category];
  }

  startPlay() {
    this.state.isPlay = true;
  }

  endPlay() {
    this.state.isPlay = false;
  }

  setCurrentCategory(category) {
    this.state.currentCategory = category;
  }

  addClick(cat, card, index) {
    this.state.cards[cat].words[index].clicks += 1;
    this.emit('changeState', this.state);
  }

  resetState() {
    this.state.cards = CARDS;
    this.emit('changeState', this.state);
  }

  setCurrentMenuItem(key) {
    this.state.currentMenuItem = key;
    this.emit('changeState', this.state);
  }
}
