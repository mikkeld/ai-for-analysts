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
      case '/admin/products':
        return 'Products';
      case '/admin/companies':
        return 'Companies';
      case '/admin/users':
        return 'Users';
      case '/jobs':
        return 'Jobs';
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
                            user={null}>
            <div className="App">
              <Route exact path="/" component={Prepare}/>
              <Route exact path="/scope" component={Scope}/>
              <Route exact path="/models" component={Models}/>
              <Route path="/models/:id" render={({match}) => <ModelDetails id={match.params.id}/>}/>
              <Route path="/deploy/:id" render={({match}) => <Deploy id={match.params.id}/>}/>
            </div>
          </ResponsiveDrawer>
        )}
        />
      </Router>
    );
  }
}

export default App;
