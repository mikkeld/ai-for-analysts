import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import ListModelsTable from '../../components/models/listModelsTable';
import {getModels} from "../../utils/modelsService";

const styles = theme => ({
  root: theme.mixins.gutters({
  })
});

class Models extends React.Component {
  constructor() {
    super();
    this.state = {
      models: []
    };
  }

  componentDidMount() {
    getModels().then(models => this.setState({models: models}))
  }

  render() {
    const {classes} = this.props;
    return (
      <div className={classes.root}>
        <ListModelsTable models={this.state.models}/>
      </div>
    );
  }
}

Models.propTypes = {
  classes: PropTypes.object,
};

export default withStyles(styles)(Models);