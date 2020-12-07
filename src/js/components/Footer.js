import Component from '../base/Component';
import LINKS from '../constants/links';
import ROUTES from '../constants/routes';
import STRINGS from '../constants/strings';

export default class Footer extends Component {
  constructor(elements, props) {
    super(elements, props);

    const rssImg = this.createImageComponent(LINKS.RSSCHOOL_LOGO, 'RS School', 'footer__logo');
    const rssLink = this.createLinkComponent(LINKS.RSSCHOOL, [rssImg], 'footer__link');
    const year = this.createComponentWithText('span', '2020', 'footer__year');
    const copy = this.createComponentWithHtml('span', '&copy;', 'footer__copyright');

    const authorLink = this.createLinkComponent(
      LINKS.GITHUB,
      [STRINGS.AUTHOR],
      'footer__author',
      'footer__link'
    );

    const authorCopyright = this.createComponentWithAppend(
      'div',
      [year, copy, authorLink],
      'footer__credentials'
    );

    const statsLink = this.createLinkComponent(ROUTES.STATS.PATH, ['Statistics'], 'footer__link');

    const cardsWrapper = this.createWrapperComponent(
      'div',
      [rssLink, authorCopyright, statsLink],
      'footer__wrapper'
    );

    this.rootElement = this.createComponentWithAppend('footer', [cardsWrapper], 'footer');
  }
}
