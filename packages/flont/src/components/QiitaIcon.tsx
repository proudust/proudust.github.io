import React from 'react';
import { graphql, useStaticQuery } from 'gatsby';
import Img, { FixedObject } from 'gatsby-image';

import type { QiitaIconQuery } from '../../types/query';

interface IconProps {
  children?: never;
}

export const QiitaIcon: React.FC<IconProps> = () => {
  const { file } = useStaticQuery<QiitaIconQuery>(query);
  const fixed = file?.childImageSharp?.fixed as FixedObject | undefined;
  return <Img alt="qiita" fixed={fixed} />;
};

export const query = graphql`
  query QiitaIcon {
    file(relativePath: { eq: "qiita-favicon.png" }) {
      childImageSharp {
        fixed(width: 24, height: 24) {
          base64
          width
          height
          src
          srcSet
        }
      }
    }
  }
`;
