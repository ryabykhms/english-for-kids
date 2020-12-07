import Model from '../../base/Model';

export default class StatsModel extends Model {
  constructor() {
    super();
  }

  getDifficultWords() {
    const wrongWords = [];
    const MAX_COUNT_CARDS = 8;

    Object.keys(this.state.cards).forEach((card) => {
      const { words } = this.state.cards[card];
      words.filter((word, i) => {
        const isDifficult = (word.correct > 0 || word.wrong > 0) && word.winPercent < 100;
        if (isDifficult) {
          wrongWords.push({
            category: card,
            index: i,
            word,
          });
        }

        return isDifficult;
      });
    });

    if (wrongWords.length && wrongWords.length > MAX_COUNT_CARDS) {
      return wrongWords.slice(0, MAX_COUNT_CARDS);
    }

    this.state.repeatWords = wrongWords;
    this.emit('changeState', this.state);

    return wrongWords;
  }
}
