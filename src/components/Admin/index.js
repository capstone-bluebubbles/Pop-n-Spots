import React, { Component } from 'react';

import { withFirebase } from '../Firebase';
import Firebase, { placesRef, databaseRef } from "../Firebase/firebase"
//import { debug } from 'util';
import { Map, Marker, Circle, GoogleApiWrapper } from "google-maps-react";
import { GOOGLE_API_KEY } from "../../secrets";
import { GeoFire } from 'geofire';


class AdminPage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: false,
      users: [],
      places: [],
      placesLoading: false
    };
  }

  componentDidMount() {
    this.setState({ loading: true });
    this.setState({ placesLoading: true });

    this.props.firebase.users().on('value', snapshot => {
      const usersObject = snapshot.val();
      const usersList = Object.keys(usersObject).map(key => ({
        ...usersObject[key],
        uid: key,
      }));

      this.setState({
        users: usersList,
        loading: false,
      });
    });

    console.log(placesRef)
    placesRef.on('value', snapshot => {
      const places = snapshot.val()
      this.setState({
        places: places,
        placesLoading: false
      })
    })
  }

  componentWillUnmount() {
    this.props.firebase.users().off();
  }

  render() {
    const { users, loading } = this.state;

    // get the places
    const places = this.state.places;

    return (
      <div>
        <h1>Admin</h1>
        {loading && <div>Loading ...</div>}
        <UserList users={users} />
        <PlacesList places={places} />
      </div>
    );
  }
}

const UserList = ({ users }) => (
  <ul>
    {users.map(user => (
      <li key={user.uid}>
        <span>
          <strong>ID:</strong> {user.uid}
        </span>
        <span>
          <strong>E-Mail:</strong> {user.email}
        </span>
        <span>
          <strong>Username:</strong> {user.username}
        </span>
      </li>
    ))}
  </ul>
);

const PlacesList = ({ places }) => {

  const styleTable = {
    "backgroundColor": "#ffffff",
    "fontFamily": "arial, sans-serif",
    "borderCollapse": "collapse",
    "width": "100%",
  }

  const styleTableHeader = {
    "border": "1px solid #dddddd",
    "textAlign": "left",
    "padding": "8px"
  }

  const styleTableData = {
    "border": "1px solid #dddddd",
    "textAlign": "left",
    "padding": "8px"
  }

  const styleButton = {
    "backgroundColor": "#eeeeee",
    "border": "1px solid #dddddd",
    "padding": "8px",
  }

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

  return (
    <div>
      <table style={styleTable}>
        <tbody>
          <tr>
            <th style={styleTableHeader}>title</th>
            <th style={styleTableHeader}>address</th>
            <th style={styleTableHeader}>gpsLat</th>
            <th style={styleTableHeader}>gpsLong</th>
            <th style={styleTableHeader}></th>
          </tr>
        </tbody>
        <tbody>
          {
            placesFlat.map((item, index) => {
              const key = `${item.databaseCategory}.${item.databaseCategoryIndex}`
              const onClick = (event, item) => {
              
                mapAddressToGPS(item.address, (gps) => {
                  let location = placesRef.child(`${item.databaseCategory}/${item.databaseCategoryIndex}`)
                  location.update({ 'gpsLat': `${gps.lat}`, 'gpsLong': `${gps.lng}` })
                  location.update({ 'locationId': `${item.databaseCategory}-${item.databaseCategoryIndex}`})
                  
                  let firebaseRef = databaseRef.child("geoFire");
                  let geoFire = new GeoFire(firebaseRef)
                  geoFire.set(`${item.databaseCategory}-${item.databaseCategoryIndex}`, [Number(item.gpsLat), Number(item.gpsLong)]).then(function(){
                    console.log("Provided data has been added to key geoHash via GeoFire", item.gpsLat + item.gpsLong)
                  }, function (error){
                    console.log("Error: " + error)
                  })
                
                })
              }

              
              return (
                <tr key={key}>
                  <td style={styleTableData}>{item.title}</td>
                  <td style={styleTableData}>{item.address}</td>
                  <td style={styleTableData}>{item.gpsLat}</td>
                  <td style={styleTableData}>{item.gpsLong}</td>
                  <td style={styleTableData}>
                    <button
                      style={styleButton}
                      type="button"
                      onClick={(event) => { onClick(event, item) }}
                    >
                      geocode
                    </button>
                  </td>
                </tr>
              )
            })
          }
        </tbody>
      </table>
    </div >
  )
}

function mapAddressToGPS(address, callback) {

  // get the geocoder object
  let geocoder = new window.google.maps.Geocoder();
  if (geocoder) {
    geocoder.geocode({ address: address }, (results, status) => {

      if (status === window.google.maps.GeocoderStatus.OK) {
        if (0 < results.length) {

          // construct the gps data
          const gps = {
            lat: results[0].geometry.location.lat(),
            lng: results[0].geometry.location.lng(),
          }

          // call the target
          callback(gps)
        }
      }
    })
  }
}

const GoogleAdminPage = GoogleApiWrapper({
  apiKey: GOOGLE_API_KEY
})(AdminPage);

export default withFirebase(GoogleAdminPage);
