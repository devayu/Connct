import React, { useCallback, useRef } from 'react';

import Button from '@material-ui/core/Button';
import VideoOffIcon from '../../../icons/VideoOffIcon';
import VideoOnIcon from '../../../icons/VideoOnIcon';

import useDevices from '../../../hooks/useDevices/useDevices';
import useLocalVideoToggle from '../../../hooks/useLocalVideoToggle/useLocalVideoToggle';
import { useTranslation } from 'react-i18next';
import { useAppState } from '../../../state';
import useVideoContext from '../../../hooks/useVideoContext/useVideoContext';
import StartRecordingIcon from '../../../icons/StartRecordingIcon';
import StopRecordingIcon from '../../../icons/StopRecordingIcon';

export default function ToggleRecordingButton(props: {
  disabled?: boolean;
  className?: string;
  isRecording?: boolean;
}) {
  const { updateRecordingRules } = useAppState();
  const { room } = useVideoContext();
  const { t } = useTranslation();

  const toggleRecording = () => {
    if (props.isRecording) {
      updateRecordingRules(room!.sid, [{ type: 'exclude', all: true }]);
    } else {
      updateRecordingRules(room!.sid, [{ type: 'include', all: true }]);
    }
  };

  return (
    <Button
      className={props.className}
      onClick={toggleRecording}
      disabled={props.disabled}
      startIcon={props.isRecording ? <StopRecordingIcon /> : <StartRecordingIcon />}
    >
      {props.isRecording ? t('recording.stop') : t('recording.start')}
    </Button>
  );
}
