import React from 'react'

import { Box, Typography } from '@mui/material';

import { useRouteError } from 'react-router-dom';

const ErrorComponent = () => {
  const error = useRouteError();
  console.log(error);

  return (
    <Box style = {{ width : '100%' }}>
      <Typography>There was an error loading this page</Typography>
    </Box>
  )
}

export default ErrorComponent