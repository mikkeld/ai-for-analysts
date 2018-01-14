import React, {Component} from 'react';
import { withStyles } from 'material-ui/styles';
import Button from 'material-ui/Button';
import ExpansionPanel, {
  ExpansionPanelDetails,
  ExpansionPanelSummary,
} from 'material-ui/ExpansionPanel';
import Typography from 'material-ui/Typography';
import ExpandMoreIcon from 'material-ui-icons/ExpandMore';
import Icon from 'material-ui/Icon';

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
});

class FinalStep extends Component {
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
        {
          this.props.assessment.length > 0 &&
          <Typography type="subheading" gutterBottom>
            We found a few issues with your data set
          </Typography>
        }
        {
          this.props.assessment.map(item => {
            return (
              <ExpansionPanel expanded={expanded === item.id} onChange={this.handleChange(item.id)}>
                <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
                  <Typography className={classes.heading}>
                    <Icon color="error">
                      error
                    </Icon>
                    {item.theme}
                  </Typography>
                  <Typography className={classes.secondaryHeading}>{item.summary}</Typography>
                </ExpansionPanelSummary>
                <ExpansionPanelDetails>
                  <Typography>
                    {item.details}
                  </Typography>
                </ExpansionPanelDetails>
              </ExpansionPanel>
            )
          })
        }
        <Button raised color="primary" onClick={this.props.onFinishClick}>
          Finish
        </Button>
      </div>
    )
  }
}

export default withStyles(styles)(FinalStep)