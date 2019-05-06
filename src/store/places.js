import Firebase from "../components/Firebase"
import {burgersRef} from "../components/Firebase/firebase"
import store from ".";

export const GET_PLACES = 'GET_PLACES'

const allPlaces ={
  bars : [],
  burgers :  [],
  cocktails: [],
  pizza: [],
  tacos: [],
  winebars: []

}

export const getAllPlaces = (burgers) => {
  return {
  type: GET_PLACES,
  burgers
}}



export const fetchPlaces = () => async dispatch => {
  try {
    burgersRef.on('value', snapshot => {
      const burgers = snapshot.val()

    dispatch(getAllPlaces(burgers))
    })
  } catch (err) {
    console.error(err)
  }
}

export const placesReducer = (state = allPlaces, action) => {
  switch (action.type) {
    case GET_PLACES:
      return{
         ...store, burgers: action.burgers}


    default:
      return state
  }
}
