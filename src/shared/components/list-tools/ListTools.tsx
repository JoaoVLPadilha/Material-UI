import React from 'react';
import { Box, Button, Icon, Paper, TextField, useTheme } from '@mui/material';
import { Environment } from '../../environment';

interface IListToolsProps {
  textSearch?: string;
  showSearchInput?: boolean;
  onChangeTextSearch?: (newText: string) => void;

  textButtonNew?: string;
  showButtonNew?: boolean;
  onClickNew?: () => void;
}

const ListTools: React.FC<IListToolsProps> = ({
  textSearch = '',
  showSearchInput = false,
  onChangeTextSearch,
  onClickNew,
  textButtonNew = 'New',
  showButtonNew = true,
}) => {
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
      {showSearchInput && (
        <TextField
          size="small"
          placeholder={Environment.SEARCH_PLACEHOLDER}
          value={textSearch}
          onChange={(e) => onChangeTextSearch?.(e.target.value)}
        />
      )}
      <Box flex={1} display="flex" justifyContent="end">
        {showButtonNew && (
          <Button
            color="primary"
            variant="contained"
            disableElevation
            onClick={onClickNew}
            endIcon={<Icon>add</Icon>}
          >
            {textButtonNew}
          </Button>
        )}
      </Box>
    </Box>
  );
};

export default ListTools;
