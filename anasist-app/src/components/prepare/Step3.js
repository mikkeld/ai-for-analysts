import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import TextField from 'material-ui/TextField';
import { MenuItem } from 'material-ui/Menu';

const styles = theme => ({
  root: {
    textAlign: 'center',
    marginTop: theme.spacing.unit * 3,
    marginBottom: theme.spacing.unit * 3,
  },
  textFieldSelect: {
    marginLeft: 0,
    marginRight: theme.spacing.unit * 3,
    width: 200,
    marginTop: theme.spacing.unit * 3
  },
  menu: {
    width: 200,
  },
});

const Step3 = props => {
  const {classes} = props;
  return (
    <div className={classes.root}>
      <TextField
        id="target"
        select
        label="Select a target column"
        margin="normal"
        className={classes.textFieldSelect}
        value={props.target}
        helperText="What you want to predict. Ex. revenue, churn"
        onChange={props.handleChange('target')}
        SelectProps={{
          MenuProps: {
            className: classes.menu,
          },
          name: "target"
        }}
      >
        {props.availableColumns.map(column => (
          <MenuItem key={column} value={column}>
            {column}
          </MenuItem>
        ))}
      </TextField>
      <TextField
        id="id"
        select
        label="Select an ID column"
        margin="normal"
        className={classes.textFieldSelect}
        value={props.id}
        helperText="The unique identifier. Ex. customerId, productId"
        onChange={props.handleChange('id')}
        SelectProps={{
          MenuProps: {
            className: classes.menu,
          },
          name: "id"
        }}
      >
        {props.availableColumns.map(column => (
          <MenuItem key={column} value={column}>
            {column}
          </MenuItem>
        ))}
      </TextField>
    </div>
  )
};

Step3.propTypes = {
  classes: PropTypes.object.isRequired,
};


export default withStyles(styles)(Step3)