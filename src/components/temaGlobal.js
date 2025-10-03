import { createTheme, responsiveFontSizes } from '@mui/material/styles';
import { esES } from '@mui/material/locale';

const TemaGlobals = createTheme(
  {
    palette: {
      primary: {
        main: '#1976d2',
      },
      textColorTitle: '#5900d6',
      textColorTitle2: '#212121',
      backgroundColorPage: '#eee',
      principalColor: '#ff9800',
    },
  },
  esES
);

export const TemaGlobal = responsiveFontSizes(TemaGlobals);
