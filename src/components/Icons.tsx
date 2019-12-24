import React from 'react';
import { graphql, useStaticQuery } from 'gatsby';
import Img from 'gatsby-image';

import { IconsQuery } from '../../types/query';

export const QiitaIcon: React.FC = () => {
  const data = useStaticQuery<IconsQuery>(query);
  return <Img alt="qiita" fixed={data.QiitaFavicon?.childImageSharp?.fixed} />;
};

export const SteamIcon: React.FC = () => {
  const data = useStaticQuery<IconsQuery>(query);
  return <Img alt="steam" fixed={data.SteamFavicon?.childImageSharp?.fixed} />;
};

export const query = graphql`
  query Icons {
    QiitaFavicon: file(relativePath: { eq: "qiita-favicon.png" }) {
      childImageSharp {
        fixed(width: 24, height: 24) {
          ...GatsbyImageSharpFixed
        }
      }
    }
    SteamFavicon: file(relativePath: { eq: "steam-favicon.png" }) {
      childImageSharp {
        fixed(width: 24, height: 24) {
          ...GatsbyImageSharpFixed
        }
      }
    }
  }
`;
