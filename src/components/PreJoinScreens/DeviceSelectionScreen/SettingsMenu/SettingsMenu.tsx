import React, { useState, useRef } from 'react';
import Button from '@material-ui/core/Button';
import MenuContainer from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import MoreIcon from '@material-ui/icons/MoreVert';
import Typography from '@material-ui/core/Typography';
import { makeStyles, Theme, useMediaQuery } from '@material-ui/core';

import AboutDialog from '../../../AboutDialog/AboutDialog';
import ConnectionOptionsDialog from '../../../ConnectionOptionsDialog/ConnectionOptionsDialog';
import DeviceSelectionDialog from '../../../DeviceSelectionDialog/DeviceSelectionDialog';
import SettingsIcon from '../../../../icons/SettingsIcon';
import { useAppState } from '../../../../state';
import { useTranslation } from 'react-i18next';
import LanguageSelectorDialog from '../../../LanguageSelectorDialog/LanguageSelectorDialog';

const useStyles = makeStyles({
  settingsButton: {
    margin: '1.8em 0 0',
  },
});

export default function SettingsMenu({ mobileButtonClass }: { mobileButtonClass?: string }) {
  const classes = useStyles();
  const { roomType } = useAppState();
  const isMobile = useMediaQuery((theme: Theme) => theme.breakpoints.down('sm'));
  const [menuOpen, setMenuOpen] = useState(false);
  const [deviceSettingsOpen, setDeviceSettingsOpen] = useState(false);
  const [connectionSettingsOpen, setConnectionSettingsOpen] = useState(false);
  const [langSelectorOpen, setLangSelectorOpen] = useState(false);
  const { t, i18n } = useTranslation();

  const anchorRef = useRef<HTMLButtonElement>(null);

  return (
    <>
      {isMobile ? (
        <Button
          ref={anchorRef}
          onClick={() => setMenuOpen(true)}
          startIcon={<MoreIcon />}
          className={mobileButtonClass}
        >
          More
        </Button>
      ) : (
        <Button
          ref={anchorRef}
          onClick={() => setMenuOpen(true)}
          startIcon={<SettingsIcon />}
          className={classes.settingsButton}
        >
          {t('settings.title')}
        </Button>
      )}
      <MenuContainer
        open={menuOpen}
        onClose={() => setMenuOpen(isOpen => !isOpen)}
        anchorEl={anchorRef.current}
        getContentAnchorEl={null}
        anchorOrigin={{
          vertical: 'top',
          horizontal: isMobile ? 'left' : 'right',
        }}
        transformOrigin={{
          vertical: 0,
          horizontal: 'center',
        }}
      >
        <MenuItem onClick={() => setLangSelectorOpen(true)}>
          <Typography variant="body1">{t('settings.language')}</Typography>
        </MenuItem>

        <MenuItem onClick={() => setDeviceSettingsOpen(true)}>
          <Typography variant="body1">{t('settings.audioVideo')}</Typography>
        </MenuItem>
        {roomType !== 'peer-to-peer' && roomType !== 'go' && (
          <MenuItem onClick={() => setConnectionSettingsOpen(true)}>
            <Typography variant="body1">{t('settings.connection')}</Typography>
          </MenuItem>
        )}
      </MenuContainer>

      <DeviceSelectionDialog
        open={deviceSettingsOpen}
        onClose={() => {
          setDeviceSettingsOpen(false);
          setMenuOpen(false);
        }}
      />
      <LanguageSelectorDialog
        open={langSelectorOpen}
        onClose={() => {
          setLangSelectorOpen(false);
          setMenuOpen(false);
        }}
      ></LanguageSelectorDialog>
      <ConnectionOptionsDialog
        open={connectionSettingsOpen}
        onClose={() => {
          setConnectionSettingsOpen(false);
          setMenuOpen(false);
        }}
      />
    </>
  );
}
