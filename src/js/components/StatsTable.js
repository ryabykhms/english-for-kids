import Component from '../base/Component';

export default class StatsTable extends Component {
  constructor(elements, props) {
    super(elements, props);

    this.allWords = this.getAllWords();

    this.thList = this.createThList();
    const trTh = this.createComponentWithAppend('tr', this.thList);
    const trList = this.createTrList();
    this.tbody = this.createComponentWithAppend('tbody', trList);

    this.rootElement = this.createComponentWithAppend('table', [trTh, this.tbody], 'stats');

    this.rootElement.addEventListener('click', (e) => this.emit('sortTable', e.target));

    this.on('sortTable', (target) => this.sortTable(target));
  }

  sortTable(target) {
    const data = target.dataset;
    if (data.orderBy) {
      const newAsc = data.asc === 'true' ? 'false' : 'true';
      const boolAsc = data.asc === 'true';
      this.sortWords(data.orderBy, boolAsc, data.type);
      this.thList[data.index].dataset.asc = newAsc;
      this.tbody.innerHTML = '';
      this.tbody.append(...this.createTrList());
    }
  }

  sortWords(orderBy, isAsc, type) {
    this.allWords.sort((a, b) => {
      const isString = type === 'string';
      let result = 0;

      if (isString) {
        result = isAsc
          ? a[orderBy].localeCompare(b[orderBy])
          : b[orderBy].localeCompare(a[orderBy]);
      } else {
        result = isAsc ? +a[orderBy] - +b[orderBy] : +b[orderBy] - +a[orderBy];
      }

      return result;
    });
  }

  getAllWords() {
    const words = [];
    Object.keys(this.props.cards).forEach((key) => {
      const { category } = this.props.cards[key];
      words.push(
        ...this.props.cards[key].words.map((word) => {
          return { ...word, category };
        })
      );
    });
    return words;
  }

  createThList() {
    const thList = [
      this.creatCellWithData('th', 'Word', {
        orderBy: 'word',
        asc: true,
        index: 0,
        type: 'string',
      }),
      this.creatCellWithData('th', 'Translation', {
        orderBy: 'translation',
        asc: true,
        index: 1,
        type: 'string',
      }),
      this.creatCellWithData('th', 'Category', {
        orderBy: 'category',
        asc: true,
        index: 2,
        type: 'string',
      }),
      this.creatCellWithData('th', 'Clicks', {
        orderBy: 'clicks',
        asc: true,
        index: 3,
        type: 'number',
      }),
      this.creatCellWithData('th', 'Correct', {
        orderBy: 'correct',
        asc: true,
        index: 4,
        type: 'number',
      }),
      this.creatCellWithData('th', 'Wrong', {
        orderBy: 'wrong',
        asc: true,
        index: 5,
        type: 'number',
      }),
      this.creatCellWithData('th', '% win', {
        orderBy: 'winPercent',
        asc: true,
        index: 6,
        type: 'number',
      }),
    ];
    return thList;
  }

  createTrList() {
    return this.allWords.map((word) => {
      const element = document.createElement('tr');
      const trContent = [
        this.createCell('td', word.word),
        this.createCell('td', word.translation),
        this.createCell('td', word.category),
        this.createCell('td', word.clicks),
        this.createCell('td', word.correct),
        this.createCell('td', word.wrong),
        this.createCell('td', word.winPercent),
      ];
      element.append(...trContent);
      return element;
    });
  }

  createCell(tag, name) {
    return this.createComponentWithText(tag, name);
  }

  creatCellWithData(tag, text, dataset) {
    return this.createComponetWithDataset(tag, dataset, text);
  }
}
