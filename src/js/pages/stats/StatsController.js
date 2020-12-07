import Controller from '../../base/Controller';
import StatsView from './StatsView';
import StatsModel from './StatsModel';
import Main from '../../components/Main';
import StatsTable from '../../components/StatsTable';
import StatsContainer from '../../components/StatsContainer';
import ResetStatsButton from '../../components/ResetStatsButton';
import RepeatButton from '../../components/RepeatButton';

export default class StatsController extends Controller {
  constructor() {
    super();
    this.model = new StatsModel();
    this.view = new StatsView();
  }

  index() {
    const { state } = this.model;

    const statsTable = new StatsTable(null, state);
    const resetButton = new ResetStatsButton(null, state);
    const repeatButton = new RepeatButton(null, state);
    const statsContainer = new StatsContainer([resetButton, repeatButton, statsTable], state);
    const main = new Main([statsContainer], state);

    resetButton.on('resetStats', () => this.resetStats());
    repeatButton.on('repeatDifficult', () => this.repeatDifficult());

    this.addMainContent(main, state, 'stats');
    super.index();
  }

  resetStats() {
    this.model.resetState();
    window.location.reload();
  }

  repeatDifficult() {
    const difficultWords = this.model.getDifficultWords();

    if (difficultWords.length) {
      window.location = '/category/repeat';
    } else {
      alert('No difficult words at the moment!');
    }
  }
}
