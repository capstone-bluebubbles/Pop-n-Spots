import React from "react";
import { connect } from "react-redux";
import { getUser } from "../../store/user";

class LockCard extends React.Component {
  constructor(props) {
    super();
    this.state = {};
  }
  componentDidMount() {
    // this.props.getUser();
  }
  render() {
    //console.log(`THE OBJECT===>`, this.props);
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
const mapStateToProps = state => ({
  places: state.places
});

export default connect(mapStateToProps)(LockCard);
