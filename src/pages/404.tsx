import React from 'react';
import { useLocation } from '@gatsbyjs/reach-router';

import Layout from '../layout';
import Seo from '../components/seo';

/**
 * @description 404 페이지
 * @return {JSX.Element}
 */
function NotFoundPage() {
  const location = useLocation();

  return (
    <Layout>
      <Seo title="404: Not found" pathname={location.pathname} />
      <h1>404: Not Found</h1>
      <p>You just hit a route that doesn&#39;t exist... the sadness.</p>
    </Layout>
  );
}

export default NotFoundPage;
