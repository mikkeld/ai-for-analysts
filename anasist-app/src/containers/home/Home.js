import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import Card, { CardActions, CardContent, CardMedia } from 'material-ui/Card';
import Button from 'material-ui/Button';
import Typography from 'material-ui/Typography';
import { Link } from 'react-router-dom';

const styles = theme => ({
  card: {
    maxWidth: 300,
    height: 350,
    marginRight: theme.spacing.unit*2
  },
  media: {
    height: 125,
  },
  cardContainer: {
    position: 'relative',
    display: 'flex',
    padding: theme.spacing.unit*2,
  },
  actions: {
    position: 'absolute',
    bottom: theme.spacing.unit*2,
  }
});

const SimpleMediaCard = (props) => {
  const { classes } = props;
  return (
    <div>
      <Card className={classes.card}>
        <CardMedia
          className={classes.media}
          image={props.imagePath}
          title={props.title}
        />
        <CardContent>
          <Typography type="headline" component="h2">
            {props.title}
          </Typography>
          <Typography component="p">
            {props.content}
          </Typography>
        </CardContent>
        <div className={classes.actions}>
          <CardActions >
            <Button dense color="primary">
              <Link to={{ pathname: props.linkTo}}>Open</Link>
            </Button>
          </CardActions>
        </div>
      </Card>
    </div>
  );
};

const cards = [
  {
    imagePath: "https://firebasestorage.googleapis.com/v0/b/fire-app-9c904.appspot.com/o/users.png?alt=media&token=a277826a-33db-4bfe-9d4e-c3ad56f18dc0",
    title: "New Project",
    content: "Step by step guide to creating new Machine Learning projects",
    linkTo: "/new_project"
  },
  {
    imagePath: "https://firebasestorage.googleapis.com/v0/b/fire-app-9c904.appspot.com/o/products.png?alt=media&token=339da45b-2cc4-4b21-9df1-e83739f39981",
    title: "Manage Models",
    content: "View all your models and deep dive on the performance",
    linkTo: "/models"
  },
  {
    imagePath: "https://firebasestorage.googleapis.com/v0/b/fire-app-9c904.appspot.com/o/companies.png?alt=media&token=c9f2c090-3fc3-42d2-9236-24eb6b215565",
    title: "Deploy",
    content: "Deploy your models and run predictions against a file or as an API service",
    linkTo: "/models"
  },
  {
    imagePath: "https://firebasestorage.googleapis.com/v0/b/fire-app-9c904.appspot.com/o/jobs.png?alt=media&token=8080b71a-a2aa-431e-890c-53e810c80ca2",
    title: "Samples",
    content: "Before you create a Machine Learning project you need to have data. Here are some samples",
    linkTo: "/samples"
  },
];

const Home = props => {
  const { classes } = props;
  return (
    <div className={classes.cardContainer}>
      {
        cards.map((card, index) => <SimpleMediaCard key={index}
                                                    imagePath={card.imagePath}
                                                    title={card.title}
                                                    content={card.content}
                                                    linkTo={card.linkTo}
                                                    classes={classes}
        />)
      }
    </div>
  )
};

SimpleMediaCard.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Home);