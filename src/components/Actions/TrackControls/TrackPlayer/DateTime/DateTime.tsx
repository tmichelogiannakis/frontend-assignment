import { format } from 'date-fns';
import { Box } from '@mui/material';

/**
 * DateTime component, a component to display Date and Time from a timestamp
 */
const DateTime = ({ timestamp }: { timestamp: number }) => {
  const date = new Date(timestamp);

  return (
    <Box whiteSpace="nowrap">
      <Box>{format(date, 'yyyy-MM-dd')}</Box>
      <Box>{format(date, 'HH:mm')}</Box>
    </Box>
  );
};

export default DateTime;
