import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import FirebaseUploader from "../../utils/firebase/FirebaseUploader";
import Typography from 'material-ui/Typography';
import Icon from 'material-ui/Icon';

const styles = theme => ({
 root: {
   margin: 'auto',
   width: '50%',
   align: 'center'
 }
});

const Step2 = props => {
  const {classes} = props;
  if (props.upload) {
    return (
      <div className={classes.root}>
        <Typography type="display1" gutterBottom align="center">
          File uploaded successfully<br />
          <Icon color="disabled" style={{ fontSize: 72 }}>
            check_circle
          </Icon>
        </Typography>

      </div>
    )
  } else {
    return (
      <div className={classes.root}>
        <Typography type="display1" gutterBottom align="center">
          Submit your file
        </Typography>
        <Typography type="caption" gutterBottom align="center">
          Just make sure it lives up to the <a href="#">requirements</a> :)
        </Typography>
        <FirebaseUploader onFileUploadSuccess={props.onFileUploadSuccess}/>
      </div>
    )
  }
};

Step2.propTypes = {
  classes: PropTypes.object.isRequired,
};


export default withStyles(styles)(Step2)