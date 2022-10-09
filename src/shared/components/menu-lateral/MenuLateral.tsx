import React from 'react';
import {
  Avatar,
  Divider,
  Drawer,
  Icon,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import { Box } from '@mui/system';
import { useAppDrawerContext } from '../../contexts';
interface IMenuLateral {
  children?: React.ReactNode;
}
const MenuLateral: React.FC<IMenuLateral> = ({ children }) => {
  const theme = useTheme();
  const smDown = useMediaQuery(theme.breakpoints.down('sm'));
  const {isDrawerOpen, toggleDrawerOpen } = useAppDrawerContext();
  React.useEffect(() =>{
    if(!smDown && isDrawerOpen === true) toggleDrawerOpen()
  },[smDown])
  
  console.log(isDrawerOpen)

  console.log(theme)
  return (
    <>
      <Drawer open={isDrawerOpen} variant={smDown ? 'temporary' : 'permanent'} onClose={toggleDrawerOpen}>
        <Box
          width={theme.spacing(28)}
          height="100%"
          display="flex"
          flexDirection="column"
        >
          <Box
            width="100%"
            height={theme.spacing(20)}
            display="flex"
            alignItems="center"
            justifyContent="center"
          >
            <Avatar
              sx={{ height: theme.spacing(12), width: theme.spacing(12) }}
              src=""
            />
          </Box>
          <Divider />
          <Box flex={1}>
            <List component="nav" aria-label="main mailbox folders">
              <ListItemButton>
                <ListItemIcon>
                  <Icon>home</Icon>
                </ListItemIcon>
                <ListItemText primary="Home" />
              </ListItemButton>
            </List>
          </Box>
        </Box>
      </Drawer>
      <Box height="100vh" marginLeft={smDown ? theme.spacing(0):theme.spacing(28) }>
        {children}
      </Box>
    </>
  );
};

export default MenuLateral;
