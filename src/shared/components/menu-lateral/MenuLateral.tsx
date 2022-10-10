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
import { useMatch, useNavigate, useResolvedPath } from 'react-router-dom';


interface IListItemLinkProps{
  to: string;
  icon: string;
  label: string;
  onClick: (() => void) | undefined;
}
const ListItemLink: React.FC<IListItemLinkProps> = ({to, icon, label, onClick}) => {
  const navigate = useNavigate()

  const resolvedPath = useResolvedPath(to)
  const match = useMatch({path: resolvedPath.pathname, end: false})
  console.log('match',match)
  const handleClick = () =>{
    navigate(to)
    onClick?.()
  }

  return (
    <ListItemButton selected={!!match} onClick={handleClick}>
      <ListItemIcon>
        <Icon>{icon}</Icon>
      </ListItemIcon>
      <ListItemText primary={label} />
    </ListItemButton>
  );
};

interface IMenuLateral {
  children?: React.ReactNode;
}
const MenuLateral: React.FC<IMenuLateral> = ({ children }) => {
  const theme = useTheme();
  const smDown = useMediaQuery(theme.breakpoints.down('sm'));
  const { isDrawerOpen, toggleDrawerOpen, drawerOptions } = useAppDrawerContext();
  React.useEffect(() => {
    if (!smDown && isDrawerOpen === true) toggleDrawerOpen();
  }, [smDown]);

  // console.log(isDrawerOpen);
  // console.log(theme);
  return (
    <>
      <Drawer
        open={isDrawerOpen}
        variant={smDown ? 'temporary' : 'permanent'}
        onClose={toggleDrawerOpen}
      >
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
              {drawerOptions.map(drawerOptions => (
                <ListItemLink
                key={drawerOptions.label}
                icon={drawerOptions.icon}
                label={drawerOptions.label}
                to={drawerOptions.path}
                onClick={smDown ? toggleDrawerOpen: undefined}
                ></ListItemLink>
              ))}
            </List>
          </Box>
        </Box>
      </Drawer>
      <Box
        height="100vh"
        marginLeft={smDown ? theme.spacing(0) : theme.spacing(28)}
      >
        {children}
      </Box>
    </>
  );
};

export default MenuLateral;
