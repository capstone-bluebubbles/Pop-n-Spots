import React from "react";
import { connect } from "react-redux";
import { fetchUser, fetchPops } from "../../store/user";
import { userRef } from "../Firebase/firebase";
import { number } from "prop-types";

class PopCard extends React.Component {
  constructor(props) {
    super();
    this.count = 0;
    this.state = {
      pops: []
    };
  }

  numberOfPops(popsObj) {
    const userPops = this.props.user.pops;
    if (!userPops) {
      return "No Pops!";
    } else {
      for (let i = 0; i < userPops.length; i++) {
        // console.log('POPSOBJ',popsObj.locationId, 'USERKEYS', userPops[i].placeKey)
        if (popsObj.locationId === userPops[i].placeKey) {
          return Object.keys(userPops[i].timestamp).length;
        }
      }
    }
  }

  lockPlace(locationId){
    const popsRef = userRef.child(this.props.uID).child('pops')
    console.log(popsRef)
    popsRef.update({locked: true})
  }

  dropPlace(index){
    const place = userRef.child(this.props.uID).child('pops').child(index)
    console.log(place)
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
    console.log(this)
    if (this.props.pops.length >= 1) {
      return (
        <div className="pops-card">
          <h3 className="user-places-title">Your Popped Places</h3>
          {this.props.pops.map((place,index) => {
            return (
              <div key= {place.locationId}>
                <div className="pops-card-title">{place.title}</div>
                <div> {place.address}</div>
                <div className="pops-card-title">
                  <button
                    className="lock-button"
                    type="button"
                    onClick={() => this.lockPlace(place.locationId)}>
                    LOCK!
                  </button>
                  <button
                    className="lock-button"
                    type="button"
                    onClick={() => this.dropPlace(place.locationId)}>
                    DROP!
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      );
    }
      return <div>Blockchain UI working...</div>;

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

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PopCard);
