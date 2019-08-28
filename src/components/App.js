import React, { Component } from 'react';
import './App.css';

//COMPONENTS
import Map from './map';

class App extends Component {
  render() {
    return (
      <div className='App'>
        <h1>Google map search</h1>
        <Map isMarkerShown />
      </div>
    );
  }
}

export default App;
