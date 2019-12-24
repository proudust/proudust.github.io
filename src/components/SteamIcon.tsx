import React from 'react';
import { graphql, useStaticQuery } from 'gatsby';
import Img from 'gatsby-image';

import { SteamIconQuery } from '../../types/query';

export const SteamIcon: React.FC = () => {
  const { file } = useStaticQuery<SteamIconQuery>(query);
  return <Img alt="steam" fixed={file?.childImageSharp?.fixed} />;
};

export const query = graphql`
  query SteamIcon {
    file(relativePath: { eq: "steam-favicon.png" }) {
      childImageSharp {
        fixed(width: 24, height: 24) {
          ...GatsbyImageSharpFixed
        }
      }
    }
  }
`;
