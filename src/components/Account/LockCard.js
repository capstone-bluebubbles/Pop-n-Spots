import React from "react";
import { connect } from "react-redux";
import { fetchUser, fetchPops, getPops } from "../../store/user";
import { placesRef, userRef } from "../Firebase/firebase";
import { number } from "prop-types";

class LockCard extends React.Component {
  constructor(props) {
    super();
    this.state = {
      lockedPlaces : []
    };
  }

  dropPlace(place){
    const match = this.props.user.pops.find(user => user.placeKey === place.locationId)
    const popsRef = userRef.child(this.props.uID).child('pops').child(match.popIndex)
    popsRef.update({'locked': false})
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
    const locks = this.props.user.pops.filter(pop => pop.locked)
    let result = this.props.pops.filter(o1 => locks.some(o2 => o1.locationId === o2.placeKey));
    return (
      <div className="pops-card">
        <h3 className="user-places-title">Your Favorite Places</h3>
        {result.map((places, index) => {
          return(
        <div key= {places.locationId}>
        <div className="pops-card-title">
          {places.title}
          <button
            className="lock-button"
            type="button"
            onClick={() => this.dropPlace(places)}>
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
