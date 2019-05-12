import React from "react";
import { connect } from "react-redux";
import { fetchUser, fetchPops, getPops } from "../../store/user";
import { placesRef } from "../Firebase/firebase";
import { number } from "prop-types";

class LockCard extends React.Component {
  constructor(props) {
    super();
    this.state = {
      lockedPlaces : []
    };
  }
  componentDidMount(event) {
    this.props.fetchUser(this.props.uID);
    // this.props.fetchPops(this.props.user.pops)
  }

  componentDidUpdate(prevProps) {
    if (this.props.user !== prevProps.user) {
      this.count++;
      this.props.fetchPops(this.props.user.pops);
    }
  }
  render() {
     console.log(`THE OBJECT===>`, this.props);
    if(this.props.user.pops !== undefined){
      const pops = this.props.user.pops
      const locks = [];
      for (let key in pops){
      if (key.locked === true){
        locks.push(key.locked)
        }
      }
      // let result = [];
      //let placesPopped = this.props.pops
      // for (let pops in places){
      //   result.push(pops)
      // }
      let result = this.props.pops.filter(
        o1 => locks.some(o2 => o1.locationId === o2.placeKey));
      console.log('RESULTS', result)
    return (
      <div className="pops-card">
        <h3 className="user-places-title">Your Favorite Places</h3>
        {result.map(places => {
          console.log('places:', places)
          return(
        <div key= {places.locationId}>
        <div className="pops-card-title">
          {places.title}
          <button
            className="lock-button"
            type="button"
            onClick={() => console.log(` CLICK`)}>
            DROP!
          </button>
        </div>
        </div>
          )}
        )}
      </div>
    );
  } else {
    return (
      <div className="pops-card">
        <h3 className="user-places-title">Your Favorite Places</h3>
        <div className="pops-card-title">

          {/* <button
          className="drop-pop-button"
          type="button"
          onClick={() => console.log(`IS THIS CLICKING`)}>
          DROP!
        </button> */}
        </div>
        <h5>You have no Saves Places....</h5>
      </div>
    );
  }
}
}
const mapDispatchToProps = dispatch => ({
  fetchUser: uID => dispatch(fetchUser(uID)),
  fetchPops: places => dispatch(fetchPops(places))
});

const mapStateToProps = state => ({
  user: state.user.user,
  pops: state.user.pops
});

export default connect(mapStateToProps, mapDispatchToProps)(LockCard);
