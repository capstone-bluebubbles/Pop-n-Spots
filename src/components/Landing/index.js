/* eslint-disable no-useless-constructor */
import React from 'react';
import { Map, InfoWindow, Marker, GoogleApiWrapper } from 'google-maps-react';
import { GOOGLE_API_KEY } from '../../secrets.js'

const style = {
  width: '100%',
  height: '50%'
}

export class Landing extends React.Component {
  render() {
    return (
      <div>
        <h1>Landing</h1>
        <Map
          google={this.props.google}
          style={style}
          zoom={15}
          initialCenter={{
            lat: 41.908760,
            lng: -87.650650
          }}
        >
        </Map>
      </div>
    );
  }
}

export default GoogleApiWrapper({
  apiKey: GOOGLE_API_KEY
})(Landing)
