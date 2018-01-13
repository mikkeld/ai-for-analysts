import React, { Component }  from 'react';
import PropTypes from 'prop-types';
import firebase from 'firebase';
import { CircularProgress } from 'material-ui/Progress';
import {generateFilename} from "../utils";
import { withStyles } from 'material-ui/styles';
import CustomUploadButton from 'react-firebase-file-uploader/lib/CustomUploadButton';
import FileUpload from 'material-ui-icons/FileUpload';
import { indigo, blue } from 'material-ui/colors';

const FIREBASE_REF = 'uploads';

const styles = theme => ({
  rightIcon: {
    marginLeft: theme.spacing.unit,
  },
  root: {
    margin: 'auto',
    width: '50%',
    align: 'center',
    marginTop: theme.spacing.unit * 3,
    marginBottom: theme.spacing.unit * 3,
  },
  container: {
    backgroundColor: indigo[500],
    color: 'white',
    width: 140,
    height: 30,
    padding: '5px 5px 5px 5px',
    textAlign: 'center',
    margin: '0 auto'
  },
  content: {
    verticalAlign: 'middle',
  }
});

class FirebaseUploader extends Component {
  constructor() {
    super();
    this.state = {
      loading: false,
      progress: 0
    };

    this.handleUploadStart = this.handleUploadStart.bind(this);
    this.handleProgress = this.handleProgress.bind(this);
    this.handleUploadError = this.handleUploadError.bind(this);
    this.handleUploadSuccess = this.handleUploadSuccess.bind(this);
  }

  handleUploadStart = () => this.setState({loading: true, progress: 0});
  handleProgress = (progress) => this.setState({progress});
  handleUploadError = (error) => {
    this.setState({loading: false});
    console.error(error);
  };
  handleUploadSuccess = (filename) => {
    firebase.storage().ref(FIREBASE_REF).child(filename).getDownloadURL().then(url => {
      const getNameString = (f) => f.substring(0,f.lastIndexOf("_"))+f.substring(f.lastIndexOf("."));
      const uploadedFile = {"name": getNameString(filename), "url": url};
      this.props.onFileUploadSuccess(uploadedFile);
      this.setState({ loading: false });
    });
  };

  render() {
    const {classes} = this.props;
    return (
      <div className={classes.root}>
        {this.state.loading
          ? <CircularProgress/>
          :  <CustomUploadButton
                accept="csv/*"
                name="image"
                filename={file => generateFilename(file)}
                storageRef={firebase.storage().ref(FIREBASE_REF)}
                onUploadStart={this.handleUploadStart}
                onUploadError={this.handleUploadError}
                onUploadSuccess={this.handleUploadSuccess}
                onProgress={this.handleProgress}
              >
                <div className={classes.container}>
                  <div className={classes.content}>
                    Upload
                    <FileUpload className={classes.rightIcon} />
                  </div>
                </div>
              </CustomUploadButton>
        }
      </div>
    )
  }
}

FirebaseUploader.propTypes = {
  onFileUploadSuccess: PropTypes.func.isRequired
};

export default withStyles(styles)(FirebaseUploader);