import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import { VictoryChart, VictoryBar, VictoryContainer, VictoryAxis } from 'victory';
import { indigo, blue } from 'material-ui/colors';
import Typography from 'material-ui/Typography';
import ListPredictionsTable from "./listPredictionsTable";

const styles = theme => ({
  chartContainer: {
    maxWidth: 600
  },
  tableGroup: {
    marginBottom: theme.spacing.unit * 3,
  }
});

class Interpretation extends React.Component {
  componentDidMount() {
    console.log(this.props["5_most_correct"])
  }
  render() {
    const { classes } = this.props;
    return (
      <div>
        <Typography type="title" gutterBottom>
          Most important signals
        </Typography>
        <Typography type="caption" gutterBottom>
          These are the most important features for predicting your model
        </Typography>
        <div className={classes.chartContainer}>
          <VictoryChart responsive={false} containerComponent={<VictoryContainer responsive={false}/>}>
            <VictoryAxis dependentAxis/>
            <VictoryBar
              horizontal
              style={{ data: { fill:  blue[500]}}}
              data={this.props.feature_importance}
              x="feature"
              y="importance"
            />
          </VictoryChart>
        </div>
        <div className={classes.tableGroup}>
          <Typography type="title" gutterBottom>
            Most accurate predictions
          </Typography>
          <Typography type="caption" gutterBottom>
            These are the most accurate predictions
          </Typography>
          <ListPredictionsTable {...this.props["5_most_correct"]}/>
        </div>
        <div className={classes.tableGroup}>
          <Typography type="title" gutterBottom>
            Most inaccurate predictions
          </Typography>
          <Typography type="caption" gutterBottom>
            These are the most inaccurate predictions
          </Typography>
          <ListPredictionsTable {...this.props["5_most_incorrect"]}/>
        </div>
      </div>
    );
  }
}

Interpretation.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Interpretation);