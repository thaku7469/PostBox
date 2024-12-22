import React from 'react'

import { Box, CircularProgress, Typography, styled } from '@mui/material';

const LoadingWrapper = styled(Box) ({
  display : 'flex',
  alignItems : 'center',
  justifyContent : 'center',
  height: '100vh',
});

const BufferingComponent = () => {
  return (
    <LoadingWrapper>
      <CircularProgress />
      <Typography>Loading....</Typography>
    </LoadingWrapper>
  )
}

export default BufferingComponent