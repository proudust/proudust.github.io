import React from 'react';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import {
  AppBar,
  Avatar,
  Button,
  CssBaseline,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Container,
  Grid,
  IconButton,
  Toolbar,
  Typography,
} from '@material-ui/core';
import {
  GitHub as GitHubIcon,
  Twitter as TwitterIcon,
} from '@material-ui/icons';

import { ProductCard } from './Products';
import { QiitaIcon, SteamIcon } from './Icons';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    toolbar: theme.mixins.toolbar,
    header: {
      padding: theme.spacing(3, 0),
    },
    content: {
      padding: theme.spacing(3),
    },
  }),
);

const App: React.FC = () => {
  const classes = useStyles();

  return (
    <>
      <CssBaseline />
      <AppBar position="fixed">
        <Toolbar>
          <Typography variant="h6" noWrap>
            proudust.github.io
          </Typography>
        </Toolbar>
      </AppBar>
      <main className={classes.content}>
        <div className={classes.toolbar} />
        <Container maxWidth="md">
          <Typography variant="h5" className={classes.header}>
            プロフィール
          </Typography>
          <Card>
            <CardHeader
              avatar={
                <Avatar
                  alt="Proudust"
                  src="http://www.gravatar.com/avatar/7c5f546f80eeb2c158c8699d2f8bbc4f"
                />
              }
              title="Proudust"
            />
            <CardContent>
              <Typography variant="body2" component="p">
                {`
                  TypeScript(React, GAS), Kotlin(Android), C#(ASP,NET, WinForms), Python2(Ren'Py)な無職鶏。
                  一応FE(基本情報), AP(応用情報)持ってる。
                `}
              </Typography>
            </CardContent>
            <CardActions disableSpacing>
              <IconButton
                aria-label="twitter"
                component="a"
                href="https://twitter.com/proudust"
              >
                <TwitterIcon />
              </IconButton>
              <IconButton
                aria-label="github"
                component="a"
                href="https://github.com/proudust"
              >
                <GitHubIcon />
              </IconButton>
              <IconButton
                aria-label="qiita"
                component="a"
                href="https://qiita.com/proudust"
              >
                <QiitaIcon />
              </IconButton>
              <IconButton
                aria-label="qiita"
                component="a"
                href="https://steamcommunity.com/id/proudust/"
              >
                <SteamIcon />
              </IconButton>
            </CardActions>
          </Card>
          <Typography variant="h5" className={classes.header}>
            作ったもの
          </Typography>
          <Grid container spacing={2}>
            <Grid item sm={6} xs={12}>
              <ProductCard
                title="DDLC 日本語化パッチ (DDLC翻訳部)"
                description="ゲーム Doki Doki Literature Club! (邦題：ドキドキ文芸部)
                を日本語化する非公式パッチ。翻訳所とパッチの作成・配布を担当。"
                image="https://camo.githubusercontent.com/25db4ba4b5b3215a03fdbf9c3cb5ca6961af6e64/68747470733a2f2f737465616d75736572696d616765732d612e616b616d616968642e6e65742f7567632f3932343739373239363531353030343330302f443642363846314336354636324641414544463335424132423245413543433745414242314435442f"
              >
                <Button
                  size="small"
                  color="primary"
                  component="a"
                  href="https://steamcommunity.com/sharedfiles/filedetails/?id=1296040205"
                >
                  DOWNLOAD
                </Button>
                <Button
                  size="small"
                  color="primary"
                  component="a"
                  href="https://github.com/proudust/ddlc-jp-patch"
                >
                  GITHUB
                </Button>
              </ProductCard>
            </Grid>
            <Grid item sm={6} xs={12}>
              <ProductCard
                title="MAS 日本語化パッチ (DDLC翻訳部)"
                description="ゲーム Doki Doki Literature Club! のファンメイド MOD、Monika After Storyを日本語化する非公式パッチ。翻訳所とパッチの作成・配布、一部翻訳を担当。"
                image="https://camo.githubusercontent.com/652cc3bfd47921c6babfab9e4a82699513969b60/68747470733a2f2f737465616d75736572696d616765732d612e616b616d616968642e6e65742f7567632f3932303239373032363135313131393637342f333341353331353732373831324532443935384231384545413830423837304243453436373338432f"
              >
                <Button
                  size="small"
                  color="primary"
                  component="a"
                  href="https://steamcommunity.com/sharedfiles/filedetails/?id=1331592265"
                >
                  DOWNLOAD
                </Button>
                <Button
                  size="small"
                  color="primary"
                  component="a"
                  href="https://github.com/proudust/ddlc-mas-jp-patch"
                >
                  GITHUB
                </Button>
              </ProductCard>
            </Grid>
            <Grid item sm={6} xs={12}>
              <ProductCard
                title="OneShot Solstice Replay MOD"
                description="ゲーム OneShot において通常 1 度しかプレイできない Solstice ルートをリプレイ可能にするファンメイド MOD。"
                image="https://user-images.githubusercontent.com/20186429/63818916-2a0bf600-c97e-11e9-8924-ae7d2b378abb.jpg"
              >
                <Button
                  size="small"
                  color="primary"
                  component="a"
                  href="https://steamcommunity.com/sharedfiles/filedetails/?id=1847319248"
                >
                  DOWNLOAD
                </Button>
                <Button
                  size="small"
                  color="primary"
                  component="a"
                  href="https://github.com/proudust/oneshot-solstice-replay-mod"
                >
                  GITHUB
                </Button>
              </ProductCard>
            </Grid>
            <Grid item sm={6} xs={12}>
              <ProductCard
                title="PAYDAY2 Big Oil Day2 Calculator"
                description="ゲーム PAYDAY2 の Big Oil Day2 で正解の融合炉を探すための計算機。"
                image="https://user-images.githubusercontent.com/20186429/71155468-224fc480-2281-11ea-8c86-d2d170f04aed.png"
              >
                <Button
                  size="small"
                  color="primary"
                  component="a"
                  href="https://proudust.github.io/payday2-bigoil/"
                >
                  LINK
                </Button>
                <Button
                  size="small"
                  color="primary"
                  component="a"
                  href="https://github.com/proudust/payday2-bigoil"
                >
                  GITHUB
                </Button>
              </ProductCard>
            </Grid>
          </Grid>
        </Container>
      </main>
    </>
  );
};

export default App;
