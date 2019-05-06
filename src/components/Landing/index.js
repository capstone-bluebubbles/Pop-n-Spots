/* eslint-disable no-useless-constructor */
import React from "react";
import { connect } from 'react-redux'
import { Map, Marker, Circle, GoogleApiWrapper } from "google-maps-react";
import { GOOGLE_API_KEY } from "../../secrets";


const styleMapSilver = [
  {
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#f5f5f5"
      }
    ]
  },
  {
    "elementType": "labels.icon",
    "stylers": [
      {
        "visibility": "off"
      }
    ]
  },
  {
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#616161"
      }
    ]
  },
  {
    "elementType": "labels.text.stroke",
    "stylers": [
      {
        "color": "#f5f5f5"
      }
    ]
  },
  {
    "featureType": "administrative.land_parcel",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#bdbdbd"
      }
    ]
  },
  {
    "featureType": "poi",
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#eeeeee"
      }
    ]
  },
  {
    "featureType": "poi",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#757575"
      }
    ]
  },
  {
    "featureType": "poi.park",
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#e5e5e5"
      }
    ]
  },
  {
    "featureType": "poi.park",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#9e9e9e"
      }
    ]
  },
  {
    "featureType": "road",
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#ffffff"
      }
    ]
  },
  {
    "featureType": "road.arterial",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#757575"
      }
    ]
  },
  {
    "featureType": "road.highway",
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#dadada"
      }
    ]
  },
  {
    "featureType": "road.highway",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#616161"
      }
    ]
  },
  {
    "featureType": "road.local",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#9e9e9e"
      }
    ]
  },
  {
    "featureType": "transit.line",
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#e5e5e5"
      }
    ]
  },
  {
    "featureType": "transit.station",
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#eeeeee"
      }
    ]
  },
  {
    "featureType": "water",
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#c9c9c9"
      }
    ]
  },
  {
    "featureType": "water",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#9e9e9e"
      }
    ]
  }
]

/** Converts numeric degrees to radians */
if (typeof (Number.prototype.toRad) === "undefined") {
  Number.prototype.toRad = function () {
    return this * Math.PI / 180;
  }
}

// return distance in km between two points defined by lat/long
const getDistance = function (start, end) {

  let earthRadius = 6371; // km
  let lat1 = parseFloat(start.lat);
  let lat2 = parseFloat(end.lat);
  let lon1 = parseFloat(start.lng);
  let lon2 = parseFloat(end.lng);

  let dLat = (lat2 - lat1).toRad();
  let dLon = (lon2 - lon1).toRad();
  lat1 = lat1.toRad();
  lat2 = lat2.toRad();

  let a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.sin(dLon / 2) * Math.sin(dLon / 2) * Math.cos(lat1) * Math.cos(lat2);
  let c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  let d = earthRadius * c;
  return d
};

export class Landing extends React.Component {

  defaultCenter = {
    lat: 41.90876,
    lng: -87.65065
  }

  constructor(props) {
    super(props)

    this.state = {
      currentCenter: this.defaultCenter,
      currentMessage: {
        txt: "Locating - Blockchain AI Working"
      }

    }
  }

  componentDidMount() {
    var options = {
      enableHighAccuracy: true,
      timeout: 10000,
      maximumAge: 0
    };

    navigator.geolocation.getCurrentPosition(
      (pos) => {
        console.log('REACT -> Landing -> componentDidMount -> getCurrentPosition -> pos ->', pos)
        this.setState({
          currentCenter: {
            lat: pos.coords.latitude,
            lng: pos.coords.longitude
          },
          currentMessage: {
            txt: "Locating - Found"
          }
        })
      },
      (err) => {
        console.log('REACT -> Landing -> componentDidMount -> getCurrentPosition -> err ->', err)
        this.setState({
          currentMessage: {
            txt: `Locating - Error - ${err.message}`
          }
        })
      },
      options);
  }

  render() {

    var bubbleRed = {
      url: '\\Bubble128Red.png',
      size: new window.google.maps.Size(128, 128),
      scaledSize: new window.google.maps.Size(24, 24),
      origin: new window.google.maps.Point(0, 0),
      anchor: new window.google.maps.Point(12, 12),
    };

    var bubbleBlue = {
      url: '\\Bubble128Blue.png',
      size: new window.google.maps.Size(128, 128),
      scaledSize: new window.google.maps.Size(16, 16),
      origin: new window.google.maps.Point(0, 0),
      anchor: new window.google.maps.Point(8, 8),
    };

    const styleDivCSS = {
      width: "100%",
      height: "360px"
    };

    const styleMapCSS = {
      width: "100%",
      height: "360px"
    };

    const currentCenter = this.state.currentCenter;
    console.log('REACT -> Landing -> componentDidMount -> this.state.currentCenter -> ', this.state.currentCenter)

    const distance = getDistance(currentCenter, this.defaultCenter, 3)

    return (

      <div>
        <div>
          <p>Landing</p>
          <p>{this.state.currentMessage.txt}</p>
        </div >
        <div style={styleDivCSS}>
          <Map
            google={this.props.google}
            zoom={15}
            center={{ lat: currentCenter.lat, lng: currentCenter.lng }}
            style={styleMapCSS}
            streetViewControl={false}
            mapTypeControl={false}
            fullscreenControl={false}
            styles={styleMapSilver}
          >
            <Circle
              strokeColor={"#0000FF"}
              strokeOpacity={1.0}
              strokeWeight={2}
              fillColor={"#0000FF"}
              fillOpacity={0.10}
              center={this.state.currentCenter}
              radius={500}
            />
            <Marker
              position={this.defaultCenter}
              icon={bubbleBlue}
            />
            <Marker
              position={this.state.currentCenter}
              icon={bubbleRed}
            />
            <Marker
              position={this.state.currentCenter}
              icon={bubbleBlue}
            />
          </Map>
        </div >
        <p>
          {distance}
        </p >
      </div >
    );
  }
}

const GoogleLanding = GoogleApiWrapper({
  apiKey: GOOGLE_API_KEY
})(Landing);

const mapStateToProps = state => {
  return {
    redux_state: state
  }
}

const mapDispatchToProps = dispatch => {
  return {
    redux_dispatch: dispatch,
  }
}

const ReduxGoogleLanding = connect(mapStateToProps, mapDispatchToProps)(GoogleLanding)
export default ReduxGoogleLanding

