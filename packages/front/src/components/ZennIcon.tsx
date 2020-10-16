import React from 'react';
import { graphql, useStaticQuery } from 'gatsby';
import Img from 'gatsby-image';

interface IconProps {
  children?: never;
}

export const ZennIcon: React.FC<IconProps> = () => {
  const { file } = useStaticQuery<GatsbyTypes.ZennIconQuery>(query);
  const fixed = file?.childImageSharp?.fixed;
  return <Img alt="zenn" fixed={fixed!} />;
};

export const query = graphql`
  query ZennIcon {
    file(relativePath: { eq: "zenn.png" }) {
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
