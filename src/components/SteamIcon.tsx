import React from 'react';
import { graphql, useStaticQuery } from 'gatsby';
import Img, { FixedObject } from 'gatsby-image';

import { SteamIconQuery } from '../../types/query';

interface IconProps {
  children?: never;
}

export const SteamIcon: React.FC<IconProps> = () => {
  const { file } = useStaticQuery<SteamIconQuery>(query);
  const fixed = file?.childImageSharp?.fixed as FixedObject | undefined;
  return <Img alt="steam" fixed={fixed} />;
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
