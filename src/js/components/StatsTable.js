import Component from '../base/Component';

export default class StatsTable extends Component {
  constructor(elements, props) {
    super(elements, props);

    const thList = this.createThList();
    const trTh = this.createComponentWithAppend('tr', thList);
    const trList = this.createTrList();

    this.rootElement = this.createComponentWithAppend('table', [trTh].concat(trList), 'stats');
  }

  createThList() {
    const thList = [
      this.createCell('th', 'Word'),
      this.createCell('th', 'Translation'),
      this.createCell('th', 'Category'),
      this.createCell('th', 'Clicks'),
      this.createCell('th', 'Correct'),
      this.createCell('th', 'Wrong'),
      this.createCell('th', '% win'),
    ];
    return thList;
  }

  createTrList() {
    return Object.keys(this.props.cards)
      .map((key) => {
        const { category } = this.props.cards[key];
        const elements = [];
        elements.push(
          ...this.props.cards[key].words.map((word) => {
            const element = document.createElement('tr');
            const trContent = [
              this.createCell('td', word.word),
              this.createCell('td', word.translation),
              this.createCell('td', category),
              this.createCell('td', word.clicks),
              this.createCell('td', word.correct),
              this.createCell('td', word.wrong),
              this.createCell('td', word.winPercent),
            ];
            element.append(...trContent);
            return element;
          })
        );
        return elements;
      })
      .flat();
  }

  createCell(tag, name) {
    return this.createComponentWithText(tag, name);
  }
}
