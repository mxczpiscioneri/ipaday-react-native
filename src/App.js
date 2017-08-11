import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import ReduxThunk from 'redux-thunk';

import Routes from "./Routes";
import combineReducers from './combineReducers';

export default class App extends Component {
  componentWillMount() {
    console.disableYellowBox = true
  }

  render() {
    return (
      <Provider store={createStore(combineReducers, {}, applyMiddleware(ReduxThunk))}>
        <Routes />
      </Provider>
    );
  }
}