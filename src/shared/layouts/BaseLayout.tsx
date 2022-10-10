import { Icon, IconButton, Typography, useTheme } from '@mui/material';
import { Box } from '@mui/system';
import React from 'react';

interface IBaseLayoutProps {
  children?: React.ReactNode;
  title: string;
}
const BaseLayout: React.FC<IBaseLayoutProps> = ({ children, title }) => {
  const theme = useTheme();
  return (
    <Box height="100%" display="flex" flexDirection="column" gap={1}>
      <Box
        display="flex"
        alignItems="center"
        padding={1}
        height={theme.spacing(12)}
        gap={1}
      >
        <IconButton>
          <Icon>menu</Icon>
        </IconButton>
        <Typography variant="h5">{title}</Typography>
      </Box>

      <Box>ToolBox</Box>
      <Box>{children}</Box>
    </Box>
  );
};

export default BaseLayout;
