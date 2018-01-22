import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import {getSampleData} from "../../utils/samplesService";
import ListPredictionsTable from "../../components/model-details/listPredictionsTable";
import Typography from 'material-ui/Typography';

const styles = theme => ({
  root: {color: "blue"}
});

class SampleDataset extends React.Component {
  constructor() {
    super();
    this.state = {
      dataset: undefined
    };
  }

  componentDidMount() {
    getSampleData(this.props.id).then(dataset => this.setState({dataset: dataset}))
  }

  render() {
    const {classes} = this.props;
    return (
      <div className={classes.root}>
        <Typography type="title" gutterBottom>
          Sample dataset
        </Typography>
        <Typography type="caption" gutterBottom>
          Get an understanding for how this dataset is structured
        </Typography>
        {
          this.state.dataset && <ListPredictionsTable headers={this.state.dataset.headers}
                                                      values={this.state.dataset.values}/>
        }
      </div>
    );
  }
}

SampleDataset.propTypes = {
  classes: PropTypes.object,
};

export default withStyles(styles)(SampleDataset);