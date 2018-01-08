import Markets from './container/Markets';
import ChangeLogs from './container/ChangeLogs';
import VIPGroups from './container/VIPGroups';
// import Gallery from './container/Gallery';

export default {
  markets: {
    title: 'Markets',
    Page: Markets,
    headerType: 'home',
    footerType: 'none',
    cache: true
  },
  changeLogs: {
    title: 'ChangeLogs',
    Page: ChangeLogs,
    headerType: 'home',
    footerType: 'none',
    cache: true
  },
  vipGroups: {
    title: 'VIPGroups',
    Page: VIPGroups,
    headerType: 'home',
    footerType: 'none',
    cache: true,
    cachingWhenForward: true // We want to cache when going back this route
  },
  notFound: {
    title: 'Markets',
    Page: Markets,
    headerType: 'none',
    footerType: 'none',
    cache: true
  }
};
