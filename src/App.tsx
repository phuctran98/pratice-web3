import './App.css';
import React, { Component } from 'react'
import  {Provider}  from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';
import AppContainer from './AppContainer';
import { store } from './store/index';
import { OasisRoutes } from './OasisRoutes';

class App extends Component<{}, {}>{
  render() {
    return (
      <Provider store={store}>
        <Router>
          <AppContainer>
            <OasisRoutes />
          </AppContainer>
        </Router>
      </Provider>
    );
  }
}

export default App;
