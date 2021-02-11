import React from 'react'

class ToyShow extends React.PureComponent{

  state = {toy: false}

  componentDidMount(){
    let id = parseInt(this.props.match.params.id)
    fetch("http://localhost:3000/toys/" + id)
      .then(res => res.json())
      .then(toyObj => {
        this.setState({toy: toyObj})
      })
  }

  render(){
    if(this.state.toy){
      console.log("AH YES OKAY WE HAVE THE TOYS, WE CAN LOAD NOW");
      return (
        <div className="card">
          <h2>{this.state.toy.name}</h2>
          <img alt={"photo of " + this.state.toy.name} src={this.state.toy.image} className="toy-avatar"/>
          <p>{this.state.toy.likes} Likes </p>
          <button onClick={(event) => this.props.updateToyLike(this.props.id)} className="like-btn">Like &lt;3</button>
          <button onClick={(event) => this.props.deleteToy(this.props.id)} className="like-btn">Delete</button>
        </div>
      )
    } else {
      console.log("FETCHING TOYS THE ONE YOU'RE LOOKING FOR HASN'T BEEN LOADED YET");
      return (<div>HEY FETCHING TOYS BRB</div>)
    }

  }

}

export default ToyShow
