import React from 'react';
import { graphql, useStaticQuery } from 'gatsby';
import Img from 'gatsby-image';

import { QiitaIconQuery } from '../../types/query';

export const QiitaIcon: React.FC = () => {
  const { file } = useStaticQuery<QiitaIconQuery>(query);
  return <Img alt="qiita" fixed={file?.childImageSharp?.fixed} />;
};

export const query = graphql`
  query QiitaIcon {
    file(relativePath: { eq: "qiita-favicon.png" }) {
      childImageSharp {
        fixed(width: 24, height: 24) {
          ...GatsbyImageSharpFixed
        }
      }
    }
  }
`;
