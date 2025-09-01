import { createTheme, responsiveFontSizes } from '@mui/material/styles';
import { esES } from '@mui/material/locale';

const TemaGlobals = createTheme(
  {
    palette: {
      primary: {
        main: '#ffab00',
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
