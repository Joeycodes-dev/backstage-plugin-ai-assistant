import React, { useState, useCallback } from 'react';
import {
  Button,
  Modal,
  Box,
  Typography,
  Stack,
  CircularProgress,
  TextField,
  Alert,
  IconButton,
  Tooltip,
} from '@mui/material';
import UploadIcon from '@mui/icons-material/Upload';
import { useApi, errorApiRef, alertApiRef } from '@backstage/core-plugin-api';
import { chatApiRef } from '../../api/chat';
import { useAsyncFn } from 'react-use';

const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 1200,
  bgcolor: 'background.paper',
  borderRadius: '4px',
  boxShadow: 24,
  p: 4,
};

export const FeedMeButton = () => {
  const [open, setOpen] = useState(false);
  const [text, setText] = useState('');
  const [file, setFile] = useState<File | null>(null);
  const [expert, setExpert] = useState('');
  const [summary, setSummary] = useState('');
  const [step, setStep] = useState<'input' | 'review'>('input');

  const chatApi = useApi(chatApiRef);
  const errorApi = useApi(errorApiRef);
  const alertApi = useApi(alertApiRef);

  const handleOpen = () => setOpen(true);
  const handleClose = useCallback(() => {
    setOpen(false);
    setTimeout(() => {
      setStep('input');
      setText('');
      setFile(null);
      setExpert('');
      setSummary('');
    }, 300);
  }, []);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      setFile(event.target.files[0]);
    }
  };

  const [{ loading: summarizing }, generateSummary] = useAsyncFn(async () => {
    try {
      const result = await chatApi.summarizeContent({
        text: file ? undefined : text,
        file: file || undefined,
      });
      setSummary(result.summary);
      setStep('review');
    } catch (e: any) {
      errorApi.post(e);
    }
  }, [chatApi, errorApi, text, file]);

  const [{ loading: saving }, approveAndSave] = useAsyncFn(async () => {
    try {
      await chatApi.addDocument({
        content: summary,
        expert: expert || undefined,
        approved: true,
      });
      alertApi.post({
        message: 'Approved content saved successfully!',
        severity: 'success',
        display: 'transient',
      });
    } catch (e: any) {
      errorApi.post(e);
    } finally {
      handleClose();
    }
  }, [chatApi, errorApi, alertApi, handleClose, summary, expert]);

  const canGenerateSummary = !summarizing && (text.trim() !== '' || file !== null);

  return (
    <>
    <Tooltip title="Feed Me">
      <IconButton
        onClick={handleOpen}
      >
        <UploadIcon />
      </IconButton>
      </Tooltip>
      <Modal open={open} onClose={handleClose}>
        <Box sx={style}>
          {step === 'input' && (
            <>
              <Typography variant="h6" component="h2">
                Feed the AI with your SOUL!!!
              </Typography>
              <TextField
                label="Expert (Optional)"
                fullWidth
                variant="outlined"
                value={expert}
                onChange={e => setExpert(e.target.value)}
                sx={{ mt: 2 }}
              />
              <TextField
                label="Paste content here"
                multiline
                rows={6}
                fullWidth
                variant="outlined"
                value={text}
                onChange={e => setText(e.target.value)}
                sx={{ mt: 2 }}
                disabled={!!file}
              />
              <Typography sx={{ mt: 2, mb: 1, textAlign: 'center' }}>OR</Typography>
              <Button variant="outlined" component="label" fullWidth disabled={text.trim() !== ''}>
                Upload Transcript File
                <input type="file" hidden accept=".docx,.vtt" onChange={handleFileChange} />
              </Button>
              {file && <Typography sx={{ mt: 1, fontStyle: 'italic' }}>Selected: {file.name}</Typography>}
              <Stack direction="row" spacing={2} justifyContent="flex-end" sx={{ mt: 3 }}>
                <Button onClick={handleClose} color="inherit">Cancel</Button>
                <Button variant="contained" onClick={generateSummary} disabled={!canGenerateSummary} startIcon={summarizing && <CircularProgress size={20} />}>
                  {summarizing ? 'Generating...' : 'Generate Summary'}
                </Button>
              </Stack>
            </>
          )}
          {step === 'review' && (
            <>
              <Typography variant="h6" component="h2">
                Review Summary
              </Typography>
              <Alert severity="info" sx={{ my: 2 }}>
                The AI has generated a summary. Please review and edit if necessary before approving.
              </Alert>
              <TextField
                label="Expert"
                fullWidth
                variant="outlined"
                value={expert}
                onChange={e => setExpert(e.target.value)}
                sx={{ mb: 2 }}
              />
              <TextField
                label="Generated Summary"
                multiline
                rows={15}
                fullWidth
                variant="outlined"
                value={summary}
                onChange={e => setSummary(e.target.value)}
              />
              <Stack direction="row" spacing={2} justifyContent="flex-end" sx={{ mt: 3 }}>
                <Button onClick={() => setStep('input')} color="inherit">Back</Button>
                <Button variant="contained" onClick={approveAndSave} disabled={saving} startIcon={saving && <CircularProgress size={20} />}>
                  {saving ? 'Saving...' : 'Approve & Save'}
                </Button>
              </Stack>
            </>
          )}
        </Box>
      </Modal>
    </>
  );
};