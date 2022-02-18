import { ThemeProvider } from '@mui/material/styles';
import { CssBaseline } from '@mui/material';
import { Provider } from 'react-redux';
import theme from './theme';
import { store } from './store';
import VesselTrack from './components/VesselTrack/VesselTrack';

const App = (): JSX.Element => {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Provider store={store}>
        <VesselTrack />
      </Provider>
    </ThemeProvider>
  );
};

export default App;
