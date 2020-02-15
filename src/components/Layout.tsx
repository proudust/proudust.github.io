import React, { ReactNode } from 'react';
import { Helmet } from 'react-helmet';
import { makeStyles, Theme, createStyles, useTheme } from '@material-ui/core/styles';
import {
  AppBar,
  Avatar,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Container,
  CssBaseline,
  IconButton,
  Toolbar,
  Typography,
} from '@material-ui/core';
import {
  ArrowBack as ArrowBackIcon,
  GitHub as GitHubIcon,
  Twitter as TwitterIcon,
} from '@material-ui/icons';
import { graphql, useStaticQuery } from 'gatsby';

import { QiitaIcon } from '../components/QiitaIcon';
import { IconLink } from './SmartLink';
import { SteamIcon } from '../components/SteamIcon';
import { LayoutQuery } from '../../types/query';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    header: {
      padding: theme.spacing(3, 0),
    },
    toolbar: theme.mixins.toolbar,
  }),
);

interface LayoutProps {
  children: ReactNode;
  title?: string;
  backref?: string;
}

export const Layout: React.FC<LayoutProps> = props => {
  const classes = useStyles();
  const theme = useTheme();
  const { site, profileYaml } = useStaticQuery<LayoutQuery>(query);
  const siteTitle = site?.siteMetadata?.title ?? '';
  const title = props.title ? `${props.title} - ${siteTitle}` : siteTitle;

  const backButton = (
    <IconLink
      edge="start"
      aria-label="back"
      style={{ color: 'inherit', marginRight: theme.spacing(2) }}
      href={props.backref ?? ''}
    >
      <ArrowBackIcon color="inherit" />
    </IconLink>
  );

  return (
    <>
      <Helmet>
        <meta charSet="utf-8" />
        <title>{title}</title>
      </Helmet>
      <CssBaseline />
      <AppBar position="fixed">
        <Toolbar>
          {props.backref ? backButton : undefined}
          <Typography variant="h6" noWrap>
            {title}
          </Typography>
        </Toolbar>
      </AppBar>
      <div className={classes.toolbar} />
      <Container component="main" maxWidth="md" style={{ marginTop: theme.spacing(3) }}>
        {props.children}
      </Container>
      <hr style={{ marginTop: theme.spacing(3) }} />
      <Container component="footer" maxWidth="md" style={{ marginBottom: theme.spacing(3) }}>
        <Typography variant="h5" className={classes.header}>
          プロフィール
        </Typography>
        <Card>
          <CardHeader
            avatar={<Avatar alt={profileYaml?.name ?? ''} src={profileYaml?.avatar ?? ''} />}
            title={profileYaml?.name}
          />
          <CardContent>
            <Typography variant="body2" component="p">
              {profileYaml?.description}
            </Typography>
          </CardContent>
          <CardActions disableSpacing>
            <IconButton aria-label="twitter" component="a" href={profileYaml?.links?.twitter ?? ''}>
              <TwitterIcon />
            </IconButton>
            <IconButton aria-label="github" component="a" href={profileYaml?.links?.github ?? ''}>
              <GitHubIcon />
            </IconButton>
            <IconButton aria-label="qiita" component="a" href={profileYaml?.links?.qiita ?? ''}>
              <QiitaIcon />
            </IconButton>
            <IconButton aria-label="steam" component="a" href={profileYaml?.links?.steam ?? ''}>
              <SteamIcon />
            </IconButton>
          </CardActions>
        </Card>
      </Container>
    </>
  );
};

export const query = graphql`
  query Layout {
    site {
      siteMetadata {
        title
      }
    }
    profileYaml {
      name
      avatar
      description
      links {
        twitter
        github
        qiita
        steam
      }
    }
  }
`;
