import { userRef, placesRef } from '../components/Firebase/firebase';

export const GET_USER = 'GET_USER';
export const GET_POPS = 'GET_POPS';

const userPlaces = {
  user: {},
  pops: [],
};

export const getUser = user => {
  return {
    type: GET_USER,
    user,
  };
};

export const getPops = pops => {
  return {
    type: GET_POPS,
    pops,
  };
};



export const fetchUser = uID => async dispatch => {
  try {
    const aUser = userRef.child(uID);
    aUser.on('value', snapshot => {
      const user = snapshot.val();
      dispatch(getUser(user))

    });
  } catch (err) {
    console.error(err);
  }
};

export const fetchPops = places => async dispatch => {
  try {
    let popPromises = [];
    if (places.length !== 0 || places !== undefined) {
      for (let i = 0; i <= places.length - 1; i++) {
        let current = places[i];
        if (current.dropped === true){
          continue
        }
        let location = current.placeKey;
        let word = location.replace(/[^a-zA-Z]+/g, '');
        let number = location.match(/\d/g);
        number = number.join('');
        const typeRef = placesRef.child(`${word}`);
        const popPromise = new Promise((resolve, reject) => {
          typeRef.once('value', snapshot => {
            let locationSnap = snapshot.child(`${number}`);
            resolve(locationSnap.val())
          })});
          popPromises.push(popPromise);
        }}
      const pops = await Promise.all(popPromises)
      dispatch(getPops(pops));
  } catch (error) {
    console.log(error);
  }
};


export const userReducer = (state = userPlaces, action) => {
  switch (action.type) {
    case GET_USER:
      return {
        ...state,
        user: action.user,
      };
    case GET_POPS:
      return {
        ...state,
        pops: action.pops,
      };
    default:
      return state;
  }
};
