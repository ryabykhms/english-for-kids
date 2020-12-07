import Model from '../../base/Model';

export default class CategoryModel extends Model {
  constructor() {
    super();

    this.counterAnswers = {
      right: 0,
      wrong: 0,
    };
  }

  addRightAnswer(category, index) {
    this.counterAnswers.right += 1;
    this.state.cards[category].words[index].correct += 1;
    this.addPercentWin(category, index);
    this.emit('changeState', this.state);
  }

  addWrongAnswer(category, index) {
    this.counterAnswers.wrong += 1;
    this.state.cards[category].words[index].wrong += 1;
    this.addPercentWin(category, index);
    this.emit('changeState', this.state);
  }

  addPercentWin(category, index) {
    const { correct, wrong } = this.state.cards[category].words[index];
    const winPercent = Math.round((correct * 100) / (correct + wrong));
    this.state.cards[category].words[index].winPercent = winPercent;
  }

  resetAnswerCounter() {
    this.counterAnswers = {
      right: 0,
      wrong: 0,
    };
  }
}
