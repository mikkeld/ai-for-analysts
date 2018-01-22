import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import Card, { CardActions, CardContent, CardMedia } from 'material-ui/Card';
import Button from 'material-ui/Button';
import Typography from 'material-ui/Typography';
import Grid from 'material-ui/Grid';
import {getSamples} from "../../utils/samplesService";
import {
  Link
} from 'react-router-dom';

const styles = theme => ({
  card: {
    maxWidth: 345,
  },
  media: {
    height: 200,
  },
  cardContainer: {
    marginTop: theme.spacing.unit * 3,
    marginBottom: theme.spacing.unit * 3,
  }
});

const CustomMediaCard = props => {
  const { classes } = props;
  return (
    <Grid item>
      <Card className={classes.card}>
        <CardMedia
          className={classes.media}
          image={props.media_url}
          title=""
        />
        <CardContent>
          <Typography type="headline" component="h2">
            {props.title}
          </Typography>
          <Typography component="p">
            {props.description}
          </Typography>
        </CardContent>
        <CardActions>
          <Link style={{textDecoration: 'none'}} to={{ pathname: `samples/${props.id}` }}>
            <Button dense color="primary">
              Learn More
            </Button>
          </Link>
        </CardActions>
      </Card>
    </Grid>
  );
};

class Samples extends React.Component {
  constructor() {
    super();
    this.state = {
      samples: []
    };
  }

  componentDidMount() {
    getSamples()
      .then(samples => this.setState({samples: samples}));
  }

  render() {
    const { classes } = this.props;
    return (
      <div className={classes.root}>
        <Typography type="title" gutterBottom>
          Samples
        </Typography>
        <Typography type="caption" gutterBottom>
          Here are some samples.
        </Typography>
        <Grid container className={classes.cardContainer}>
          {this.state.samples.map(sample => {
            return (
              <CustomMediaCard classes={this.props.classes}
                               key={sample.id}
                               {...sample}
              />
            )
          })}
        </Grid>
      </div>
    );
  }
}

Samples.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Samples);
