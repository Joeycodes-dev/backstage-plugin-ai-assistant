import React, { useState } from 'react';
import { Content, Page } from '@backstage/core-components';
import {
  Box,
  Button,
  FormControl,
  FormHelperText,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
} from '@mui/material';
import 'react-quill/dist/quill.snow.css';
import ReactQuill from 'react-quill';
import ExpertUserAutoComplete from './ExpertUserAutoComplete';

export const FeedMePage = () => {
  const [value, setValue] = useState('');
  const [dropdown, setDropdown] = useState('option1');

  //   console.log('Rich Text Editor Value:', value);

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

          <ReactQuill
            theme="snow"
            value={value}
            onChange={setValue}
            style={{ height: '200px', color: 'white' }}
          />
        </Box>

        {/* <Box mb={6}>
          <FormHelperText>
            Provide a detailed answer to the question.
          </FormHelperText>
        </Box> */}

        <Box my={2}>
          <Typography variant="body1" gutterBottom>
            Who should approve this answer?
          </Typography>
          <ExpertUserAutoComplete />

          {/* <FormControl sx={{ m: 1, minWidth: 120 }}>
            <InputLabel>Approver</InputLabel>
            <Select
              value={dropdown}
              onChange={e => setDropdown(e.target.value)}
            >
              <MenuItem value="option1">Thinus Du Plooy</MenuItem>
              <MenuItem value="option2">Sean Henderson</MenuItem>
              <MenuItem value="option3">Anelle Van Zyl</MenuItem>
            </Select>
            <FormHelperText>
              Choose the subject matter expert. Platty can help you identity who
              to send it to.
            </FormHelperText>
          </FormControl> */}
        </Box>

        <Box display="flex" justifyContent="flex-end" gap={2} mr={2} mb={2}>
          <Button variant="contained" color="success">
            Submit
          </Button>
        </Box>

        <Box display="flex" justifyContent="flex-end" gap={2} mr={2}>
          <Button variant="contained" color="success">
            Approve
          </Button>
          <Button variant="contained" color="error">
            Reject
          </Button>
        </Box>
      </Content>
    </Page>
  );
};
