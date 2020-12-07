import '../scss/style.scss';
import ROUTES from './constants/routes';
import Router from './base/Router';
import IndexController from './pages/index/IndexController';
import CategoryController from './pages/category/CategoryController';
import StatsController from './pages/stats/StatsController';

Router.add(ROUTES.INDEX.PATH, ROUTES.INDEX.TITLE, new IndexController(), 'index');

Router.add(ROUTES.CATEGORY.PATH, ROUTES.CATEGORY.TITLE, new CategoryController(), 'index');

Router.add(ROUTES.STATS.PATH, ROUTES.STATS.TITLE, new StatsController(), 'index');

document.addEventListener('DOMContentLoaded', () => {
  Router.navigate();
});
