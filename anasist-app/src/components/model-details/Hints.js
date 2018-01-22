import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import Typography from 'material-ui/Typography';
import { indigo, blue } from 'material-ui/colors';
import Grid from 'material-ui/Grid';
import Card, { CardActions, CardContent } from 'material-ui/Card';
import ExpansionPanel, {
  ExpansionPanelDetails,
  ExpansionPanelSummary,
} from 'material-ui/ExpansionPanel';
import ExpandMoreIcon from 'material-ui-icons/ExpandMore';
import Icon from 'material-ui/Icon';

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
  root: {
    width: '100%',
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    flexBasis: '33.33%',
    flexShrink: 0,
    display: 'inline-flex',
    verticalAlign: 'middle'
  },
  secondaryHeading: {
    fontSize: theme.typography.pxToRem(15),
    color: theme.palette.text.secondary,
  },
  wrapper: {
    marginBottom: theme.spacing.unit * 3,
  }
});

class Hints extends React.Component {
  state = {
    expanded: null,
  };

  handleChange = panel => (event, expanded) => {
    this.setState({
      expanded: expanded ? panel : false,
    });
  };

  render() {
    const { classes } = this.props;
    const { expanded } = this.state;
    return (
      <div className={classes.root}>
        <Typography type="title" gutterBottom>
          Model performance
        </Typography>
        <Typography type="caption" gutterBottom>
          Here are some key metrics to tell you about how good your model is
        </Typography>
        <div className={classes.wrapper}>
          {
            this.props.hints.map(hint => {
              return (
                <ExpansionPanel expanded={expanded === hint.id} onChange={this.handleChange(hint.id)}>
                  <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
                    <Typography className={classes.heading}>
                      <Icon color="error">
                        error
                      </Icon>
                      {hint.theme}
                    </Typography>
                    <Typography className={classes.secondaryHeading}>{hint.summary}</Typography>
                  </ExpansionPanelSummary>
                  <ExpansionPanelDetails>
                    <Typography>
                      {hint.details}
                    </Typography>
                  </ExpansionPanelDetails>
                </ExpansionPanel>
              )
            })
          }
        </div>
      </div>
    );
  }
}

Hints.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Hints);