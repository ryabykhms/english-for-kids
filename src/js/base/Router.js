import ROUTES from '../constants/routes';

export default {
  routes: [],
  notFoundRoute: {
    route: ROUTES.NOT_FOUND.PATH,
    title: ROUTES.NOT_FOUND.TITLE,
    handler: () => {
      console.log('404');
    },
  },

  add(route, title, controller, method) {
    this.routes.push({
      route,
      title,
      controller,
      method,
    });
    return this;
  },

  replaceArgs(route, path) {
    const args = this.getArgs(route, path);
    if (!args) {
      return route;
    }
    const routeWithArgs = route.replace('{args}', args);
    return routeWithArgs;
  },

  getArgs(route, path) {
    const routeArr = route.split('/');
    const pathArr = path.split('/');
    const argsIndex = routeArr.indexOf('{args}');
    const isSameLength = routeArr.length === pathArr.length;
    let args = false;
    if (isSameLength && argsIndex !== -1) {
      args = pathArr[argsIndex];
    }
    return args;
  },

  navigate(path) {
    const { routes, notFoundRoute } = this;
    const pathName = path || window.location.pathname;
    let route = routes.find((item) => {
      const currentRoute = this.replaceArgs(item.route, pathName);
      return currentRoute === pathName;
    });
    route = route || notFoundRoute;
    const args = this.getArgs(route.route, pathName);
    window.history.pushState(null, route.title, this.replaceArgs(route.route, pathName));
    route.controller[route.method](args);
  },
};
