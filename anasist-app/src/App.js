import React, { Component } from 'react';
import Scope from './containers/scope/Scope';
import Prepare from './containers/prepare/Prepare';
import './App.css';
import {init as firebaseInit} from './utils/firebase/init';
import {
  BrowserRouter as Router,
  Route,
} from 'react-router-dom';
import ResponsiveDrawer from './components/shared/responsiveDrawer';
import Models from "./containers/models/Models";
import ModelDetails from "./containers/model-details/modelDetails";
import Deploy from "./containers/deploy/Deploy";
import Home from "./containers/home/Home";
import SimpleMediaCard from "./containers/samples/Samples";
import SampleDetail from "./containers/samples/SampleDetail";
import SampleDataset from "./containers/samples/SampleDataset";
import PrecisionAndRecall from "./components/model-details/interpretation-details/PrecisionAndRecall";

class App extends Component {
  constructor() {
    super();
    firebaseInit();
  }

  componentDidMount() {
    this.setState({user: null})
  }

  findComponent = (location) => {
    switch (location.pathname) {
      case '/admin':
        return 'Administrator';
      case '/models':
        return 'Models';
      case '/reports':
        return 'Reports';
      default:
        return 'Administrator';
    }
  };

  render() {
    return (
      <Router>
        <Route render={({location}) => (
          <ResponsiveDrawer componentTitle={this.findComponent(location)}
                            location={location}
                            user={null}
          >
            <div className="App">
              <Route exact path="/" component={Home}/>
              <Route exact path="/new_project" component={Prepare}/>
              <Route exact path="/scope" component={Scope}/>
              <Route exact path="/models" component={Models}/>
              <Route exact path="/samples" component={SimpleMediaCard}/>
              <Route exact path="/models/:id" render={({match}) => <ModelDetails id={match.params.id}/>}/>
              <Route exact path="/models/:id/precision_recall" render={({match}) => <PrecisionAndRecall id={match.params.id}/>}/>
              <Route path="/deploy/:id" render={({match}) => <Deploy id={match.params.id}/>}/>
              <Route exact path="/samples/:id" render={({match}) => <SampleDetail id={match.params.id}/>}/>
              <Route path="/samples/dataset/:id" render={({match}) => <SampleDataset id={match.params.id}/>}/>
            </div>
          </ResponsiveDrawer>
        )}
        />
      </Router>
    );
  }
}

export default App;
