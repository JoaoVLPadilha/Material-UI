import {createTheme} from '@mui/material'
import cyan from '@mui/material/colors/cyan'
import yellow from '@mui/material/colors/yellow'

export const LightTheme = createTheme({
  palette: {
    primary: {
      main: yellow[700],
      dark: yellow[800],
      light: yellow[500],
      contrastText: '#fff',
    },
    secondary: {
      main: cyan[500],
      dark: cyan[400],
      light: cyan[300],
      contrastText: '#fff',
    },
    background: {
      paper:'#fff', 
      default:'#c1c1c1',
      // default:'#f7f6f3',
    }
  }
})