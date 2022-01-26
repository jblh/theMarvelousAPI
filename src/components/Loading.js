import React from 'react';
import CircularProgress from '@mui/material/CircularProgress';
import Stack from '@mui/material/Stack';

const Loading = () => {
  return (
    <Stack alignItems='center' mt={4}>
      <CircularProgress />
    </Stack>
  );
};

export default Loading;
