import { useSelector } from 'react-redux';
import {
  Accordion,
  AccordionSummary as MuiAccordionSummary,
  AccordionDetails as MuiAccordionDetails,
  Box,
  BoxProps,
  Typography,
  styled
} from '@mui/material';
import { ExpandMore as ExpandMoreIcon } from '@mui/icons-material';
import SearchForm from './SearchForm/SearchForm';
import TrackControls from './TrackControls/TrackControls';
import * as vesselTrackStore from '../../store/vessel-track';

/**
 * custom styled AccordionSummary component
 */
const AccordionSummary = styled(MuiAccordionSummary)(({ theme }) => ({
  boxShadow: 'none',
  paddingLeft: theme.spacing(4),
  paddingRight: theme.spacing(4),
  minHeight: '0 !important',
  '.MuiAccordionSummary-content': {
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(2),
    '&.Mui-expanded': {
      marginTop: theme.spacing(2),
      marginBottom: theme.spacing(2)
    }
  }
}));

/**
 * custom styled AccordionDetails component
 */
const AccordionDetails = styled(MuiAccordionDetails)(({ theme }) => ({
  width: 680,
  padding: theme.spacing(0)
}));

/**
 * Actions component.
 * An expandable component to reveal the SearchForm and TrackControls components when expanded
 */
const Actions = (props: BoxProps): JSX.Element => {
  const showSearch = useSelector(vesselTrackStore.selectShowSearch);

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
            {showSearch ? <SearchForm /> : <TrackControls />}
          </AccordionDetails>
        </Accordion>
      </Box>
    </Box>
  );
};

export default Actions;
