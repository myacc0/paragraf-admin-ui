import React from 'react';
import { Link } from 'react-router-dom';
import siteConfig from '@iso/config/site.config';

export default ({ collapsed }) => {
  return (
    <div className="isoLogoWrapper">
      {collapsed ? (
        <div>
          <h3>
            <Link to="/dashboard">
              {/*<i className={siteConfig.siteIcon} />*/}
              <img src={siteConfig.siteIcon} alt="flag" />
            </Link>
          </h3>
        </div>
      ) : (
        <h3>
          {/*<Link to="/dashboard">{siteConfig.siteName}</Link>*/}
          <Link to="/dashboard">
            <img src={siteConfig.siteLogo} alt="flag" />
          </Link>
        </h3>
      )}
    </div>
  );
};
