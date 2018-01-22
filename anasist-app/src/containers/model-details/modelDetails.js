import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import Tabs, { Tab } from 'material-ui/Tabs';
import Typography from 'material-ui/Typography';
import {getModelData} from "../../utils/modelsService";
import Performance from "../../components/model-details/Performance";
import Interpretation from "../../components/model-details/Interpretation";
import Transformations from "../../components/model-details/Transformations";
import Hints from "../../components/model-details/Hints";

function TabContainer(props) {
  return (
    <Typography component="div" style={{ padding: 8 * 3 }}>
      {props.children}
    </Typography>
  );
}

TabContainer.propTypes = {
  children: PropTypes.node.isRequired,
};

const styles = theme => ({
  root: {
    flexGrow: 1,
    marginTop: theme.spacing.unit * 3,
    backgroundColor: theme.palette.background.paper,
  },
});

class ModelDetails extends React.Component {
  state = {
    value: 0,
    data: undefined
  };

  componentDidMount() {
    getModelData(this.props.id)
      .then(data => {
        this.setState({data: data})
      })
  }

  handleChange = (event, value) => {
    this.setState({ value });
  };

  render() {
    const { classes } = this.props;
    const { value } = this.state;

    return (
      <div className={classes.root}>
        <Tabs value={value}
              onChange={this.handleChange}
              indicatorColor="primary"
              textColor="primary"
        >
          <Tab label="Performance" />
          <Tab label="Understand" />
          <Tab label="Transformations" />
          <Tab label="Hints" />
        </Tabs>
        {value === 0 && <TabContainer>
                          {this.state.data && <Performance {...this.state.data.performance[0]} />}
                        </TabContainer>}
        {value === 1 && <TabContainer>
                          <Interpretation {...this.state.data.interpretation}
                                          {...this.state.data.predictions}
                          />
                        </TabContainer>}
        {value === 2 && <TabContainer><Transformations {...this.state.data.transformations}/></TabContainer>}
        {value === 3 && <TabContainer><Hints hints={this.state.data.hints} /></TabContainer>}
      </div>
    );
  }
}

ModelDetails.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ModelDetails);