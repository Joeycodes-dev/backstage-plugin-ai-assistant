import React, { useState, useCallback, useEffect } from 'react';
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
  useTheme,
} from '@mui/material';
import UploadIcon from '@mui/icons-material/Upload';
import CloseIcon from '@mui/icons-material/Close';
import { useApi, errorApiRef, alertApiRef } from '@backstage/core-plugin-api';
import { chatApiRef } from '../../api/chat';
import { useAsyncFn } from 'react-use';
import { Page, Content } from '@backstage/core-components';
import MDEditor from '@uiw/react-md-editor';
import rehypeSanitize from 'rehype-sanitize';
import ExpertUserAutoComplete, {
  ExpertType,
} from '../FeedMePage/ExpertUserAutoComplete';

const style = {
  position: 'fixed' as 'fixed',
  top: 0,
  left: 0,
  width: '100vw',
  height: '100vh',
  bgcolor: 'background.paper',
  borderRadius: 0,
  boxShadow: 24,
  p: 4,
  overflow: 'auto',
  zIndex: 1300,
};

export const FeedMeButton = () => {
  const theme = useTheme();
  const [open, setOpen] = useState(false);
  const [answer, setAnswer] = useState(''); // Answer markdown
  const [file, setFile] = useState<File | null>(null);
  const [approver, setApprover] = useState<ExpertType | null>(null); // Approver user
  const [approvalId, setApprovalId] = useState<number | null>(null);
  const [originalQuestion, setOriginalQuestion] = useState(''); // Original question

  const [submitted, setSubmitted] = useState(false);

  const chatApi = useApi(chatApiRef);
  const errorApi = useApi(errorApiRef);
  const alertApi = useApi(alertApiRef);

  const handleOpen = () => setOpen(true);

  const handleClose = useCallback(() => {
    setOpen(false);
    setTimeout(() => {
      setAnswer('');
      setFile(null);
      setApprover(null);
      setOriginalQuestion('');
    }, 300);
  }, []);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      const selectedFile = event.target.files[0];
      setFile(selectedFile);
    }
  };

  const [{ loading: summarizing }, generateSummary] = useAsyncFn(async () => {
    try {
      const result = await chatApi.summarizeContent({
        text: file ? undefined : answer,
        file: file || undefined,
      });
      setAnswer(result.summary);
    } catch (e: any) {
      errorApi.post(e);
    }
  }, [chatApi, errorApi, answer, file]);

  // automatically generate summary when a file is uploaded.
  useEffect(() => {
    if (file) {
      generateSummary();
    }
  }, [file]);

  const [{ loading: submitting }, submitForApproval] = useAsyncFn(async () => {
    try {
      const data = await chatApi.addDocument({
        content:
          'Original question asked: ' +
          originalQuestion +
          '. Answer: ' +
          answer,
        expert:
          (approver?.user.email ?? approver?.user.displayName) || undefined,
        approved: false,
      });

      if (data && data.document && data.document.id) {
        setApprovalId(data.document.id as number);
      }

      setSubmitted(true);

      // Scroll to top of modal/page
      if (typeof window !== 'undefined') {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }

      alertApi.post({
        message: 'Sent for approval :)',
        severity: 'success',
        display: 'transient',
      });
    } catch (e: any) {
      errorApi.post(e);
    }
  }, [chatApi, errorApi, alertApi, handleClose, answer, approver]);

  const [{ loading: approving }, approveSubmission] = useAsyncFn(async () => {
    try {
      await chatApi.updateDocument({
        id: approvalId!,
        approved: true,
      });

      alertApi.post({
        message: "Approved! This will now be fed into Platty's knowledge base.",
        severity: 'success',
        display: 'transient',
      });
    } catch (e: any) {
      errorApi.post(e);
    } finally {
      handleClose();
    }
  }, [chatApi, errorApi, alertApi, handleClose, answer, approver, approvalId]);

  const [{ loading: rejecting }, rejectSubmission] = useAsyncFn(async () => {
    try {
      await chatApi.updateDocument({
        id: approvalId!,
        approved: false,
      });

      alertApi.post({
        message:
          "Rejected content! This will not be fed into Platty's knowledge base.",
        severity: 'warning',
        display: 'transient',
      });
    } catch (e: any) {
      errorApi.post(e);
    } finally {
      handleClose();
    }
  }, [chatApi, errorApi, alertApi, handleClose, answer, approver, approvalId]);

  const canGenerateSummary =
    !summarizing && (answer.trim() !== '' || file !== null);

  return (
    <>
      <Tooltip title="Feed Me">
        <IconButton onClick={handleOpen}>
          <UploadIcon />
        </IconButton>
      </Tooltip>
      <Modal open={open} onClose={handleClose}>
        <Box sx={style}>
          <Typography variant="h4" gutterBottom>
            Feed Platty
          </Typography>
          <Typography variant="body1">
            Provide input to help Platty learn and improve its responses.
          </Typography>

          <Box sx={{ position: 'absolute', top: 16, right: 16, zIndex: 1400 }}>
            <IconButton aria-label="Close" onClick={handleClose} size="large">
              <CloseIcon fontSize="large" />
            </IconButton>
          </Box>

          <Content>
            <Box mt={2} mb={3}>
              <TextField
                fullWidth
                label="Original Question asked?"
                variant="outlined"
                helperText="This helps Platty understand the context of your answer."
                value={originalQuestion}
                onChange={e => setOriginalQuestion(e.target.value)}
              />
            </Box>

            <Stack
              direction="row"
              spacing={2}
              justifyContent="space-between"
              alignItems="center"
              sx={{ mt: 2, mb: 1 }}
            >
              <Typography variant="h6" gutterBottom>
                Answer the question in detail:
              </Typography>

              <Stack direction="row" spacing={2}>
                <Button variant="outlined" component="label">
                  Upload Transcript
                  <input
                    type="file"
                    hidden
                    accept=".docx,.vtt"
                    onChange={handleFileChange}
                  />
                </Button>
                <Button
                  variant="contained"
                  onClick={generateSummary}
                  disabled={!canGenerateSummary}
                  startIcon={summarizing && <CircularProgress size={20} />}
                >
                  {summarizing ? 'Generating Summary...' : 'Generate Summary'}
                </Button>
              </Stack>
            </Stack>

            <Box
              mb={4}
              sx={{
                '& .w-md-editor': {
                  height: '400px',
                  maxHeight: '400px',
                  minHeight: '400px',
                },
                '& .w-md-editor-text': {
                  height: '100%',
                  maxHeight: '100%',
                  minHeight: '100%',
                  overflowY: 'auto',
                },
              }}
            >
              <MDEditor
                value={answer}
                onChange={val => setAnswer(val ?? '')}
                previewOptions={{
                  rehypePlugins: [[rehypeSanitize]],
                }}
                highlightEnable={false}
              />
              {file && (
                <Typography sx={{ mt: 1, fontStyle: 'italic' }}>
                  Transcript summarized: {file.name}
                </Typography>
              )}
            </Box>

            <Box my={2}>
              <Typography variant="body1" gutterBottom>
                Who should approve this answer?
              </Typography>

              <ExpertUserAutoComplete value={approver} onChange={setApprover} />
            </Box>

            {!submitted && (
              <Box
                display="flex"
                justifyContent="flex-end"
                gap={2}
                mr={2}
                mb={2}
              >
                <Button
                  variant="contained"
                  sx={{
                    backgroundColor: `${theme.palette.success.main} !important`,
                  }}
                  onClick={submitForApproval}
                  startIcon={submitting && <CircularProgress size={20} />}
                >
                  {submitting ? 'Submitting...' : 'Submit for Approval'}
                </Button>
              </Box>
            )}

            {submitted && (
              <Box display="flex" justifyContent="flex-end" gap={2} mr={2}>
                <Button
                  variant="contained"
                  sx={{
                    backgroundColor: `${theme.palette.error.main} !important`,
                  }}
                  onClick={rejectSubmission}
                >
                  {rejecting ? 'Rejecting...' : 'Reject'}
                </Button>

                <Button
                  variant="contained"
                  sx={{
                    backgroundColor: `${theme.palette.success.main} !important`,
                  }}
                  onClick={approveSubmission}
                  startIcon={approving && <CircularProgress size={20} />}
                >
                  {approving ? 'Approving...' : 'Approve'}
                </Button>
              </Box>
            )}
          </Content>
          {/* </Page> */}
        </Box>
      </Modal>
    </>
  );
};
