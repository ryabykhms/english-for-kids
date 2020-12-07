import Component from '../base/Component';

export default class Rating extends Component {
  constructor(elements, props) {
    super(elements, props);

    this.rightStar = this.createComponentWithText('div', '0', 'rating__star', 'rating__right');
    this.rightStar.title = 'Count Right Answers';

    this.wrongStar = this.createComponentWithText('div', '0', 'rating__star', 'rating__wrong');
    this.wrongStar.title = 'Count Wrong Answers';

    this.rootElement = this.createComponentWithAppend(
      'div',
      [this.rightStar, this.wrongStar],
      'rating'
    );

    this.update(props);
  }

  update({ isPlayMode }) {
    this.rootElement.classList.toggle('rating--play', isPlayMode);
  }
}
