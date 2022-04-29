import React from 'react';
import clsx from 'clsx';
import { Theme } from '@mui/material/styles';
import { createStyles, makeStyles } from '@mui/styles';
import CssBaseline from '@mui/material/CssBaseline';

import Header from '../components/Header';
import Menu from '../components/Menu';
import LoginDialog from '../components/LoginDialog';
import LoadingBar from './LoadingBar';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: 'flex',
    },
    drawerHeader: {
      display: 'flex',
      alignItems: 'center',
      padding: theme.spacing(0, 1),
      ...theme.mixins.toolbar,
      justifyContent: 'flex-end',
    },
    content: {
      flexGrow: 1,
      padding: theme.spacing(3),
      transition: theme.transitions.create('margin', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
    },
    contentShift: {
      transition: theme.transitions.create('margin', {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen,
      }),
      marginLeft: 0,
    },
  }),
);

export interface LayoutProps {
  children: any;
}

export default function Layout(props: LayoutProps) {
  const classes = useStyles();
  const [open] = React.useState(false);
  const { children } = props;

  return (
    <div className={classes.root}>
      <CssBaseline />
      <Header />
      {JSON.parse(window._env_.AUTH0_DISABLED) !== true && <LoginDialog />}
      <Menu />
      <main
        className={clsx(classes.content, {
          [classes.contentShift]: open,
        })}
      >
        <div className={classes.drawerHeader} />
        <LoadingBar />

        {children}
      </main>
    </div>
  );
}
