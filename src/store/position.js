import { placesRef, databaseRef } from "../components/Firebase/firebase"
import { GeoFire } from 'geofire'

export const SET_CURRENT_POSITION = 'SET_CURRENT_POSITION'
export const SET_CURRENT_PLACES = 'SET_CURRENT_PLACES'
export const SET_CURRENT_CATEGORY = 'SET_CURRENT_CATEGORY'

//--------------------------------------------------
// helper data / functions
//--------------------------------------------------

// add degree to radian conversion to Number prototype
if (typeof Number.prototype.toRad === "undefined") {
  Number.prototype.toRad = function () {
    return (this * Math.PI) / 180;
  };
}

export const calculateDistanceMetrics = {
  KM_PER_MILE: 1.60934,
  MILE_PER_KM: 1.0 / 1.60934
}

// return distance in km between two points defined by lat/long
// start = { lat: xxxx, lng: xxxx}
// end = { lat: xxxx, lng: xxxx}
export const calculateDistance = function (start, end) {
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


const defaultState = {
  currentPosition: {
    lat: 41.875792,
    lng: -87.618944,
    timestamp: 0
  },
  currentPlaces: [],
  currentCategory: "pizza"
}

export const setCurrentPosition = (currentPosition) => {
  console.log("REDUX -> position -> setCurrentPosition");
  return {
    type: SET_CURRENT_POSITION,
    currentPosition
  }
}

export const setCurrentPlaces = (currentPlaces) => {
  console.log("REDUX -> position -> setCurrentPlaces");
  return {
    type: SET_CURRENT_PLACES,
    currentPlaces
  }
}

export const setCurrentCategory = (currentCategory) => {
  console.log("REDUX -> home -> setCurrentCategoty");
  return {
    type: SET_CURRENT_CATEGORY,
    currentCategory
  }
}

export const getCurrentPosition = () => async dispatch => {
  console.log("REDUX -> position -> getCurrentPosition");
  try {

    var getCurrentPositionOptions = {
      enableHighAccuracy: true,
      timeout: 10000,
      maximumAge: 0
    };

    navigator.geolocation.getCurrentPosition(
      pos => {

        console.log(
          "REDUX -> position- > getCurrentPosition -> navigator.geolocation.getCurrentPosition -> pos ->",
          pos
        );
        let center = {
          lat: pos.coords.latitude,
          lng: pos.coords.longitude,
          timestamp: pos.timestamp
        }
        dispatch(setCurrentPosition(center))
        dispatch(getCurrentPlaces(center))
      },
      err => {
        console.log(
          "REDUX -> position -> getCurrentPosition -> navigator.geolocation.getCurrentPosition -> err ->",
          err
        );
        let center = {
          lat: 41.875792,
          lng: -87.618944,
          timestamp: 1
        }
        dispatch(setCurrentPosition(center))
        dispatch(getCurrentPlaces(center))
      },
      getCurrentPositionOptions
    );
  } catch (err) {
    console.error(err)
  }
}

export const getCurrentPlaces = (center) => async (dispatch, getState) => {
  console.log("REDUX -> position -> getCurrentPlaces")
  console.log(center)
  try {
    const category = getState().position.currentCategory;
    console.log("REDUX -> position -> getCurrentPlaces -> category ->", category)
    let centerQuery = [center.lat, center.lng]
    let firebase = databaseRef.child('geoFire')
    let geoFire = new GeoFire(firebase)
    let geoQuery = geoFire.query({
      center: centerQuery,
      radius: calculateDistanceMetrics.KM_PER_MILE * 2.0
    })
    let data = [];
    geoQuery.on("key_entered", function (key, location, distance) {
      let word = key.replace(/[^a-zA-Z]+/g, '');
      let number = key.match(/\d/g);
      number = number.join("");

      if (word === category) {
        const typeRef = placesRef.child(`${word}`)
        typeRef.once('value', snapshot => {
          let locationSnap = snapshot.child(`${number}`)
          let locationVal = locationSnap.val()
          data = data.concat([locationVal])
          dispatch(setCurrentPlaces(data))
        })
      }
    });
  } catch (err) {
    console.error(err)
  }
}

export const positionReducer = (state = defaultState, action) => {
  switch (action.type) {
    case SET_CURRENT_POSITION:
      {
        const newState = { ...state, currentPosition: action.currentPosition }
        return newState;
      }
    case SET_CURRENT_PLACES:
      {
        const newState = { ...state, currentPlaces: action.currentPlaces }
        return newState;
      }
    case SET_CURRENT_CATEGORY:
      {
        const newState = { ...state, currentCategory: action.currentCategory }
        return newState;
      }
    default:
      return state
  }
}
