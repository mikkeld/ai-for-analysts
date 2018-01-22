import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import Typography from 'material-ui/Typography';
import { indigo, blue } from 'material-ui/colors';
import Grid from 'material-ui/Grid';
import Card, { CardActions, CardContent } from 'material-ui/Card';
import {
  Link
} from 'react-router-dom';

const CustomCard = props => {
  return (
    <Grid item>
      <Link style={{textDecoration: 'none'}} to={{ pathname: props.to}}>
        <Card className={props.classes.card}>
          <CardContent>
            <Typography type="headline" component="h2" className={props.classes.cardText}>
              {props.title}
            </Typography>
            {props.children}
          </CardContent>
        </Card>
      </Link>
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

class SampleDetail extends React.Component {
  render() {
    const { classes } = this.props;

    return (
      <div className={classes.root}>
        <Typography type="title" gutterBottom>
          Sample detail
        </Typography>
        <Typography type="caption" gutterBottom>
          Here are some key metrics to tell you about how good your model is
        </Typography>
        <Grid container className={classes.cardContainer}>
          <CustomCard title="Performance" classes={classes} id={this.props.id} to={`/models/${this.props.id}`}>
            <Typography className={classes.cardContentText} type="body1">Inspect the performance of the sample model and get a sense of what worked well.</Typography>
          </CustomCard>
          <CustomCard title="Dataset" classes={classes} id={this.props.id} to={`/samples/dataset/${this.props.id}`}>
            <Typography className={classes.cardContentText} type="body1">Dig into the dataset of the model and see how it's structured</Typography>
          </CustomCard>
        </Grid>
      </div>
    );
  }
}

SampleDetail.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(SampleDetail);