import { ThemeProvider } from '@mui/material/styles';
import { Box, CssBaseline } from '@mui/material';
import { Provider } from 'react-redux';
import theme from './theme';
import { store } from './store';
import Map from './components/Map/Map';
import Actions from './components/Actions/Actions';

const App = (): JSX.Element => {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Provider store={store}>
        <Box
          sx={{
            height: '100vh',
            position: 'relative'
          }}
        >
          <Map
            sx={{
              height: '100%'
            }}
          />
          <Actions
            sx={{
              position: 'fixed',
              padding: 4,
              bottom: 0,
              display: 'flex',
              justifyContent: 'center',
              left: 0,
              right: 0
            }}
          />
        </Box>
      </Provider>
    </ThemeProvider>
  );
};

export default App;
