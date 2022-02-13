import { ThemeProvider, createTheme } from '@mui/material/styles';
import { Box, CssBaseline, Typography } from '@mui/material';

const theme = createTheme();

const App = (): JSX.Element => {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box
        sx={{
          height: '100vh',
          textAlign: 'center',
          backgroundColor: 'primary.light'
        }}
      >
        <Typography variant="h1">Hello world</Typography>
        <Typography>
          Dignissimos explicabo tristique animi sed quas ipsam! Dis earum sequi
          fusce elementum facere facilisi ducimus? Harum. Cras eaque dolorem
          voluptate sapien? Euismod, excepteur proident? Nulla nisl enim
          phasellus est ad, accusamus, repellat. Nascetur praesentium harum
          irure a debitis. Officia autem leo quis quibusdam curabitur ac felis?
          Pellentesque facilis.
        </Typography>
      </Box>
    </ThemeProvider>
  );
};

export default App;
