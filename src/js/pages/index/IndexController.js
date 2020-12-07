import Controller from '../../base/Controller';
import IndexView from './IndexView';
import IndexModel from './IndexModel';
import Cards from '../../components/Cards';
import CardList from '../../components/CardList';
import Main from '../../components/Main';

export default class IndexController extends Controller {
  constructor() {
    super();
    this.model = new IndexModel();
    this.view = new IndexView();
  }

  index() {
    const { state } = this.model;

    const cardList = new CardList(null, state);
    const cards = new Cards([cardList], state);
    const main = new Main([cards], state);

    this.addMainContent(main, state, 'main');
    super.index();
  }
}
