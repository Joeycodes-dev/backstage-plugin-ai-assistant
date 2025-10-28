import { useState } from 'react';
import { Content, Page } from '@backstage/core-components';
import { Box, Button, TextField, Typography } from '@mui/material';
// import 'react-quill/dist/quill.snow.css';
// import ReactQuill from 'react-quill';
import ExpertUserAutoComplete from './ExpertUserAutoComplete';
import MDEditor from '@uiw/react-md-editor';
import rehypeSanitize from 'rehype-sanitize';

export const FeedMePage = () => {
  const [value, setValue] = useState('');

  return (
    <Page themeId="home">
      <Content>
        <Typography variant="h4" gutterBottom>
          Feed Platty
        </Typography>

        <Typography variant="body1">
          Provide input to help Platty learn and improve its responses.
        </Typography>

        <Box my={2}>
          <TextField
            fullWidth
            label="Original Question asked?"
            variant="outlined"
            helperText="This helps Platty understand the context of your answer."
          />
        </Box>

        <Box mb={8}>
          <Typography variant="body1" gutterBottom>
            Answer the question in detail:
          </Typography>

          {/* <ReactQuill
            theme="snow"
            value={value}
            onChange={setValue}
            style={{ height: '200px', color: 'white' }}
          /> */}

          <MDEditor
            value={value}
            onChange={val => setValue(val ?? '')}
            previewOptions={{
              rehypePlugins: [[rehypeSanitize]],
            }}
          />
          <MDEditor.Markdown
            source={value}
            style={{ whiteSpace: 'pre-wrap' }}
          />
        </Box>

        <Box my={2}>
          <Typography variant="body1" gutterBottom>
            Who should approve this answer?
          </Typography>
          <ExpertUserAutoComplete />
        </Box>

        <Box display="flex" justifyContent="flex-end" gap={2} mr={2} mb={2}>
          <Button variant="contained" color="success">
            Submit
          </Button>
        </Box>

        <Box display="flex" justifyContent="flex-end" gap={2} mr={2}>
          <Button variant="contained" color="error">
            Reject
          </Button>

          <Button variant="contained" color="success">
            Approve
          </Button>
        </Box>
      </Content>
    </Page>
  );
};
