import React from "react";
import { connect } from "react-redux";
import { fetchUser, fetchPops, getPops } from '../../store/user'
import { placesRef } from '../Firebase/firebase'


class PopCard extends React.Component {
  constructor(props) {
    super();
    this.count = 0
    this.state ={
      pops: []
    }
  }

  componentDidMount(){
     this.props.fetchUser(this.props.uID)
    // this.props.fetchPops(this.props.user.pops)
  }


  // shouldComponentUpdate(nextProps, nextState){
  //   console.log(nextProps)
  //   let pops = await nextProps.pops
  //   console.log('>>>>> ', pops.length)
  //   if (pops.length > 0) {
  //     this.setState({
  //       pops
  //     })
  //   }

    // if (Object.keys(this.props.pops).length === 0){
    //   return false;
    // } else {
    //   return true;
    // }
  //}

  componentDidUpdate(){
    // console.log('this.props ====> ', prevProps)
    if (this.props.user.pops !== undefined && this.count === 0){
      this.count++
      this.props.fetchPops(this.props.user.pops)
    }
  }

   render() {
    console.log(this.props)
    console.log(this.props.pops)
    if(this.props.pops.length > 0){

     return (
      <div className="info-container">
        <h3>User Places</h3>
        {this.props.pops.map(place =>{
            return(
        <div>
        <button
          className="lock-button"
          type="button"
          onClick={() => console.log(`IS THIS CLICKING`)}>
          LOCK!
        </button>
              {place.title}

              {place.address}
        </div>
        )})}
      </div>
    );
  } else{
    return (
      <div>Blockchain UI working...</div>
    )
  }
}
}
const mapDispatchToProps = dispatch => ({
  fetchUser: (uID) => dispatch(fetchUser(uID)),
  fetchPops: (places) => dispatch(fetchPops(places))
});

const mapStateToProps = state => ({
  user: state.user.user,
  pops: state.user.pops,
});

export default connect(mapStateToProps, mapDispatchToProps)(PopCard);
