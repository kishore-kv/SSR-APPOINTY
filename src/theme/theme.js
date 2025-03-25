import { createTheme } from '@mui/material/styles';

export const theme = createTheme({
  cssVariables: true,
  palette: {
    primary: {
      main: '#1E5E6D',
    },
    secondary: {
      main: '#FFFFFF',
    },
    error: {
      main: '#FF0000',
    },
  },
  typography: {
    fontFamily: 'robotoregular',
  },
  components: {
    MuiTextField: {
      styleOverrides: {
        root: {
          '& .MuiInputBase-input': {
            padding: '0 16px',
            height: '40px',
          },
          '& .MuiInputBase-root': {
            height: '40px',
          },
          '& .MuiInputBase-input:-webkit-autofill': {
            'WebkitBoxShadow': '0 0 0 100px #fff inset',
            'WebkitTextFillColor': 'unset',
            'caretColor': '#fff',
          },
          '& .MuiInputLabel-asterisk': {
            color: 'red',
          },
          '& .MuiInputLabel-root': {
            top: '-6px',
          },
          '& .Mui-focused .MuiInputLabel-root': {
            top: '0',
          },
        },
      },
    },
    MuiRadio: {
      styleOverrides: {
        root: {
          '& .MuiTouchRipple-root': {
            display: 'none',
          },
          '&.Mui-focusVisible': {
            outline: 'none',
          },
          '&:hover': {
            backgroundColor: 'transparent',
          },
          '&.Mui-checked': {
            color: '#1E5E6D',
            '&.Mui-disabled': {
              color: '#767676',
            },
          },
        },
      },
    },
  },
});
