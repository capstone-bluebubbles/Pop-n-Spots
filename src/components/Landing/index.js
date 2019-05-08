/* eslint-disable no-useless-constructor */
import React from "react";
import { connect } from "react-redux";
import { Map, Marker, Circle, GoogleApiWrapper } from "google-maps-react";
import { GOOGLE_API_KEY } from "../../secrets";
import InfoCard from "../Landing/infoCard";
import { getCurrentPosition } from "../../store/position"

const styleMapSilver = [
  {
    elementType: "geometry",
    stylers: [
      {
        color: "#f5f5f5"
      }
    ]
  },
  {
    elementType: "labels.icon",
    stylers: [
      {
        visibility: "off"
      }
    ]
  },
  {
    elementType: "labels.text.fill",
    stylers: [
      {
        color: "#616161"
      }
    ]
  },
  {
    elementType: "labels.text.stroke",
    stylers: [
      {
        color: "#f5f5f5"
      }
    ]
  },
  {
    featureType: "administrative.land_parcel",
    elementType: "labels.text.fill",
    stylers: [
      {
        color: "#bdbdbd"
      }
    ]
  },
  {
    featureType: "poi",
    elementType: "geometry",
    stylers: [
      {
        color: "#eeeeee"
      }
    ]
  },
  {
    featureType: "poi",
    elementType: "labels.text.fill",
    stylers: [
      {
        color: "#757575"
      }
    ]
  },
  {
    featureType: "poi.park",
    elementType: "geometry",
    stylers: [
      {
        color: "#e5e5e5"
      }
    ]
  },
  {
    featureType: "poi.park",
    elementType: "labels.text.fill",
    stylers: [
      {
        color: "#9e9e9e"
      }
    ]
  },
  {
    featureType: "road",
    elementType: "geometry",
    stylers: [
      {
        color: "#ffffff"
      }
    ]
  },
  {
    featureType: "road.arterial",
    elementType: "labels.text.fill",
    stylers: [
      {
        color: "#757575"
      }
    ]
  },
  {
    featureType: "road.highway",
    elementType: "geometry",
    stylers: [
      {
        color: "#dadada"
      }
    ]
  },
  {
    featureType: "road.highway",
    elementType: "labels.text.fill",
    stylers: [
      {
        color: "#616161"
      }
    ]
  },
  {
    featureType: "road.local",
    elementType: "labels.text.fill",
    stylers: [
      {
        color: "#9e9e9e"
      }
    ]
  },
  {
    featureType: "transit.line",
    elementType: "geometry",
    stylers: [
      {
        color: "#e5e5e5"
      }
    ]
  },
  {
    featureType: "transit.station",
    elementType: "geometry",
    stylers: [
      {
        color: "#eeeeee"
      }
    ]
  },
  {
    featureType: "water",
    elementType: "geometry",
    stylers: [
      {
        color: "#c9c9c9"
      }
    ]
  },
  {
    featureType: "water",
    elementType: "labels.text.fill",
    stylers: [
      {
        color: "#9e9e9e"
      }
    ]
  }
];

/** Converts numeric degrees to radians */
if (typeof Number.prototype.toRad === "undefined") {
  Number.prototype.toRad = function () {
    return (this * Math.PI) / 180;
  };
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

  let a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.sin(dLon / 2) * Math.sin(dLon / 2) * Math.cos(lat1) * Math.cos(lat2);
  let c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  let d = earthRadius * c;
  return d;
};

//--------------------------------------------------
// Landing
//--------------------------------------------------
export class Landing extends React.Component {

  constructor(props) {
    super(props);

    // set the state
    this.state = {}
  }

  componentDidMount() {
    // check for an updated current position
    if (this.props.currentPosition.timestamp === 0) {
      this.props.currentDispatch(getCurrentPosition())
    }
  }

  render() {

    var bubbleRed = {
      url: "\\Bubble128Red.png",
      size: new window.google.maps.Size(128, 128),
      scaledSize: new window.google.maps.Size(16, 16),
      origin: new window.google.maps.Point(0, 0),
      anchor: new window.google.maps.Point(8, 8)
    };

    var bubbleBlue = {
      url: "\\Bubble128Blue.png",
      size: new window.google.maps.Size(128, 128),
      scaledSize: new window.google.maps.Size(16, 16),
      origin: new window.google.maps.Point(0, 0),
      anchor: new window.google.maps.Point(8, 8)
    };

    const styleDivCSS = {
      width: "100%",
      height: "600px"
    };

    const styleMapCSS = {
      width: "100%",
      height: "600px"
    };

    const currentPosition = this.props.currentPosition
    const currentPlaces = this.props.currentPlaces

    // get the current places from redux
    const places = currentPlaces

    // construct a collection of all places
    let placesFlat = []
    const categories = Object.keys(places)
    for (let c in categories) {

      // get the category
      const category = categories[c]

      const placesByCategory = places[category];
      for (let index = 0; index < placesByCategory.length; index++) {

        // get the place
        const place = placesByCategory[index]

        // add metrics
        place.databaseCategory = category
        place.databaseCategoryIndex = index;

        if (!place.gpsLat) {
          place.gpsLat = 0
        }

        if (!place.gpsLong) {
          place.gpsLong = 0
        }

        // target ready
        placesFlat.push(place)
      }
    }

    const markers = []

    for (let index = 0; index < placesFlat.length; index++) {
      const place = placesFlat[index]
      const placeGPS = { lat: place.gpsLat, lng: place.gpsLong }
      const placeDistance = getDistance(currentPosition, placeGPS);
      if (placeDistance <= (1.60934 / 2)) {
        markers.push(placeGPS)
      }
    }

    return (
      <div>
        <div style={styleDivCSS}>
          <Map
            google={this.props.google}
            zoom={15}
            initialCenter={currentPosition}
            center={currentPosition}
            style={styleMapCSS}
            streetViewControl={false}
            mapTypeControl={false}
            fullscreenControl={false}
            styles={styleMapSilver}>
            <Circle
              strokeColor={"#0000FF"}
              strokeOpacity={1.0}
              strokeWeight={2}
              fillColor={"#0000FF"}
              fillOpacity={0.1}
              center={currentPosition}
              radius={1000}
            />
            {markers.map((item, index) => {
              return <Marker key={index} position={item} icon={bubbleBlue} />;
            })}
            <Marker position={currentPosition} icon={bubbleRed} />
          </Map>
        </div>
        {/* <InfoCard /> */}
      </div>
    );
  }
}

const GoogleLanding = GoogleApiWrapper({
  apiKey: GOOGLE_API_KEY
})(Landing);

const mapStateToProps = state => {
  return {
    currentPosition: state.position.currentPosition,
    currentPlaces: state.position.currentPlaces
  };
};

const mapDispatchToProps = dispatch => {
  return {
    currentDispatch: dispatch
  };
};

const ReduxGoogleLanding = connect(
  mapStateToProps,
  mapDispatchToProps
)(GoogleLanding);
export default ReduxGoogleLanding;
