import React from "react";
import { connect } from "react-redux";
import { fetchUser, fetchPops, getPops } from "../../store/user";
import { placesRef } from "../Firebase/firebase";
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
    console.log(popsObj);
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
    if (this.props.pops.length > 0) {
      return (
        <div className="pops-card">
          <h3 className="user-places-title">Your Popped Places</h3>
          {this.props.pops.map(place => {
            return (
              <div>
                <div className="pops-card-title">{place.title}</div>
                <div> {place.address}</div>
                <div className="pops-card-title">
                  <button
                    className="lock-button"
                    type="button"
                    onClick={() => console.log(`IS THIS CLICKING`)}>
                    LOCK!
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      );
    } else {
      return <div>Blockchain UI working...</div>;
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

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PopCard);
