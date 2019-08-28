import React from 'react';
import { compose, withProps, lifecycle } from 'recompose';
import {
  withScriptjs,
  withGoogleMap,
  GoogleMap,
  Marker,
  Circle
} from 'react-google-maps';

const {
  StandaloneSearchBox
} = require('react-google-maps/lib/components/places/StandaloneSearchBox');

const mainCoordinates = { lat: 51.5073835, lng: -0.1277801 };

const MapComponent = compose(
  withProps({
    googleMapURL:
      'https://maps.googleapis.com/maps/api/js?key=AIzaSyCpT7R5UjNbySl47bo382sJo7ZiJHZhyK0&libraries=geometry,drawing,places',
    loadingElement: <div style={{ height: `100%` }} />,
    containerElement: <div style={{ height: `400px` }} />,
    mapElement: <div style={{ height: `100%` }} />
  }),
  lifecycle({
    componentWillMount() {
      const refs = {};

      this.setState({
        places: [],
        onSearchBoxMounted: ref => {
          refs.searchBox = ref;
        },
        onPlacesChanged: () => {
          const places = refs.searchBox.getPlaces();

          this.setState({
            places
          });
        }
      });
    }
  }),
  withScriptjs,
  withGoogleMap
)(props => (
  <div className='mapWrap'>
    <div className='mapSearchBox'>
      <div className='u-full-width'>
        <label htmlFor='addressInput'>Write address</label>
        <StandaloneSearchBox
          ref={props.onSearchBoxMounted}
          bounds={props.bounds}
          onPlacesChanged={props.onPlacesChanged}
        >
          <input
            id='addressInput'
            type='text'
            placeholder='Customized your placeholder'
            style={{
              boxSizing: `border-box`,
              border: `1px solid transparent`,
              width: `240px`,
              height: `32px`,
              padding: `0 12px`,
              borderRadius: `3px`,
              boxShadow: `0 2px 6px rgba(0, 0, 0, 0.3)`,
              fontSize: `14px`,
              outline: `none`,
              textOverflow: `ellipses`
            }}
          />
        </StandaloneSearchBox>
      </div>

      {props.places.map(
        ({ place_id, formatted_address, geometry: { location } }) => {
          const city = mainCoordinates;
          const citySearch = { lat: location.lat(), lng: location.lng() };

          const checkMyAddress = (checkPoint, centerPoint, km) => {
            let ky = 40000 / 360;
            let kx = Math.cos((Math.PI * centerPoint.lat) / 180.0) * ky;
            let dx = Math.abs(centerPoint.lng - checkPoint.lng) * kx;
            let dy = Math.abs(centerPoint.lat - checkPoint.lat) * ky;
            return Math.sqrt(dx * dx + dy * dy) <= km;
          };
          const address = checkMyAddress(city, citySearch, 20);
          return (
            <table className='u-full-width' key={place_id}>
              <thead>
                <tr>
                  <th>Address</th>
                  <th>Lat</th>
                  <th>Lng</th>
                  <th>Service</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>{formatted_address}</td>
                  <td>{location.lat()}</td>
                  <td>{location.lng()}</td>
                  <td>
                    {address ? 'We can service!' : 'We can not service! Sorry.'}
                  </td>
                  <td className="circleStatus">
                    <span
                      className={address ? 'circleTrue' : 'circleFalse'}
                    ></span>
                  </td>
                </tr>
              </tbody>
            </table>
          );
        }
      )}
    </div>

    <GoogleMap defaultZoom={8} defaultCenter={mainCoordinates}>
      {props.places.map(({ geometry: { location } }, index) => (
        <Marker
          key={index}
          position={{
            lat: location.lat(),
            lng: location.lng()
          }}
        />
      ))}
      {props.isMarkerShown && (
        <Circle
          defaultCenter={mainCoordinates}
          radius={20000}
          options={{
            strokeColor: '#ff0000'
          }}
        />
      )}
    </GoogleMap>
  </div>
));

export default MapComponent;
