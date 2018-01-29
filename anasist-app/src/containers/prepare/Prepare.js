import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import Paper from 'material-ui/Paper';
import Typography from 'material-ui/Typography';
import {ProblemTypes} from "../../shared/problemTypes";
import Step1 from "../../components/prepare/Step1";
import Step2 from "../../components/prepare/Step2";
import Step3 from "../../components/prepare/Step3";
import FinalStep from "../../components/prepare/FinalStep";
import CustomStepper from "../../shared/Stepper";
import {analyse, getHeaders} from "../../utils/prepareService";
import { LinearProgress } from 'material-ui/Progress';
import BuildModelDialog from "../../components/prepare/buildModelDialog";

const styles = theme => ({
  root: theme.mixins.gutters({
    paddingTop: 16,
    paddingBottom: 16,
    marginTop: theme.spacing.unit * 3,
  }),
  textContainer: {
    root: {
      margin: 'auto',
      width: '50%',
      align: 'center'
    }
  }
});

const stepLabels = [
  'Initial project',
  'Upload data',
  'Configure data'
];

const initialFormState = {
  name: "Untitled Project",
  description: "",
  selectedProblemType: ProblemTypes.classification,
  id: "",
  target: "",
  upload: undefined,
  buildModelDialogOpen: false
};

const BuildingModel = props => {
  return (
    <div className={props.classes.root}>
      <Typography type="display1" gutterBottom align="center">
        Building model
      </Typography>
      <Typography type="caption" gutterBottom align="center">
        You can close this window now. Track progress under <a href="#">models</a>
      </Typography>
      <LinearProgress/>
    </div>
  )
};

class Prepare extends React.Component {
  constructor() {
    super();
    this.state = {
      currentProject: initialFormState,
      availableColumns: [],
      assessment: [],
      buildingModel: false
    };
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleProblemSelect = this.handleProblemSelect.bind(this);
    this.onFileUploadSuccess = this.onFileUploadSuccess.bind(this);
    this.prepareAssessment = this.prepareAssessment.bind(this);
  }

  handleInputChange = name => e => {
    e.preventDefault();
    const target = e.target;
    const value = target.value;
    this.setState({ currentProject: { ...this.state.currentProject, [name]: value } });
  };

  handleProblemSelect = type => {
    this.setState({ currentProject: { ...this.state.currentProject, 'selectedProblemType': type}})
  };

  onFileUploadSuccess = file => {
    getHeaders(file).then(res => {
      const updatedProject = {
        ...this.state.currentProject,
        upload: file
      };
      this.setState({
        currentProject: updatedProject,
        availableColumns: res.headers
      }, () => {
      });
    });
  };

  prepareAssessment = () => {
    const inputs = {
      'problemType': this.state.currentProject.selectedProblemType,
      'label': this.state.currentProject.target,
      'id': this.state.currentProject.id,
      'upload': this.state.currentProject.upload
    };
    analyse(inputs).then(res => {
      console.log(res)
      this.setState({assessment: res.assessment})
    })
  };

  buildModel = () => {
    this.handleBuildModelClose();
    this.setState({
      buildingModel: true
    })
  };

  handleBuildModelOpen = () => {
    this.setState({ buildModelDialogOpen: true });
  };

  handleBuildModelClose = () => {
    this.setState({ buildModelDialogOpen: false });
  };

  getCompletedSteps = () => {
    const step1 = this.state.currentProject.name !== "";
    const step2 = this.state.currentProject.upload;
    const step3 = this.state.currentProject.target !== "" && this.state.currentProject.id !== "";
    const finalStep = true;
    return [
      step1,
      step2,
      step3,
      finalStep
    ];
  };

  render() {
    const {classes} = this.props;
    const stepContent = [
      <Step1 handleChange={this.handleInputChange}
             handleProblemSelect={this.handleProblemSelect}
             {...this.state.currentProject}
      />,
      <Step2 onFileUploadSuccess={this.onFileUploadSuccess}
             upload={this.state.currentProject.upload}
      />,
      <Step3 handleChange={this.handleInputChange}
             {...this.state.currentProject}
             availableColumns={this.state.availableColumns}
      />,
    ];
    const finalStep = <FinalStep {...this.state.currentProject}
                                 prepareAssessment={this.prepareAssessment}
                                 assessment={this.state.assessment}
                                 onFinishClick={this.handleBuildModelOpen}
                      />;
    const completedSteps = this.getCompletedSteps();
    return (
      <Paper className={classes.root} elevation={4}>
        <Typography type="headline" component="h3">
          Configure new ML project
        </Typography>
        {this.state.buildingModel
          ? <BuildingModel classes={classes}/>
          : <CustomStepper stepLabels={stepLabels}
                           stepContent={stepContent}
                           finalStep={finalStep}
                           completedSteps={completedSteps}
            />
        }
        <BuildModelDialog open={this.state.buildModelDialogOpen}
                          handleClose={this.handleBuildModelClose}
                          buildModel={this.buildModel}
                          {...this.state.currentProject}
        />
      </Paper>
    );
  }
}

Prepare.propTypes = {
  classes: PropTypes.object,
};

export default withStyles(styles)(Prepare);