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

class Transformations extends React.Component {
  render() {
    const { classes } = this.props;

    return (
      <div className={classes.root}>
        <Typography type="title" gutterBottom>
          Model performance
        </Typography>
        <Typography type="caption" gutterBottom>
          Here are some key metrics to tell you about how good your model is
        </Typography>
        <Grid container className={classes.cardContainer}>
          <CustomCard title="Outlier" classes={classes}>
            <Typography className={classes.cardContentText} type="caption">{this.props.outliers.solution}</Typography>
            <Typography className={classes.cardContentText} type="display3">{this.props.outliers.impact}</Typography>
            <Typography className={classes.cardContentText} type="p">Outliers can have negative impact on the performance of the model</Typography>
          </CustomCard>
          <CustomCard title="Imbalance" classes={classes}>
            <Typography className={classes.cardContentText} type="caption">{this.props.imbalance.solution}</Typography>
            <Typography className={classes.cardContentText} type="display3">{this.props.imbalance.impact}</Typography>
            <Typography className={classes.cardContentText} type="p">An imbalanced dataset cannot rely on accuracy</Typography>
          </CustomCard>
        </Grid>
      </div>
    );
  }
}

Transformations.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Transformations);