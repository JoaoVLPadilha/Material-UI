import React from 'react';
import { useAuthContext } from '../../contexts';
import { Box } from '@mui/material';
interface ILoginProps {
  children: React.ReactNode;
}

const Login: React.FC<ILoginProps> = ({ children }) => {
  const { isAuthenticated } = useAuthContext();

  if (isAuthenticated) return <>{children}</>;

  return <Box></Box>;
};

export default Login;
