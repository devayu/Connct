import React, { PropsWithChildren } from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Divider from '@material-ui/core/Divider';
import { FormControl, MenuItem, Typography, Select } from '@material-ui/core';
import { version as appVersion } from '../../../package.json';
import Video from 'twilio-video';
import { useAppState } from '../../state';
import { useTranslation } from 'react-i18next';
import { makeStyles } from '@material-ui/core/styles';
interface AboutDialogProps {
  open: boolean;
  onClose(): void;
}
const useStyles = makeStyles({
  containerPadding: {
    padding: '0 20px',
  },
  textStyle: {
    textTransform: 'capitalize',
  },
});
function LanguageSelectorDialog({ open, onClose }: PropsWithChildren<AboutDialogProps>) {
  const { roomType } = useAppState();
  const { t, i18n } = useTranslation();
  const classes = useStyles();
  const langList = [
    {
      lang: 'english',
      code: 'en',
    },
    {
      lang: 'hindi',
      code: 'hi',
    },
  ];
  const changeLanguage = (lang: string) => {
    i18n.changeLanguage(lang);
  };
  return (
    <Dialog open={open} onClose={onClose} fullWidth={true} maxWidth="xs">
      <DialogTitle>{t('language')}</DialogTitle>
      <Divider />
      <FormControl className={classes.containerPadding}>
        <Select onChange={e => changeLanguage(e.target.value as string)} value={i18n.language || ''} variant="outlined">
          {langList.map(lang => (
            <MenuItem value={lang.code} key={lang.code} className={classes.textStyle}>
              {t(lang.lang)}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <Divider />
      <DialogActions>
        <Button onClick={onClose} color="primary" variant="contained" autoFocus>
          OK
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default LanguageSelectorDialog;
