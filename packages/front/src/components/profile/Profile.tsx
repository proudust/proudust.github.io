import * as React from 'react';

import { StaticImage } from 'gatsby-plugin-image';
import { FaGithub, FaSteamSymbol, FaTwitter } from 'react-icons/fa';

import { IconLink } from '../icon-link/IconLink';

export const Profile: React.FC = () => {
  return (
    <footer
      aria-label="Author Information"
      className="flex flex-col gap-4 p-4 items-center lg:container sm:flex-row"
    >
      <StaticImage alt="Proudust" className="rounded-full w-12 h-12" src="avatar.jpg" />
      <div className="grow">
        <p aria-label="Name" className="text-center sm:text-start">
          Proudust
        </p>
        <p aria-label="Bio" className="text-center text-xs sm:text-start">
          Virtual cockadoodledoo
        </p>
      </div>
      <ul aria-label="SNS Links" className="flex gap-2">
        <li>
          <IconLink href="https://twitter.com/proudust/" label="Twitter">
            <FaTwitter size={28} />
          </IconLink>
        </li>
        <li>
          <IconLink href="https://github.com/proudust/" label="GitHub">
            <FaGithub size={28} />
          </IconLink>
        </li>
        <li>
          <IconLink href="https://steamcommunity.com/id/proudust/" label="Steam">
            <FaSteamSymbol size={28} />
          </IconLink>
        </li>
      </ul>
    </footer>
  );
};
