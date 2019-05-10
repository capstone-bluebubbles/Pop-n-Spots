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
      <div >
        <h3>User Places</h3>
        <button
          className="drop-pop-button"
          type="button"
          onClick={() => console.log(`IS THIS CLICKING`)}>
          DROP!
        </button>
      </div>
    );
  }
}
const mapStateToProps = state => ({
  places: state.places
});

export default connect(mapStateToProps)(LockCard);
