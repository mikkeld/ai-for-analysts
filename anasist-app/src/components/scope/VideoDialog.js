import React from 'react';
import Dialog from 'material-ui/Dialog';

const VideoDialog = props => {
  return (
    <div>
      <Dialog
        open={props.open}
        onClose={props.handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        {props.children}
      </Dialog>
    </div>
  );
};

export default VideoDialog;