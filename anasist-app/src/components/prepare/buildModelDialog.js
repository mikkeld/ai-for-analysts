import React from 'react';
import Button from 'material-ui/Button';
import { withStyles } from 'material-ui/styles';
import Typography from 'material-ui/Typography';
import Dialog, {
  DialogActions,
  DialogContent,
  DialogTitle,
} from 'material-ui/Dialog';

const styles = theme => ({
  textBlock: {
    marginTop: theme.spacing.unit * 3,
    width: 300
  }
});

const TextBlock = props => {
  return (
    <div className={props.classes.textBlock}>
      <Typography type="caption" gutterBottom>
        {props.title}
      </Typography>
      <Typography type="subheading" gutterBottom>
        {props.content}
      </Typography>
    </div>
  )
};

const BuildModelDialog = props => {
  const {classes} = props;
  return (
    <div>
      <Dialog
        open={props.open}
        onClose={props.handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{"Confirm model details"}</DialogTitle>
        <DialogContent>
          <TextBlock title="Model name" content={props.name} classes={classes}/>
          <TextBlock title="Model description" content={props.description} classes={classes}/>
          <TextBlock title="Problem type" content={props.selectedProblemType} classes={classes}/>
          <TextBlock title="Target column" content={props.target} classes={classes}/>
          <TextBlock title="ID column" content={props.id} classes={classes}/>
        </DialogContent>
        <DialogActions>
          <Button onClick={props.handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={props.buildModel} color="primary" raised autoFocus>
            Build model
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default withStyles(styles)(BuildModelDialog);