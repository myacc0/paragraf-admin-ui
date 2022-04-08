import logo from '@iso/assets/images/site-logo/logo-orange.png';
import icon from '@iso/assets/images/site-logo/icon-orange.png';

export default {
  siteName: 'ISOMORPHIC',
  siteIcon: icon,
  siteLogo: logo,
  footerText: `Isomorphic @ ${new Date().getFullYear()} Created by RedQ, Inc`,
  enableAnimatedRoute: false,
  apiUrl: 'http://yoursite.com/api/',
  google: {
    analyticsKey: 'UA-xxxxxxxxx-1',
  },
  dashboard: '/dashboard',
};
