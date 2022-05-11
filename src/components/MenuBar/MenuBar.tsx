import React, { useState } from 'react';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';

import Button from '@material-ui/core/Button';
import EndCallButton from '../Buttons/EndCallButton/EndCallButton';
import { isMobile } from '../../utils';
import Menu, { IconContainer } from './Menu/Menu';
import useRoomState from '../../hooks/useRoomState/useRoomState';
import useVideoContext from '../../hooks/useVideoContext/useVideoContext';
import { Typography, Grid, Hidden, MenuItem } from '@material-ui/core';
import ToggleAudioButton from '../Buttons/ToggleAudioButton/ToggleAudioButton';
import ToggleChatButton from '../Buttons/ToggleChatButton/ToggleChatButton';
import ToggleVideoButton from '../Buttons/ToggleVideoButton/ToggleVideoButton';
import ToggleScreenShareButton from '../Buttons/ToogleScreenShareButton/ToggleScreenShareButton';
import ToggleRecordingButton from '../Buttons/ToggleRecordingButton/ToggleRecordingButton';
import StartRecordingIcon from '../../icons/StartRecordingIcon';
import StopRecordingIcon from '../../icons/StopRecordingIcon';
import { useAppState } from '../../state';
import useIsRecording from '../../hooks/useIsRecording/useIsRecording';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    container: {
      backgroundColor: theme.palette.primary.main,
      bottom: 0,
      left: 0,
      right: 0,
      height: `${theme.footerHeight}px`,
      position: 'fixed',
      display: 'flex',
      padding: '0 1.43em',
      zIndex: 10,
      [theme.breakpoints.down('sm')]: {
        height: `${theme.mobileFooterHeight}px`,
        padding: 0,
      },
    },
    screenShareBanner: {
      position: 'fixed',
      zIndex: 8,
      bottom: `${theme.footerHeight}px`,
      left: 0,
      right: 0,
      height: '104px',
      background: 'rgba(0, 0, 0, 0.5)',
      '& h6': {
        color: 'white',
      },
      '& button': {
        background: '#FF2323',
        color: 'white',
        margin: '0 2em',
        '&:hover': {
          background: '#FF2323',
          transform: 'scale(0.95)',
        },
      },
    },
    hideMobile: {
      display: 'initial',
      [theme.breakpoints.down('sm')]: {
        display: 'none',
      },
    },
    menuBtn: {
      background: '#2F313E',
      margin: '0 3px 0 3px',
    },
    menuItemGap: {
      gap: '1em',
    },
  })
);

export default function MenuBar() {
  const classes = useStyles();
  const { isSharingScreen, toggleScreenShare } = useVideoContext();
  const roomState = useRoomState();
  const isReconnecting = roomState === 'reconnecting';
  const isRecording = useIsRecording();

  const { isFetching, updateRecordingRules, roomType } = useAppState();

  return (
    <>
      {isSharingScreen && (
        <Grid container justifyContent="center" alignItems="center" className={classes.screenShareBanner}>
          <Typography variant="h6">You are sharing your screen</Typography>
          <Button onClick={() => toggleScreenShare()}>Stop Sharing</Button>
        </Grid>
      )}
      <footer className={classes.container}>
        <Grid container justifyContent="space-around" alignItems="center">
          <Grid item>
            <Grid container justifyContent="center" className={classes.menuItemGap}>
              <ToggleAudioButton disabled={isReconnecting} className={classes.menuBtn} />
              <ToggleVideoButton disabled={isReconnecting} className={classes.menuBtn} />

              {!isSharingScreen && !isMobile && <ToggleScreenShareButton disabled={isReconnecting} />}
              <EndCallButton />
              {process.env.REACT_APP_DISABLE_TWILIO_CONVERSATIONS !== 'true' && (
                <ToggleChatButton className={classes.menuBtn} />
              )}
              {roomType !== 'peer-to-peer' && roomType !== 'go' && (
                <ToggleRecordingButton
                  disabled={isFetching}
                  className={classes.menuBtn}
                  data-cy-recording-button
                  isRecording={isRecording}
                ></ToggleRecordingButton>
              )}
              <Hidden smDown>
                <Menu />
              </Hidden>
            </Grid>
          </Grid>
        </Grid>
      </footer>
    </>
  );
}
