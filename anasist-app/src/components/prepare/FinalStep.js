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
import {getModels} from "../../utils/modelsService";

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

class FinalStep extends Component {
  state = {
    expanded: null,
  };

  componentDidMount() {
    this.props.prepareAssessment();
  }

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
        <div className={classes.wrapper}>
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
        </div>
        <Button raised color="primary" onClick={this.props.onFinishClick} style={{float: 'right'}}>
          Complete
        </Button>
      </div>
    )
  }
}

export default withStyles(styles)(FinalStep)