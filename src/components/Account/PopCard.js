import React from "react";
import { connect } from "react-redux";
import { fetchUser, fetchPops, getPops } from '../../store/user'
import { placesRef } from '../Firebase/firebase'


class PopCard extends React.Component {
  constructor(props) {
    super();
    this.count=0
    this.state ={
      pops: []
    }
    this.getPops = this.getPops.bind(this);
  }

  async componentDidMount(){
    //getPops()
    this.props.fetchUser(this.props.uID)
    // this.props.fetchPops(this.props.user.pops)
  }

  async getPops(places){
    console.log(places)
    let pops = [];
    if (places.length !== 0 || places !== undefined) {
      for (let i = 0; i <= places.length - 1; i++) {
        let current = places[i];
        let location = current.placeKey;
        let word = location.replace(/[^a-zA-Z]+/g, '');
        let number = location.match(/\d/g);
        number = number.join('');
        console.log(word)
        console.log(number)

        const typeRef = placesRef.child(`${word}`);

        await typeRef.on('value', snapshot => {
          let locationSnap = snapshot.child(`${number}`);
          let locationVal = locationSnap.val();
          console.log(locationVal)
          this.setState({pops: locationVal})
          //dispatch(getPops(locationVal))
          pops.push(locationVal);
        });
      }
      //console.log(pops)
      this.setState({pops})
      //dispatch(getPops(pops));
    }
  }


  // async shouldComponentUpdate(nextProps, nextState){
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
  

  componentDidUpdate(){
    
    if (this.props.user.pops !== undefined && this.count === 3){
      console.log(this.props.user.pops)
      this.getPops(this.props.user.pops)
      this.count++
      
    }
  }

  render() {
    let pops = this.state.pops
    console.log(this.props)

    if(this.state.pops.length > 0){

    return (
      <div className="info-container">
        <h3>User Places</h3>
        {pops.map(place =>{
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
