import {
  Accordion,
  AccordionSummary as MuiAccordionSummary,
  AccordionDetails as MuiAccordionDetails,
  Box,
  BoxProps,
  Typography,
  styled
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import SearchForm from '../SearchForm/SearchForm';

const AccordionSummary = styled(MuiAccordionSummary)(({ theme }) => ({
  boxShadow: 'none',
  paddingLeft: theme.spacing(4),
  paddingRight: theme.spacing(4)
}));

const AccordionDetails = styled(MuiAccordionDetails)(({ theme }) => ({
  padding: theme.spacing(4)
}));

const Actions = (props: BoxProps): JSX.Element => {
  return (
    <Box {...props}>
      <Box sx={{ display: 'inline-block' }}>
        <Accordion>
          <AccordionSummary
            aria-controls="actions-content"
            id="actions-header"
            expandIcon={<ExpandMoreIcon sx={{ fontSize: 40 }} />}
          >
            <Typography variant="h6" component="h2">
              Track a Vessel
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <SearchForm />
          </AccordionDetails>
        </Accordion>
      </Box>
    </Box>
  );
};

export default Actions;
