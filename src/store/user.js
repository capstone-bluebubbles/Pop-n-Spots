import { userRef } from "../components/Firebase/firebase";
import store from ".";

export const GET_USER = "GET_USER";

const userPlaces = {
  user:{}
};

export const getUser = user => {
  return {
    type: GET_USER,
    user
  };
};

export const fetchUser = (uID) => async dispatch => {
  try {
    const aUser = userRef.child(uID)
    aUser.on("value", snapshot => {
      const user = snapshot.val();
      dispatch(getUser(user));
    });
  } catch (err) {
    console.error(err);
  }
};

export const userReducer = (state = userPlaces, action) => {
  switch (action.type) {
    case GET_USER:
    return {
      ...store,
      user: action.user
    };

    default:
      return state;
  }
};
