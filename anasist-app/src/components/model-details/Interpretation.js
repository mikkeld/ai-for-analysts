import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import { Chart } from 'react-google-charts';
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

const options = {"title":"Feature importance for model","bar":{"groupWidth":"95%"},"legend":{"position":"none"}};

class Interpretation extends React.Component {
  componentDidMount() {
    console.log(this.props.feature_importance)
  }
  render() {
    const { classes } = this.props;
    const dataValues = this.props.feature_importance
      .map(item => [item.feature, Number(item.importance)]);
    return (
      <div>
        <Typography type="title" gutterBottom>
          Most important signals
        </Typography>
        <Typography type="caption" gutterBottom>
          These are the most important features for predicting your model
        </Typography>
        <div className={classes.chartContainer}>
          <Chart
            chartType="BarChart"
            data={[["Element","Density"]].concat(dataValues)}
            graph_id="BarChart"
            width="100%"
            height="400px"
            options={options}
          />
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