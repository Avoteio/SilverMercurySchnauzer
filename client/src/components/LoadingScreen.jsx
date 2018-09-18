import React from 'react';
import CircularProgress from '@material-ui/core/CircularProgress';

const LoadingScreen = (props) => {
  return (
    <div>
      <CircularProgress className='loading-animation' />
    </div>
  );
};

export default LoadingScreen;
