import { placesRef } from "../components/Firebase/firebase";
import store from ".";

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
    placesRef.on("value", snapshot => {
      const places = snapshot.val();
      dispatch(getAllPlaces(places));
    });
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
