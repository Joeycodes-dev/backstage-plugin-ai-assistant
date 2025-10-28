import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';

export default function ExpertSelect() {
  return (
    <Autocomplete
      sx={{ width: 300 }}
      options={experts}
      autoHighlight
      getOptionLabel={option => option.label}
      renderOption={(props, option) => {
        const { key, ...optionProps } = props;
        return (
          <Box
            key={key}
            component="li"
            // sx={{ '& > img': { mr: 2, flexShrink: 0 } }}
            {...optionProps}
          >
            {option.label} ({option.username})
          </Box>
        );
      }}
      renderInput={params => (
        <TextField
          {...params}
          label="Choose an expert"
          slotProps={{
            htmlInput: {
              ...params.inputProps,
              autoComplete: 'new-password', // disable autocomplete and autofill
            },
          }}
        />
      )}
    />
  );
}

interface ExpertType {
  username: string;
  label: string;
  email: string;
}

const experts: readonly ExpertType[] = [
  {
    username: 'Thinus Du Plooy',
    label: 'Thinus',
    email: 'thinus.duplooy@nintex.com',
  },
  {
    username: 'Sean Henderson',
    label: 'Sean',
    email: 'sean.henderson@nintex.com',
  },
];
