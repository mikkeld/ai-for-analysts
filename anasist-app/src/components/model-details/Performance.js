import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import Typography from 'material-ui/Typography';
import { indigo, blue } from 'material-ui/colors';
import Grid from 'material-ui/Grid';
import Card, { CardActions, CardContent } from 'material-ui/Card';
import {formatDuration, formatPercentage} from "../../utils/utils";

const CustomCard = props => {
  return (
    <Grid item>
      <Card className={props.classes.card}>
        <CardContent>
          <Typography type="headline" component="h2" className={props.classes.cardText}>
            {props.title}
          </Typography>
          {props.children}
        </CardContent>
      </Card>
    </Grid>
  )
};

const styles = theme => ({
  textField: {
    fontSize: '34px'
  },
  card: {
    width: 275,
    height: 200,
    backgroundColor: indigo[500],
    cursor: 'pointer'
  },
  cardText: {
    color: 'white'
  },
  cardContentText: {
    color: indigo[100]
  },
  cardContainer: {
    marginTop: theme.spacing.unit * 3,
    marginBottom: theme.spacing.unit * 3,
  }
});

class Performance extends React.Component {
  render() {
    const { classes } = this.props;
    const precision = this.props.true_positive / (this.props.true_positive + this.props.false_positive);
    const recall = this.props.true_positive / (this.props.false_negative + this.props.false_positive);

    return (
      <div className={classes.root}>
        <Typography type="title" gutterBottom>
          Model performance
        </Typography>
        <Typography type="caption" gutterBottom>
          Here are some key metrics to tell you about how good your model is
        </Typography>
        <Grid container className={classes.cardContainer}>
          <CustomCard title="Accuracy" classes={classes}>
            <Typography className={classes.cardContentText} type="display3">{formatPercentage(this.props.accuracy)}</Typography>
            <Typography className={classes.cardContentText} type="p">Accuracy shows what percentage your model correctly classified</Typography>
          </CustomCard>
          <CustomCard title="Precision" classes={classes}>
            <Typography className={classes.cardContentText} type="display3">{formatPercentage(precision)}</Typography>
            <Typography className={classes.cardContentText} type="p">Accuracy shows what percentage your model correctly classified</Typography>
          </CustomCard>
          <CustomCard title="Recall" classes={classes}>
            <Typography className={classes.cardContentText} type="display3">{formatPercentage(recall)}</Typography>
            <Typography className={classes.cardContentText} type="p">Accuracy shows what percentage your model correctly classified</Typography>
          </CustomCard>
          <CustomCard title="Confusion matrix" classes={classes}>
            <h1>TBD</h1>
          </CustomCard>
          <CustomCard title="Running time" classes={classes}>
            <Typography className={classes.cardContentText} type="display3">{formatDuration(this.props.running_time)}</Typography>
            <Typography className={classes.cardContentText} type="p">Total running time for the model</Typography>
          </CustomCard>
        </Grid>
      </div>
    );
  }
}

Performance.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Performance);