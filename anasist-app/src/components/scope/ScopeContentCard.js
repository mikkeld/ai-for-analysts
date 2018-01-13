import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import Card, { CardActions, CardContent, CardMedia } from 'material-ui/Card';
import Button from 'material-ui/Button';
import Typography from 'material-ui/Typography';
import PlayCircleOutlineIcon from 'material-ui-icons/PlayCircleOutline';

const styles = {
  card: {
    maxWidth: 400,
  },
  media: {
    height: 200,
  },
  cardMediaContainer: {
    position: 'relative'
  },
  videoOverlay: {
    margin: 'auto',
    display: 'block',
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
    zIndex: 1
  }
};

const ScopeContentCard = props => {
  const { classes } = props;
  return (
    <div>
      <Card className={classes.card}>
        <div className={classes.cardMediaContainer} >
          <PlayCircleOutlineIcon className={classes.videoOverlay} />
          <CardMedia
            onClick={props.handleCardMediaClick}
            className={classes.media}
            image={props.imageUrl}
            title={props.title}
          />
        </div>
        <CardContent>
          <Typography type="headline" component="h2">
            {props.title}
          </Typography>
          <Typography component="p">
            {props.content}
          </Typography>
        </CardContent>
        <CardActions>
          <a target='_blank' href={props.helpCenterLink}>
            <Button dense color="primary">
              Learn More
            </Button>
            <Button dense color="primary">
              Ask Question
            </Button>
          </a>
        </CardActions>
      </Card>
    </div>
  );
};

ScopeContentCard.propTypes = {
  classes: PropTypes.object.isRequired,
  imageUrl: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  content: PropTypes.string.isRequired,
  imageClickAction: PropTypes.func,
  helpCenterLink: PropTypes.string
};

export default withStyles(styles)(ScopeContentCard);