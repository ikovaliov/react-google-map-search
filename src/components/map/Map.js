import React, { Component } from 'react';
import './Map.css';
import MapComponent from './MapComponent';

class Map extends Component {
  state = {
    isMarkerShown: false
  };

  componentDidMount() {
    this.delayedShowMarker();
  }

  delayedShowMarker = () => {
    setTimeout(() => {
      this.setState({ isMarkerShown: true });
    }, 3000);
  };

  render() {
    return (
      <div className='map-block'>
        <div className='container'>
          <MapComponent isMarkerShown={this.state.isMarkerShown} />
        </div>
      </div>
    );
  }
}

export default Map;
