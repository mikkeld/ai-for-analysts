import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import CustomStepper from '../../shared/Stepper';
import ScopeContentCard from "../../components/scope/ScopeContentCard";
import VideoDialog from "../../components/scope/VideoDialog";
import video1 from "../../media/video1.png"
import video2 from "../../media/video2.png"
import video3 from "../../media/video3.png"

const styles = theme => ({
  root: {
    width: '90%',
  },
  backButton: {
    marginRight: theme.spacing.unit,
  },
  instructions: {
    marginTop: theme.spacing.unit,
    marginBottom: theme.spacing.unit,
  },
});

const stepContent = [
  {
    imageUrl: video1,
    title: 'Labelled data',
    content: 'For 95% of machine learning problems you need labelled data. For example, if you want to predict the salary of a new employee based on historical salaries, you would need a dataset with historical salaries',
    vimeoId: 'https://player.vimeo.com/video/250128178',
    helpCenterLink: 'https://docs.google.com/document/d/17akLkeIAefjQYEmG8G1LBM-mQJMaO0sLtF7objP2d9M/edit#heading=h.uhne1lcoyfkq'
  },
  {
    imageUrl: video2,
    title: 'Sufficient data',
    content: 'In order to train a machine learning model you need sufficient data. It is hard to say exactly how much data but as a rule of thumb aim at having at least 5000 datapoints',
    vimeoId: 'https://player.vimeo.com/video/250128178',
    helpCenterLink: 'https://docs.google.com/document/d/17akLkeIAefjQYEmG8G1LBM-mQJMaO0sLtF7objP2d9M/edit#heading=h.uhne1lcoyfkq'
  },
  {
    imageUrl: video3,
    title: 'Data availability',
    content: 'This may sounds simple but often times we see this fail in practice. After your machine learning model has been built you need to make sure that the data you fed the model is available when you need it.',
    vimeoId: 'https://player.vimeo.com/video/250128178',
    helpCenterLink: 'https://docs.google.com/document/d/17akLkeIAefjQYEmG8G1LBM-mQJMaO0sLtF7objP2d9M/edit#heading=h.uhne1lcoyfkq'
  }

];

const stepLabels = [
  'Labelled data',
  'Sufficient data',
  'Data availability'
];

class Scope extends React.Component {
  constructor() {
    super();
    this.state = {
      videoDialogOpen: false
    };

    this.handleVideoDialogOpen = this.handleVideoDialogOpen.bind(this);
    this.handleVideoDialogClose = this.handleVideoDialogClose.bind(this);
  }

  contentToCards = content => {
    return content.map(data => <ScopeContentCard {...data}
                                                 handleCardMediaClick={() => this.handleVideoDialogOpen(data.vimeoId)}
    />)
  };

  handleVideoDialogOpen = id => {
    this.setState({videoDialogOpen: id})
  };

  handleVideoDialogClose = () => {
    this.setState({videoDialogOpen: false})
  };

  render() {
    const classes = this.props;
    const instructionCards = this.contentToCards(stepContent);
    return (
      <div className={classes.root}>
        <CustomStepper stepLabels={stepLabels}
                       stepContent={instructionCards}
        />
        <VideoDialog open={!!this.state.videoDialogOpen}
                     handleClose={this.handleVideoDialogClose}
        >
          <iframe src={this.state.videoDialogOpen}
                  width="640"
                  height="427"
                  frameborder="0"
                  webkitallowfullscreen
                  mozallowfullscreen
                  allowfullscreen>
          </iframe>
        </VideoDialog>
      </div>
    );
  }
}

Scope.propTypes = {
  classes: PropTypes.object,
};

export default withStyles(styles)(Scope);