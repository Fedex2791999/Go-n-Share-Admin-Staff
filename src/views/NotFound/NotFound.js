import React from 'react';
import { useHistory } from 'react-router-dom';
import { Button } from '@material-ui/core';

const NotFound = () => {
  const history = useHistory();
  return (
    <div className="not-found">
      <img
        src="https://www.pngitem.com/pimgs/m/561-5616833_image-not-found-png-not-found-404-png.png"
        alt="not-found"
        width="70%"
        height="50%"
      />
      <Button
        type="button"
        variant="contained"
        color="primary"
        onClick={() => {
          history.goBack();
        }}
      >
        Quay lại
      </Button>
    </div>
  );
};

export default NotFound;
