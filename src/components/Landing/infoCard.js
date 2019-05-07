import React from "react";
import { connect } from "react-redux";

class InfoCard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  componentDidMount() {}
  render() {
    console.log(`what is this thing?????`, this);
    return <div>Hello</div>;
  }
}

const mapStateToProps = state => ({
  places: state.places
});

export default connect(mapStateToProps)(InfoCard);
