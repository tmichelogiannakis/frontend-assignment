import { FC } from 'react';
import { Typography, TypographyProps } from '@mui/material';

/**
 * Label component, a reusable component for form control label
 */
const Label: FC<TypographyProps<'label'>> = ({ children, ...otherProps }) => {
  const { sx, ...rest } = otherProps;
  return (
    <Typography
      component="label"
      sx={{ display: 'inline-block', lineHeight: 1, mb: 1, ...sx }}
      {...rest}
    >
      {children}
    </Typography>
  );
};

export default Label;
