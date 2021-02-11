import React from 'react'
import { NavLink, Link } from 'react-router-dom'

class ToyHeader extends React.Component{

  render(){

    return (
      <div id="toy-header">
        <img
          src="https://fontmeme.com/permalink/180719/67429e6afec53d21d64643101c43f029.png"
          alt="toy-header"
        />
        <br/>
        <br/>
        <Link to="/toys/new"><button>Add New Toy</button></Link>
        <br/>
        <Link to="/toys"><button>View All Toys</button></Link>
      </div>
    )
  }
}

export default ToyHeader
