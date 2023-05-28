import * as React from 'react';

interface IconLinkProps {
  children: React.ReactElement;
  href: string;
  label: string;
}

export const IconLink: React.FC<IconLinkProps> = ({ children, href, label }) => (
  <div className="tooltip" data-tip={label}>
    <a className="btn btn-circle" target="_blank" rel="noreferrer" href={href}>
      {React.cloneElement(children, { 'aria-label': label })}
    </a>
  </div>
);
