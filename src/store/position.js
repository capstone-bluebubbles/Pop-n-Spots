import store from ".";
import { placesRef, databaseRef } from "../components/Firebase/firebase"
import { GeoFire } from 'geofire'

export const SET_CURRENT_POSITION = 'SET_CURRENT_POSITION'
export const SET_CURRENT_PLACES = 'SET_CURRENT_PLACES'

const defaultState = {
  currentPosition: {
    lat: 41.875792,
    lng: -87.618944,
    timestamp: 0
  },
  currentPlaces: []
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

export const getCurrentPosition = () => async dispatch => {
  console.log("REDUX -> position -> getCurrentPosition");
  try {

    var getCurrentPositionOptions = {
      enableHighAccuracy: true,
      timeout: 1000,
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

export const getCurrentPlaces = (center) => async dispatch => {
  console.log("REDUX -> position -> getCurrentPlaces");
  console.log(center)
  try {
    console.log("REDUX -> position -> getCurrentPlaces inside of the tru")
    let centerQuery = [center.lat, center.lng]
    let firebase = databaseRef.child('geoFire')
    let geoFire = new GeoFire(firebase)
    let geoQuery = geoFire.query({
      center: centerQuery,
      radius: 1.609 * 2
    })
    let data = [];
    geoQuery.on("key_entered", function(key, location, distance) {
      let word = key.replace(/[^a-zA-Z]+/g, '');
      let number = key.match(/\d/g);
      number = number.join("");
      const typeRef = placesRef.child(`${word}`)

      typeRef.once('value', snapshot => {
        let locationSnap = snapshot.child(`${number}`)
        let locationVal = locationSnap.val()
        data = data.concat([locationVal])
        dispatch(setCurrentPlaces(data))
      })
      
    });
    //console.log(data)
    



    // placesRef.once('value', snapshot => {
    //   const places = snapshot.val()
    //   dispatch(setCurrentPlaces(places))
    // })
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
    default:
      return state
  }
}
