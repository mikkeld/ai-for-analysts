import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import Button from 'material-ui/Button';
import Paper from 'material-ui/Paper';
import Typography from 'material-ui/Typography';
import {getDeployData} from "../../utils/modelsService";
import CodeSnippet from "../../components/shared/CodeSnippet";

const styles = theme => ({
  root: theme.mixins.gutters({
    paddingTop: 16,
    paddingBottom: 16,
    marginTop: theme.spacing.unit * 3,
  }),
  wrapper: {
    marginBottom: theme.spacing.unit * 3,
  }
});

class Deploy extends React.Component {
  state = {
    model: {}
  };

  componentDidMount() {
    getDeployData(this.props.id)
      .then(data => this.setState({model: data}))
  }

  render() {
    const { classes } = this.props;
    if (this.state.model.hasOwnProperty('deployed') && !this.state.model.deployed) {
      return (
        <Paper className={classes.root} elevation={4}>
          <div className={classes.wrapper}>
            <Typography type="title" gutterBottom>
              Deploy model
            </Typography>
            <Typography type="caption" gutterBottom>
              When a model is deployed you are able to run predictions against it.<br />
              You can either do this by uploading a file or calling the prediction API directly. See <a href="#">docs</a> for details.
            </Typography>
          </div>
          <Button raised color="primary">Deploy model</Button>
        </Paper>
      )
    } else {
      return (
        <Paper className={classes.root} elevation={4}>
          <div className={classes.wrapper}>
            <div className={classes.wrapper}>
              <Typography type="title" gutterBottom>
                Make predictions from file
              </Typography>
              <Typography type="caption" gutterBottom>
                Upload a file to make predictions.<br />
                See the <a href="#">docs</a> for details on how to structure this.
              </Typography>
            </div>
            <Button raised color="primary">Upload file</Button>
          </div>
          <div className={classes.wrapper}>
            <div className={classes.textGroup}>
              <Typography type="title" gutterBottom>
                Make predictions as an API service
              </Typography>
              <Typography type="caption" gutterBottom>
                You can also make predictions straight from the api.<br />
                See the <a href="#">docs</a> for details on how to structure this.
              </Typography>
            </div>
            <CodeSnippet/>
          </div>
        </Paper>
      );
    }
  }
}

Deploy.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Deploy);