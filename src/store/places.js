import {placesRef, databaseRef} from "../components/Firebase/firebase"
import store from ".";
import { GeoFire } from "geofire";

export const GET_PLACES = "GET_PLACES";

const allPlaces = {
  places: {}
};

export const getAllPlaces = places => {
  return {
    type: GET_PLACES,
    places
  };
};

export const fetchPlaces = () => async dispatch => {
  try {
    let firebase = databaseRef.child('geoFire')
    let geoFire = new GeoFire(firebase)
    let geoQuery = geoFire.query({
      center: [41.90876, -87.65065],
      radius: 1.609
    })
    let data = [];

    geoQuery.on("key_entered", function(key, location, distance) {
      let word = key.replace(/[^a-zA-Z]+/g, '');
      let number = key.match(/\d/g);
      number = number.join("");
      const typeRef = placesRef.child(`${word}`)

      typeRef.on('value', snapshot => {
        let locationSnap = snapshot.child(`${number}`)
        let locationVal = locationSnap.val()
        data.push(locationVal)

      })
    });

    dispatch(getAllPlaces(data))

  } catch (err) {
    console.error(err);
  }
};

export const placesReducer = (state = allPlaces, action) => {
  switch (action.type) {
    case GET_PLACES:
      return {
        ...store,
        places: action.places
      };

    default:
      return state;
  }
};
