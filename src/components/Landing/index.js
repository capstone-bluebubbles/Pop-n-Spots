/* eslint-disable no-useless-constructor */
import React from "react";
import { connect } from "react-redux";
import { Map, Marker, Circle, GoogleApiWrapper } from "google-maps-react";
import { GOOGLE_API_KEY } from "../../secrets";
import InfoCard from "../Landing/infoCard";
import { setCurrentCategory, getCurrentPosition } from "../../store/position"
import { longStackSupport } from "q";
import queryString from "query-string"

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

//--------------------------------------------------
// helper functions
//--------------------------------------------------

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

const KM_PER_MILE = 1.60934
const MILE_PER_KM = 1 / KM_PER_MILE

//--------------------------------------------------
// hacky functions
//--------------------------------------------------

const MapRef = (props) => {
  if (props.map) {
    props.this.googleMap = props.map;
  }

  return (
    <div>
    </div>
  )
}

//--------------------------------------------------
// Landing
//--------------------------------------------------
export class Landing extends React.Component {

  constructor(props) {
    super(props);

    // the target for the google map
    this.googleMap = null;

    // set the state
    this.state = {
      currentRadius: 0.50
    }

    // set the icon for location
    this.currentPositionIcon = {
      url: "\\Bubble2000.png",
      size: new window.google.maps.Size(150, 150),
      scaledSize: new window.google.maps.Size(16, 16),
      origin: new window.google.maps.Point(0, 0),
      anchor: new window.google.maps.Point(8, 8)
    };

    // set the bubbles
    this.bubbles = []

    // bubble 0
    this.bubbles.push({
      url: "\\Bubble3000.png",
      size: new window.google.maps.Size(150, 150),
      scaledSize: new window.google.maps.Size(16, 16),
      origin: new window.google.maps.Point(0, 0),
      anchor: new window.google.maps.Point(8, 8)
    });

    // bubble 1
    // 25%
    this.bubbles.push({
      url: "\\Bubble5025.png",
      size: new window.google.maps.Size(100, 100),
      scaledSize: new window.google.maps.Size(16, 16),
      origin: new window.google.maps.Point(0, 0),
      anchor: new window.google.maps.Point(8, 8)
    });

    // bubble 2
    // 50%
    this.bubbles.push({
      url: "\\Bubble5050.png",
      size: new window.google.maps.Size(100, 100),
      scaledSize: new window.google.maps.Size(16, 16),
      origin: new window.google.maps.Point(0, 0),
      anchor: new window.google.maps.Point(8, 8)
    });

    // bubble 3
    // 75%
    this.bubbles.push({
      url: "\\Bubble5075.png",
      size: new window.google.maps.Size(150, 150),
      scaledSize: new window.google.maps.Size(16, 16),
      origin: new window.google.maps.Point(0, 0),
      anchor: new window.google.maps.Point(8, 8)
    });

    // bubble 4
    // 100%
    this.bubbles.push({
      url: "\\Bubble5100.png",
      size: new window.google.maps.Size(150, 150),
      scaledSize: new window.google.maps.Size(16, 16),
      origin: new window.google.maps.Point(0, 0),
      anchor: new window.google.maps.Point(8, 8)
    });

    // current day abbreviation
    const date = new Date();
    const days = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa']
    this.currentDay = days[date.getDay()]
    this.currentHour = date.getHours()
  }

  componentDidMount() {

    // get the category from the url
    const search = queryString.parse(this.props.location.search)
    const category = search.category ? search.category : "bars"

    // set the category in the redux store
    this.props.currentDispatch(setCurrentCategory(category))

    // load the current position
    // => automatically loads the current places
    this.props.currentDispatch(getCurrentPosition())
  }

  OnClickButton1(event) {
    this.setState({ currentRadius: 0.50 });
  }

  OnClickButton2(event) {
    this.setState({ currentRadius: 1.00 });
  }

  OnClickButton3(event) {
    this.setState({ currentRadius: 2.00 });
  }

  OnClickButton4(event) {
    if (this.googleMap) {
      this.googleMap.setCenter(this.props.currentPosition)
    }
  }

  render() {
    console.log("REACT -> Landing -> this.props ->", this.props)

    var clientw = Math.max(document.documentElement.clientWidth, window.innerWidth || 0);
    var clienth = Math.max(document.documentElement.clientHeight, window.innerHeight || 0);
    var clientm = Math.min(clientw, clienth)
    let clientmapw = "100%";
    let clientmaph = clientm * 0.80;

    const currentPosition = this.props.currentPosition
    const currentPlaces = this.props.currentPlaces
    const currentRadiusInKilometers = this.state.currentRadius * KM_PER_MILE

    const markers = []
    const cards = []

    for (let index = 0; index < currentPlaces.length; index++) {

      const place = currentPlaces[index]
      const placeGPS = { lat: Number(place.gpsLat), lng: Number(place.gpsLong) }

      const placeDistance = getDistance(currentPosition, placeGPS);
      if (placeDistance <= (currentRadiusInKilometers)) {

        // create a marker for this place
        const marker = {
          placeGPS,
          place
        }

        markers.push(marker)

        // create a card for this place
        const card = {
          placeDistance,
          place
        }

        cards.push(card)
      }
    }

    // sort the cards into distance order
    cards.sort((a, b) => { return a.placeDistance - b.placeDistance })

    // local css style objects

    const styleDivCSS = {
      "width": clientmapw,
      "height": clientmaph,
    };

    const styleMapCSS = {
      "width": clientmapw,
      "height": clientmaph,
    };

    const styleMapButtonDivCSS = {
      position: 'relative',
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      width: "clientmapw",
      height: "clientmaph",
      borderRadius: '4px',
      cursor: 'pointer',
      marginBottom: '22px',
      textAlign: 'center',
      backgroundColor: 'none',
      borderColor: 'none',
    };

    return (
      <div>
        <div style={styleDivCSS} >
          <Map
            google={this.props.google}
            zoom={15}
            initialCenter={currentPosition}
            center={currentPosition}
            setCenter={currentPosition}
            style={styleMapCSS}
            streetViewControl={false}
            mapTypeControl={false}
            fullscreenControl={false}
            gestureHandling={"cooperative"}
            onDragend={this.centerMoved}
            styles={styleMapSilver}>
            <Circle
              strokeColor={"#036fc0"}
              strokeOpacity={1.0}
              strokeWeight={2}
              fillColor={"#036fc0"}
              fillOpacity={0.0625}
              center={currentPosition}
              radius={currentRadiusInKilometers * 1000}
            />
            {
              markers.map((item, index) => {
                const thisObject = this
                const thisKey = index
                const marker = item

                let popDataTarget = 0

                const popData = marker.place.popularTimesHistogram;
                if (popData) {
                  const popDataCurrentDay = popData[thisObject.currentDay]
                  if (popDataCurrentDay) {
                    for (let index = 0; index < popDataCurrentDay.length; index++) {
                      const hour = popDataCurrentDay[index].hour;
                      if (hour === thisObject.currentHour) {
                        popDataTarget = popDataCurrentDay[index].occupancyPercent;
                      }
                    }
                  }
                }

                // there are frames for 0%, 25%, 50%, 75% and 100%
                // to round to the nearest frame -> floor(input + (25% / 2) / 25%)
                let popDataTargetFrame = Math.floor((popDataTarget + (25 / 2.0)) / 25.0);

                // safety check
                popDataTargetFrame = Math.max(popDataTargetFrame, 0)
                popDataTargetFrame = Math.min(popDataTargetFrame, thisObject.bubbles.length - 1)

                return (
                  <Marker key={thisKey} position={marker.placeGPS} icon={this.bubbles[popDataTargetFrame]} />
                )
              })
            }
            <Marker position={currentPosition} icon={this.currentPositionIcon} />
            <div style={styleMapButtonDivCSS}>
              <LandingMapButton selected={this.state.currentRadius === 0.5} text={"0.5 MILES"} target={this.OnClickButton1.bind(this)} />
              <LandingMapButton selected={this.state.currentRadius === 1.0} text={"1.0 MILES"} target={this.OnClickButton2.bind(this)} />
              <LandingMapButton selected={this.state.currentRadius === 2.0} text={"2.0 MILES"} target={this.OnClickButton3.bind(this)} />
              <LandingMapButton selected={false} text={"RE-CENTER"} target={this.OnClickButton4.bind(this)} />
            </div>
            <MapRef this={this}></MapRef>
          </Map>
        </div >
        <div>
          {cards.map((item, index) => {
            return <InfoCard key={index} place={item.place} />;
          })}
        </div>
      </div >
    );
  }
}

const LandingMapButton = ({ selected, text, target }) => {

  if (selected) {
    return (
      <button className="styleMapButtonCSSSelected" onClick={(event) => { target(event) }} >{text}</button>
    )
  } else {
    return (
      <button className="styleMapButtonCSS" onClick={(event) => { target(event) }} >{text}</button>
    )
  }
}

const GoogleLanding = GoogleApiWrapper({
  apiKey: GOOGLE_API_KEY
})(Landing);

const mapStateToProps = state => {
  return {
    currentPosition: state.position.currentPosition,
    currentPlaces: state.position.currentPlaces,
    currentCategory: state.position.currentCategory
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
