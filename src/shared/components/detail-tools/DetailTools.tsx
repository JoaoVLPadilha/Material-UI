import React from 'react';
import { Box, useTheme, Paper, Icon, Button, Divider } from '@mui/material';

export const DetailTools: React.FC = () => {
  const theme = useTheme();
  return (
    <Box
      gap={1}
      marginX={1}
      padding={1}
      paddingX={2}
      display="flex"
      alignItems="center"
      height={theme.spacing(5)}
      component={Paper}
    >
      <Button
        color="primary"
        variant="contained"
        disableElevation
        startIcon={<Icon>save</Icon>}
      >
        Save
      </Button>
      <Button
        color="primary"
        variant="outlined"
        disableElevation
        startIcon={<Icon>add</Icon>}
      >
        New
      </Button>
      <Button
        color="primary"
        variant="outlined"
        disableElevation
        startIcon={<Icon>delete</Icon>}
      >
        Delete
      </Button>
      <Button
        color="primary"
        variant="outlined"
        disableElevation
        startIcon={<Icon>save</Icon>}
      >
        Save and go back
      </Button>
      <Divider variant='middle' orientation='vertical'/>
      <Button
        color="primary"
        variant="outlined"
        disableElevation
        startIcon={<Icon>arrow_back</Icon>}
      >
        Go Back
      </Button>
    </Box>
  );
};
