import React  from 'react';
import { withStyles } from 'material-ui/styles';
import Paper from 'material-ui/Paper';
import { Chart } from 'react-google-charts';
import Typography from 'material-ui/Typography';
import {getModelData} from "../../../utils/modelsService";

const styles = theme => ({
  root: theme.mixins.gutters({
    paddingTop: 16,
    paddingBottom: 16,
    marginTop: theme.spacing.unit * 3,
  }),
  table: {
    minWidth: 700,
  },
});

const options = {"legend":false,"hAxis":{"title":"Score"},"vAxis":{"title":"Precision"}};

export class PrecisionAndRecall extends React.Component {
  state = {
    data: undefined
  };

  componentDidMount() {
    getModelData(this.props.id)
      .then(data => {
        this.setState({data: data})
      })
  }

  render() {
    const { classes } = this.props;
    return (
      <Paper className={classes.root}>
        <Typography type="title" gutterBottom>
          Precision and recall
        </Typography>
        <Typography type="caption" gutterBottom>
          Machine Learning bongus that's surprisingle hard to understand
        </Typography>
        <div className={classes.chartContainer}>
          <Chart
            chartType="LineChart"
            columns={[{"label": "time", "type": "number"}, {"label": "Precision and recall", "type": "number"}]}
            rows={this.state.data && this.state.data.precision_data}
            graph_id="LineChart"
            width="100%"
            height="400px"
            options={options}
          />
        </div>

      </Paper>

    )
  }
}

export default withStyles(styles)(PrecisionAndRecall)
