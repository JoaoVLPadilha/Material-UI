import React from 'react'
import { Button } from '@mui/material';
import { useAppThemeContext, useAppDrawerContext } from '../contexts';
interface IFirstProps  {
  children?: React.ReactNode
}
const FirstPage: React.FC<IFirstProps> = ({children}) => {
  const {toggleTheme} = useAppThemeContext();
  const {toggleDrawerOpen} = useAppDrawerContext();
  return (
    <>
    <Button variant='contained' color='primary' onClick={toggleTheme}>toggleTheme</Button>
    <Button variant='contained' color='warning' onClick={toggleDrawerOpen}>toggleDrawerOpen</Button>
    </>
  )
}

export default FirstPage