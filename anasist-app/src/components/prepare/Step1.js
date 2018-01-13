import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import TextField from 'material-ui/TextField';
import Card, { CardActions, CardContent } from 'material-ui/Card';
import Button from 'material-ui/Button';
import Typography from 'material-ui/Typography';
import {ProblemTypeDescriptions} from "../../shared/problemTypes";
import { indigo, blue } from 'material-ui/colors';
import Grid from 'material-ui/Grid';

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
  selectedCard: {
    width: 275,
    height:200,
    backgroundColor: blue[500],
    cursor: 'pointer'
  },
  cardText: {
    color: 'white'
  },
  cardContentText: {
    color: indigo[100]
  },
  cardContainer: {
    maxWidth: 600,
    marginTop: theme.spacing.unit * 3,
    marginBottom: theme.spacing.unit * 3,
  }
});

const ProblemCard = props => {
  return (
    <div>
      <Card className={props.isSelected ? props.classes.selectedCard : props.classes.card}
            onClick={() => props.onSelect(props.title)}
      >
        <CardContent>
          <Typography type="headline" component="h2" className={props.classes.cardText}>
            {props.title}
          </Typography>
          <Typography component="p"  className={props.classes.cardContentText}>
            {props.content}
          </Typography>
        </CardContent>
        <CardActions>
          <Button dense className={props.classes.cardText}>Learn More</Button>
        </CardActions>
      </Card>
    </div>
  )
};

const Step1 = props => {
  const {classes} = props;
  return (
    <div>
      <TextField
        id="name"
        label="Project Name"
        value={props.name}
        onChange={props.handleChange('name')}
        margin="normal"
        fullWidth
      />
      <TextField
        id="description"
        label="Description"
        value={props.description}
        onChange={props.handleChange('description')}
        margin="normal"
        fullWidth
      />
      <Grid container className={classes.cardContainer}>
        {Object.keys(ProblemTypeDescriptions).map(problemType => {
          return  <Grid item>
                    <ProblemCard key={ProblemTypeDescriptions[problemType]}
                                 title={problemType}
                                 content={ProblemTypeDescriptions[problemType]}
                                 classes={classes}
                                 onSelect={props.handleProblemSelect}
                                 isSelected={problemType === props.selectedProblemType}/>
                  </Grid>;
          }
        )}
      </Grid>
    </div>
  )
};

Step1.propTypes = {
  classes: PropTypes.object.isRequired,
  handleChange: PropTypes.func.isRequired,
  name: PropTypes.string.isRequired,
  description: PropTypes.string,
};


export default withStyles(styles)(Step1)