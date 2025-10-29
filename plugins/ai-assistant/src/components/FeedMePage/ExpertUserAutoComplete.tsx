import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';

// For the metadata object
interface UserMetadata {
  name: string;
  title: string;
  area: string;
  subArea: string;
}

// For the profile object inside user
interface UserProfile {
  // displayName: string;
  // email?: string; // The email is sometimes missing, so it's marked as optional with '?'
}

// For the user object
interface Useruser {
  // profile: UserProfile;
  displayName: string;
  email?: string; // The email is sometimes missing, so it's marked as optional with '?'
}

// The main User interface, often called an "entity" in Backstage
export interface ExpertType {
  // apiVersion: 'backstage.io/v1alpha1';
  // kind: 'User';
  metadata: UserMetadata;
  user: Useruser;
}

interface ExpertUserAutoCompleteProps {
  value: ExpertType | null;
  onChange: (value: ExpertType | null) => void;
}

export default function ExpertUserAutoComplete({
  value,
  onChange,
}: ExpertUserAutoCompleteProps) {
  return (
    <Autocomplete
      sx={{ width: 500 }}
      options={experts}
      autoHighlight
      getOptionLabel={option => option.user.displayName}
      value={value}
      onChange={(_event, newValue) => onChange(newValue)}
      renderOption={(props, option) => {
        const { key, ...optionProps } = props;
        return (
          <Box key={key} component="li" {...optionProps}>
            {option.user.displayName}
            {option.user.email ? ` (${option.user.email})` : ''}
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
/**
 * Utility to get display name from ExpertType or null/undefined.
 */
export function getExpertDisplayName(
  expert: ExpertType | null | undefined,
): string {
  return expert?.user.displayName ?? '';
}
const experts: readonly ExpertType[] = [
  {
    // kind: 'User',
    metadata: {
      name: 'Ruan',
      title: 'Senior Engineer',
      area: 'Cloud',
      subArea: 'APIs',
    },
    user: {
      displayName: 'Ruan Grobler',
      email: 'Ruan.Grobler@Nintex.com',
    },
  },
  {
    // kind: 'User',
    metadata: {
      name: 'Emile',
      title: 'Senior Lead, Engineering',
      area: 'Cloud',
      subArea: 'Apps Providers',
    },
    user: {
      displayName: 'Emile Kimme',
      email: 'Emile.Kimme@Nintex.com',
    },
  },
  {
    // kind: 'User',
    metadata: {
      name: 'Kilo Christo',
      title: 'VP',
      area: 'Hackathon',
      subArea: 'Brownie Points',
    },
    user: {
      displayName: 'Kilo Christo',
    },
  },
  {
    // kind: 'User',
    metadata: {
      name: 'Thinus',
      title: 'Principal Engineer',
      area: 'Cloud',
      subArea: 'Apps Providers',
    },
    user: {
      displayName: 'Thinus du Plooy',
      email: 'Thinus.DuPlooy@Nintex.com',
    },
  },
  {
    // kind: 'User',
    metadata: {
      name: 'William',
      title: 'Staff Engineer',
      area: 'Cloud',
      subArea: 'Authentication',
    },
    user: {
      displayName: 'William vd Walt',
      email: 'William.VanderWalt@Nintex.com',
    },
  },
  {
    // kind: 'User',
    metadata: {
      name: 'Thinus',
      title: 'Principal Engineer',
      area: 'Cloud',
      subArea: 'Authentication',
    },
    user: {
      displayName: 'Thinus du Plooy',
      email: 'Thinus.DuPlooy@Nintex.com',
    },
  },
  {
    // kind: 'User',
    metadata: {
      name: 'Thinus',
      title: 'Principal Engineer',
      area: 'Cloud',
      subArea: 'Authorization Framework',
    },
    user: {
      displayName: 'Thinus du Plooy',
      email: 'Thinus.DuPlooy@Nintex.com',
    },
  },
  {
    // kind: 'User',
    metadata: {
      name: 'Keryn',
      title: 'Release Manager',
      area: 'Cloud',
      subArea: 'Help Links',
    },
    user: {
      displayName: 'Keryn Roos',
      email: 'Keryn.Roos@Nintex.com',
    },
  },
  {
    // kind: 'User',
    metadata: {
      name: 'William',
      title: 'Staff Engineer',
      area: 'Cloud',
      subArea: 'Host Server',
    },
    user: {
      displayName: 'William vd Walt',
      email: 'William.VanderWalt@Nintex.com',
    },
  },
  {
    // kind: 'User',
    metadata: {
      name: 'Andrew',
      title: 'Senior Engineer',
      area: 'Cloud',
      subArea: 'Installer',
    },
    user: {
      displayName: 'Andrew Marais',
      email: 'Andrew.Marais@Nintex.com',
    },
  },
  {
    // kind: 'User',
    metadata: {
      name: 'Ruan',
      title: 'Senior Engineer',
      area: 'Cloud',
      subArea: 'JS Service Provider',
    },
    user: {
      displayName: 'Ruan Grobler',
      email: 'Ruan.Grobler@Nintex.com',
    },
  },
  {
    // kind: 'User',
    metadata: {
      name: 'William',
      title: 'Staff Engineer',
      area: 'Cloud',
      subArea: 'Management',
    },
    user: {
      displayName: 'William vd Walt',
      email: 'William.VanderWalt@Nintex.com',
    },
  },
  {
    // kind: 'User',
    metadata: {
      name: 'Sanet',
      title: 'Senior Engineer',
      area: 'Cloud',
      subArea: 'Management',
    },
    user: {
      displayName: 'Sanet Kuun',
      email: 'Sanet.Kuun@Nintex.com',
    },
  },
  {
    // kind: 'User',
    metadata: {
      name: 'Andrew',
      title: 'Senior Engineer',
      area: 'Cloud',
      subArea: 'Management',
    },
    user: {
      displayName: 'Andrew Marais',
      email: 'Andrew.Marais@Nintex.com',
    },
  },
  {
    // kind: 'User',
    metadata: {
      name: 'Sanet',
      title: 'Senior Engineer',
      area: 'Cloud',
      subArea: 'Mobile (Android)',
    },
    user: {
      displayName: 'Sanet Kuun',
      email: 'Sanet.Kuun@Nintex.com',
    },
  },
  {
    // kind: 'User',
    metadata: {
      name: 'Ruan',
      title: 'Senior Engineer',
      area: 'Cloud',
      subArea: 'Mobile (iOS)',
    },
    user: {
      displayName: 'Ruan Grobler',
      email: 'Ruan.Grobler@Nintex.com',
    },
  },
  {
    // kind: 'User',
    metadata: {
      name: 'Thinus',
      title: 'Principal Engineer',
      area: 'Cloud',
      subArea: 'Multiple Identity Providers',
    },
    user: {
      displayName: 'Thinus du Plooy',
      email: 'Thinus.DuPlooy@Nintex.com',
    },
  },
  {
    // kind: 'User',
    metadata: {
      name: 'William',
      title: 'Staff Engineer',
      area: 'Cloud',
      subArea: 'Multiple Identity Providers',
    },
    user: {
      displayName: 'William vd Walt',
      email: 'William.VanderWalt@Nintex.com',
    },
  },
  {
    // kind: 'User',
    metadata: {
      name: 'Thinus',
      title: 'Principal Engineer',
      area: 'Cloud',
      subArea: 'Package and Deployment',
    },
    user: {
      displayName: 'Thinus du Plooy',
      email: 'Thinus.DuPlooy@Nintex.com',
    },
  },
  {
    // kind: 'User',
    metadata: {
      name: 'Sanet',
      title: 'Senior Engineer',
      area: 'Cloud',
      subArea: 'Package and Deployment',
    },
    user: {
      displayName: 'Sanet Kuun',
      email: 'Sanet.Kuun@Nintex.com',
    },
  },
  {
    // kind: 'User',
    metadata: {
      name: 'William',
      title: 'Staff Engineer',
      area: 'Cloud',
      subArea: 'Performance',
    },
    user: {
      displayName: 'William vd Walt',
      email: 'William.VanderWalt@Nintex.com',
    },
  },
  {
    // kind: 'User',
    metadata: {
      name: 'Calvin',
      title: 'Associate Engineer',
      area: 'Cloud',
      subArea: 'Performance',
    },
    user: {
      displayName: 'Calvin Machete',
      email: 'Calvin.Machete@Nintex.com',
    },
  },
  {
    // kind: 'User',
    metadata: {
      name: 'William',
      title: 'Staff Engineer',
      area: 'Cloud',
      subArea: 'Security',
    },
    user: {
      displayName: 'William vd Walt',
      email: 'William.VanderWalt@Nintex.com',
    },
  },
  {
    // kind: 'User',
    metadata: {
      name: 'Ruan',
      title: 'Senior Engineer',
      area: 'Cloud',
      subArea: 'Service Brokers',
    },
    user: {
      displayName: 'Ruan Grobler',
      email: 'Ruan.Grobler@Nintex.com',
    },
  },
  {
    // kind: 'User',
    metadata: {
      name: 'Emile',
      title: 'Senior Lead, Engineering',
      area: 'Cloud',
      subArea: 'SharePoint',
    },
    user: {
      displayName: 'Emile Kimme',
      email: 'Emile.Kimme@Nintex.com',
    },
  },
  {
    // kind: 'User',
    metadata: {
      name: 'Sean',
      title: 'Associate Engineer',
      area: 'Cloud',
      subArea: 'SmartForms',
    },
    user: {
      displayName: 'Sean Henderson',
      email: 'Sean.Henderson@Nintex.com',
    },
  },
  {
    // kind: 'User',
    metadata: {
      name: 'Ruan',
      title: 'Senior Engineer',
      area: 'Cloud',
      subArea: 'SmartObjects',
    },
    user: {
      displayName: 'Ruan Grobler',
      email: 'Ruan.Grobler@Nintex.com',
    },
  },
  {
    // kind: 'User',
    metadata: {
      name: 'Jaco',
      title: 'Engineering Manager',
      area: 'Cloud',
      subArea: 'Workflow',
    },
    user: {
      displayName: 'Jaco Louw',
      email: 'Jaco.Louw@Nintex.com',
    },
  },
  {
    // kind: 'User',
    metadata: {
      name: 'William',
      title: 'Staff Engineer',
      area: 'Cloud',
      subArea: 'Workspace',
    },
    user: {
      displayName: 'William vd Walt',
      email: 'William.VanderWalt@Nintex.com',
    },
  },
  {
    // kind: 'User',
    metadata: {
      name: 'Sanet',
      title: 'Senior Engineer',
      area: 'Cloud',
      subArea: 'Workspace',
    },
    user: {
      displayName: 'Sanet Kuun',
      email: 'Sanet.Kuun@Nintex.com',
    },
  },
  {
    // kind: 'User',
    metadata: {
      name: 'Thinus',
      title: 'Principal Engineer',
      area: 'Cloud',
      subArea: 'Workspace',
    },
    user: {
      displayName: 'Thinus du Plooy',
      email: 'Thinus.DuPlooy@Nintex.com',
    },
  },
  {
    // kind: 'User',
    metadata: {
      name: 'Magda',
      title: 'Manager, Technical Content',
      area: 'Documentation',
      subArea: 'Documentation',
    },
    user: {
      displayName: 'Magda le Roux',
      email: 'Magda.LeRoux@Nintex.com',
    },
  },
  {
    // kind: 'User',
    metadata: {
      name: 'Emile',
      title: 'Senior Lead, Engineering',
      area: 'K2 Connect',
      subArea: 'K2 Connect',
    },
    user: {
      displayName: 'Emile Kimme',
      email: 'Emile.Kimme@Nintex.com',
    },
  },
  {
    // kind: 'User',
    metadata: {
      name: 'William',
      title: 'Staff Engineer',
      area: 'Main',
      subArea: 'Authentication',
    },
    user: {
      displayName: 'William vd Walt',
      email: 'William.VanderWalt@Nintex.com',
    },
  },
  {
    // kind: 'User',
    metadata: {
      name: 'Thinus',
      title: 'Principal Engineer',
      area: 'Main',
      subArea: 'Authentication',
    },
    user: {
      displayName: 'Thinus du Plooy',
      email: 'Thinus.DuPlooy@Nintex.com',
    },
  },
  {
    // kind: 'User',
    metadata: {
      name: 'William',
      title: 'Staff Engineer',
      area: 'Main',
      subArea: 'Authorization Framework',
    },
    user: {
      displayName: 'William vd Walt',
      email: 'William.VanderWalt@Nintex.com',
    },
  },
  {
    // kind: 'User',
    metadata: {
      name: 'Thinus',
      title: 'Principal Engineer',
      area: 'Main',
      subArea: 'Authorization Framework',
    },
    user: {
      displayName: 'Thinus du Plooy',
      email: 'Thinus.DuPlooy@Nintex.com',
    },
  },
  {
    // kind: 'User',
    metadata: {
      name: 'Emile',
      title: 'Senior Lead, Engineering',
      area: 'Main',
      subArea: 'Authorization Framework',
    },
    user: {
      displayName: 'Emile Kimme',
      email: 'Emile.Kimme@Nintex.com',
    },
  },
  {
    // kind: 'User',
    metadata: {
      name: 'William',
      title: 'Staff Engineer',
      area: 'Main',
      subArea: 'Host Server',
    },
    user: {
      displayName: 'William vd Walt',
      email: 'William.VanderWalt@Nintex.com',
    },
  },
  {
    // kind: 'User',
    metadata: {
      name: 'Thinus',
      title: 'Principal Engineer',
      area: 'Main',
      subArea: 'Host Server',
    },
    user: {
      displayName: 'Thinus du Plooy',
      email: 'Thinus.DuPlooy@Nintex.com',
    },
  },
  {
    // kind: 'User',
    metadata: {
      name: 'Andrew',
      title: 'Senior Engineer',
      area: 'Main',
      subArea: 'Installer',
    },
    user: {
      displayName: 'Andrew Marais',
      email: 'Andrew.Marais@Nintex.com',
    },
  },
  {
    // kind: 'User',
    metadata: {
      name: 'Andrew',
      title: 'Senior Engineer',
      area: 'Main',
      subArea: 'Management',
    },
    user: {
      displayName: 'Andrew Marais',
      email: 'Andrew.Marais@Nintex.com',
    },
  },
  {
    // kind: 'User',
    metadata: {
      name: 'William',
      title: 'Staff Engineer',
      area: 'Main',
      subArea: 'Management',
    },
    user: {
      displayName: 'William vd Walt',
      email: 'William.VanderWalt@Nintex.com',
    },
  },
  {
    // kind: 'User',
    metadata: {
      name: 'Sanet',
      title: 'Senior Engineer',
      area: 'Main',
      subArea: 'Management',
    },
    user: {
      displayName: 'Sanet Kuun',
      email: 'Sanet.Kuun@Nintex.com',
    },
  },
  {
    // kind: 'User',
    metadata: {
      name: 'Sanet',
      title: 'Senior Engineer',
      area: 'Main',
      subArea: 'Mobile (Android)',
    },
    user: {
      displayName: 'Sanet Kuun',
      email: 'Sanet.Kuun@Nintex.com',
    },
  },
  {
    // kind: 'User',
    metadata: {
      name: 'Ruan',
      title: 'Senior Engineer',
      area: 'Main',
      subArea: 'Mobile (iOS)',
    },
    user: {
      displayName: 'Ruan Grobler',
      email: 'Ruan.Grobler@Nintex.com',
    },
  },
  {
    // kind: 'User',
    metadata: {
      name: 'Sanet',
      title: 'Senior Engineer',
      area: 'Main',
      subArea: 'Package and Deployment',
    },
    user: {
      displayName: 'Sanet Kuun',
      email: 'Sanet.Kuun@Nintex.com',
    },
  },
  {
    // kind: 'User',
    metadata: {
      name: 'Thinus',
      title: 'Principal Engineer',
      area: 'Main',
      subArea: 'Package and Deployment',
    },
    user: {
      displayName: 'Thinus du Plooy',
      email: 'Thinus.DuPlooy@Nintex.com',
    },
  },
  {
    // kind: 'User',
    metadata: {
      name: 'William',
      title: 'Staff Engineer',
      area: 'Main',
      subArea: 'Performance',
    },
    user: {
      displayName: 'William vd Walt',
      email: 'William.VanderWalt@Nintex.com',
    },
  },
  {
    // kind: 'User',
    metadata: {
      name: 'Calvin',
      title: 'Associate Engineer',
      area: 'Main',
      subArea: 'Performance',
    },
    user: {
      displayName: 'Calvin Machete',
      email: 'Calvin.Machete@Nintex.com',
    },
  },
  {
    // kind: 'User',
    metadata: {
      name: 'William',
      title: 'Staff Engineer',
      area: 'Main',
      subArea: 'Security',
    },
    user: {
      displayName: 'William vd Walt',
      email: 'William.VanderWalt@Nintex.com',
    },
  },
  {
    // kind: 'User',
    metadata: {
      name: 'Ruan',
      title: 'Senior Engineer',
      area: 'Main',
      subArea: 'Service Brokers',
    },
    user: {
      displayName: 'Ruan Grobler',
      email: 'Ruan.Grobler@Nintex.com',
    },
  },
  {
    // kind: 'User',
    metadata: {
      name: 'Thinus',
      title: 'Principal Engineer',
      area: 'Main',
      subArea: 'Services',
    },
    user: {
      displayName: 'Thinus du Plooy',
      email: 'Thinus.DuPlooy@Nintex.com',
    },
  },
  {
    // kind: 'User',
    metadata: {
      name: 'Ruan',
      title: 'Senior Engineer',
      area: 'Main',
      subArea: 'Services',
    },
    user: {
      displayName: 'Ruan Grobler',
      email: 'Ruan.Grobler@Nintex.com',
    },
  },
  {
    // kind: 'User',
    metadata: {
      name: 'Sanet',
      title: 'Senior Engineer',
      area: 'Main',
      subArea: 'SmartForms',
    },
    user: {
      displayName: 'Sanet Kuun',
      email: 'Sanet.Kuun@Nintex.com',
    },
  },
  {
    // kind: 'User',
    metadata: {
      name: 'Sean',
      title: 'Associate Engineer',
      area: 'Main',
      subArea: 'SmartForms',
    },
    user: {
      displayName: 'Sean Henderson',
      email: 'Sean.Henderson@Nintex.com',
    },
  },
  {
    // kind: 'User',
    metadata: {
      name: 'Ruan',
      title: 'Senior Engineer',
      area: 'Cloud',
      subArea: 'SmartObjects',
    },
    user: {
      displayName: 'Ruan Grobler',
      email: 'Ruan.Grobler@Nintex.com',
    },
  },
  {
    // kind: 'User',
    metadata: {
      name: 'Jaco',
      title: 'Engineering Manager',
      area: 'Main',
      subArea: 'Workflow',
    },
    user: {
      displayName: 'Jaco Louw',
      email: 'Jaco.Louw@Nintex.com',
    },
  },
  {
    // kind: 'User',
    metadata: {
      name: 'William',
      title: 'Staff Engineer',
      area: 'Main',
      subArea: 'Workspace',
    },
    user: {
      displayName: 'William vd Walt',
      email: 'William.VanderWalt@Nintex.com',
    },
  },
  {
    // kind: 'User',
    metadata: {
      name: 'Sanet',
      title: 'Senior Engineer',
      area: 'Main',
      subArea: 'Workspace',
    },
    user: {
      displayName: 'Sanet Kuun',
      email: 'Sanet.Kuun@Nintex.com',
    },
  },
  {
    // kind: 'User',
    metadata: {
      name: 'Thinus',
      title: 'Principal Engineer',
      area: 'Main',
      subArea: 'Workspace',
    },
    user: {
      displayName: 'Thinus du Plooy',
      email: 'Thinus.DuPlooy@Nintex.com',
    },
  },
  {
    // kind: 'User',
    metadata: {
      name: 'Stefan',
      title: 'Staff Engineer',
      area: 'Micros',
      subArea: 'Apps Platform',
    },
    user: {
      displayName: 'Stefan Nolte',
      email: 'Stefan.Nolte@Nintex.com',
    },
  },
  {
    // kind: 'User',
    metadata: {
      name: 'William',
      title: 'Staff Engineer',
      area: 'Micros',
      subArea: 'Badger',
    },
    user: {
      displayName: 'William vd Walt',
      email: 'William.VanderWalt@Nintex.com',
    },
  },
  {
    // kind: 'User',
    metadata: {
      name: 'William',
      title: 'Staff Engineer',
      area: 'Micros',
      subArea: 'Claims',
    },
    user: {
      displayName: 'William vd Walt',
      email: 'William.VanderWalt@Nintex.com',
    },
  },
  {
    // kind: 'User',
    metadata: {
      name: 'Thinus',
      title: 'Principal Engineer',
      area: 'Micros',
      subArea: 'Claims',
    },
    user: {
      displayName: 'Thinus du Plooy',
      email: 'Thinus.DuPlooy@Nintex.com',
    },
  },
  {
    // kind: 'User',
    metadata: {
      name: 'Ruan',
      title: 'Senior Engineer',
      area: 'Micros',
      subArea: 'Claims',
    },
    user: {
      displayName: 'Ruan Grobler',
      email: 'Ruan.Grobler@Nintex.com',
    },
  },
  {
    // kind: 'User',
    metadata: {
      name: 'Sean',
      title: 'Associate Engineer',
      area: 'Micros',
      subArea: 'Claims',
    },
    user: {
      displayName: 'Sean Henderson',
      email: 'Sean.Henderson@Nintex.com',
    },
  },
  {
    // kind: 'User',
    metadata: {
      name: 'Sean',
      title: 'Associate Engineer',
      area: 'Micros',
      subArea: 'Configuration',
    },
    user: {
      displayName: 'Sean Henderson',
      email: 'Sean.Henderson@Nintex.com',
    },
  },
  {
    // kind: 'User',
    metadata: {
      name: 'Thinus',
      title: 'Principal Engineer',
      area: 'Micros',
      subArea: 'Configuration',
    },
    user: {
      displayName: 'Thinus du Plooy',
      email: 'Thinus.DuPlooy@Nintex.com',
    },
  },
  {
    // kind: 'User',
    metadata: {
      name: 'Andrew',
      title: 'Senior Engineer',
      area: 'Micros',
      subArea: 'Custom Controls',
    },
    user: {
      displayName: 'Andrew Marais',
      email: 'Andrew.Marais@Nintex.com',
    },
  },
  {
    // kind: 'User',
    metadata: {
      name: 'Sean',
      title: 'Associate Engineer',
      area: 'Micros',
      subArea: 'Custom Controls',
    },
    user: {
      displayName: 'Sean Henderson',
      email: 'Sean.Henderson@Nintex.com',
    },
  },
  {
    // kind: 'User',
    metadata: {
      name: 'Neil',
      title: 'Principal Engineer',
      area: 'Micros',
      subArea: 'Custom Controls',
    },
    user: {
      displayName: 'Neil Craig',
      email: 'Neil.Craig@Nintex.com',
    },
  },
  {
    // kind: 'User',
    metadata: {
      name: 'Jaco',
      title: 'Engineering Manager',
      area: 'Micros',
      subArea: 'Custom Controls',
    },
    user: {
      displayName: 'Jaco Louw',
      email: 'Jaco.Louw@Nintex.com',
    },
  },
  {
    // kind: 'User',
    metadata: {
      name: 'Thinus',
      title: 'Principal Engineer',
      area: 'Micros',
      subArea: 'Identity',
    },
    user: {
      displayName: 'Thinus du Plooy',
      email: 'Thinus.DuPlooy@Nintex.com',
    },
  },
  {
    // kind: 'User',
    metadata: {
      name: 'William',
      title: 'Staff Engineer',
      area: 'Micros',
      subArea: 'Identity',
    },
    user: {
      displayName: 'William vd Walt',
      email: 'William.VanderWalt@Nintex.com',
    },
  },
  {
    // kind: 'User',
    metadata: {
      name: 'William',
      title: 'Staff Engineer',
      area: 'Micros',
      subArea: 'IdentityToken',
    },
    user: {
      displayName: 'William vd Walt',
      email: 'William.VanderWalt@Nintex.com',
    },
  },
  {
    // kind: 'User',
    metadata: {
      name: 'Thinus',
      title: 'Principal Engineer',
      area: 'Micros',
      subArea: 'IdentityToken',
    },
    user: {
      displayName: 'Thinus du Plooy',
      email: 'Thinus.DuPlooy@Nintex.com',
    },
  },
  {
    // kind: 'User',
    metadata: {
      name: 'Sean',
      title: 'Associate Engineer',
      area: 'Micros',
      subArea: 'IdentityToken',
    },
    user: {
      displayName: 'Sean Henderson',
      email: 'Sean.Henderson@Nintex.com',
    },
  },
  {
    // kind: 'User',
    metadata: {
      name: 'Sean',
      title: 'Associate Engineer',
      area: 'Micros',
      subArea: 'JSSP',
    },
    user: {
      displayName: 'Sean Henderson',
      email: 'Sean.Henderson@Nintex.com',
    },
  },
  {
    // kind: 'User',
    metadata: {
      name: 'Stefan',
      title: 'Staff Engineer',
      area: 'Micros',
      subArea: 'JSSP',
    },
    user: {
      displayName: 'Stefan Nolte',
      email: 'Stefan.Nolte@Nintex.com',
    },
  },
  {
    // kind: 'User',
    metadata: {
      name: 'Vahin',
      title: 'Associate Engineer',
      area: 'Micros',
      subArea: 'JSSP',
    },
    user: {
      displayName: 'Vahin Chablal',
      email: 'Vahin.Chablal@Nintex.com',
    },
  },
  {
    // kind: 'User',
    metadata: {
      name: 'Kieran',
      title: 'Associate Engineer',
      area: 'Micros',
      subArea: 'JSSP',
    },
    user: {
      displayName: 'Kieran Armstrong',
      email: 'Stefan.Nolte@Nintex.com',
    },
  },
  {
    // kind: 'User',
    metadata: {
      name: 'Thinus',
      title: 'Principal Engineer',
      area: 'Micros',
      subArea: 'OAuth',
    },
    user: {
      displayName: 'Thinus du Plooy',
      email: 'Thinus.DuPlooy@Nintex.com',
    },
  },
  {
    // kind: 'User',
    metadata: {
      name: 'William',
      title: 'Staff Engineer',
      area: 'Micros',
      subArea: 'OAuth',
    },
    user: {
      displayName: 'William vd Walt',
      email: 'William.VanderWalt@Nintex.com',
    },
  },
  {
    // kind: 'User',
    metadata: {
      name: 'Sean',
      title: 'Associate Engineer',
      area: 'Micros',
      subArea: 'OAuth',
    },
    user: {
      displayName: 'Sean Henderson',
      email: 'Sean.Henderson@Nintex.com',
    },
  },
  {
    // kind: 'User',
    metadata: {
      name: 'Ruan',
      title: 'Senior Engineer',
      area: 'Micros',
      subArea: 'OAuth',
    },
    user: {
      displayName: 'Ruan Grobler',
      email: 'Ruan.Grobler@Nintex.com',
    },
  },
  {
    // kind: 'User',
    metadata: {
      name: 'Emile',
      title: 'Senior Lead, Engineering',
      area: 'Micros',
      subArea: 'OAuth',
    },
    user: {
      displayName: 'Emile Kimme',
      email: 'Emile.Kimme@Nintex.com',
    },
  },
  {
    // kind: 'User',
    metadata: {
      name: 'Sean',
      title: 'Associate Engineer',
      area: 'Micros',
      subArea: 'PDFConverter',
    },
    user: {
      displayName: 'Sean Henderson',
      email: 'Sean.Henderson@Nintex.com',
    },
  },
  {
    // kind: 'User',
    metadata: {
      name: 'Andrew',
      title: 'Senior Engineer',
      area: 'Micros',
      subArea: 'PDFConverter',
    },
    user: {
      displayName: 'Andrew Marais',
      email: 'Andrew.Marais@Nintex.com',
    },
  },
  {
    // kind: 'User',
    metadata: {
      name: 'Thinus',
      title: 'Principal Engineer',
      area: 'Micros',
      subArea: 'SCIM',
    },
    user: {
      displayName: 'Thinus du Plooy',
      email: 'Thinus.DuPlooy@Nintex.com',
    },
  },
  {
    // kind: 'User',
    metadata: {
      name: 'Ruan',
      title: 'Senior Engineer',
      area: 'Micros',
      subArea: 'SCIM',
    },
    user: {
      displayName: 'Ruan Grobler',
      email: 'Ruan.Grobler@Nintex.com',
    },
  },
  {
    // kind: 'User',
    metadata: {
      name: 'Ruan',
      title: 'Senior Engineer',
      area: 'Micros',
      subArea: 'SmartObjects',
    },
    user: {
      displayName: 'Ruan Grobler',
      email: 'Ruan.Grobler@Nintex.com',
    },
  },
  {
    // kind: 'User',
    metadata: {
      name: 'William',
      title: 'Staff Engineer',
      area: 'Micros',
      subArea: 'SmartObjects',
    },
    user: {
      displayName: 'William vd Walt',
      email: 'William.VanderWalt@Nintex.com',
    },
  },
  {
    // kind: 'User',
    metadata: {
      name: 'Thinus',
      title: 'Principal Engineer',
      area: 'Micros',
      subArea: 'SmartObjects',
    },
    user: {
      displayName: 'Thinus du Plooy',
      email: 'Thinus.DuPlooy@Nintex.com',
    },
  },
  {
    // kind: 'User',
    metadata: {
      name: 'Thinus',
      title: 'Principal Engineer',
      area: 'Micros',
      subArea: 'Sync',
    },
    user: {
      displayName: 'Thinus du Plooy',
      email: 'Thinus.DuPlooy@Nintex.com',
    },
  },
  {
    // kind: 'User',
    metadata: {
      name: 'William',
      title: 'Staff Engineer',
      area: 'Micros',
      subArea: 'Sync',
    },
    user: {
      displayName: 'William vd Walt',
      email: 'William.VanderWalt@Nintex.com',
    },
  },
  {
    // kind: 'User',
    metadata: {
      name: 'Calvin',
      title: 'Associate Engineer',
      area: 'Micros',
      subArea: 'Sync',
    },
    user: {
      displayName: 'Calvin Machete',
      email: 'Calvin.Machete@Nintex.com',
    },
  },
  {
    // kind: 'User',
    metadata: {
      name: 'CloudOps',
      title: 'Team',
      area: 'Micros',
      subArea: 'Tenant Management',
    },
    user: {
      displayName: 'CloudOps',
    },
  },
  {
    // kind: 'User',
    metadata: {
      name: 'Sanet',
      title: 'Senior Engineer',
      area: 'Mobile',
      subArea: 'Android-K2Workspace',
    },
    user: {
      displayName: 'Sanet Kuun',
      email: 'Sanet.Kuun@Nintex.com',
    },
  },
  {
    // kind: 'User',
    metadata: {
      name: 'Ruan',
      title: 'Senior Engineer',
      area: 'Mobile',
      subArea: 'iOS-K2Workspace',
    },
    user: {
      displayName: 'Ruan Grobler',
      email: 'Ruan.Grobler@Nintex.com',
    },
  },
  {
    // kind: 'User',
    metadata: {
      name: 'Andrew',
      title: 'Senior Engineer',
      area: 'Shared',
      subArea: 'Certificates',
    },
    user: {
      displayName: 'Andrew Marais',
      email: 'Andrew.Marais@Nintex.com',
    },
  },
  {
    // kind: 'User',
    metadata: {
      name: 'Thinus',
      title: 'Principal Engineer',
      area: 'Shared',
      subArea: 'oAuth Client',
    },
    user: {
      displayName: 'Thinus du Plooy',
      email: 'Thinus.DuPlooy@Nintex.com',
    },
  },
];
