// import { userRef } from "../components/Firebase/firebase";
// import store from ".";

// export const GET_USER = "GET_USER";

// const userPlaces = {
//   places: {}
// };

// export const getUser = user => {
//   return {
//     type: GET_USER,
//     user
//   };
// };

// export const fetchUser = () => async dispatch => {
//   try {
//     userRef.on("value", snapshot => {
//       const places = snapshot.val();
//       dispatch(userPlaces(places));
//     });
//   } catch (err) {
//     console.error(err);
//   }
// };

// export const userReducer = (state = userPlaces, action) => {
//   switch (action.type) {
//     case GET_USER:
//       return {
//         ...store,
//         places: action.user
//       };

//     default:
//       return state;
//   }
// };
