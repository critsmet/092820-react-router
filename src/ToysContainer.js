import React from 'react'

import { Link } from 'react-router-dom'

class ToysContainer extends React.Component{

  renderToys(){
    if (this.props.search !== ''){
      return this.props.toys.filter(toyObj => toyObj.name.includes(this.props.search)).map(this.renderSingleToyCard)
    } else {
      return this.props.toys.map(this.renderSingleToyCard)
    }
  }

  renderSingleToyCard = (toyObj) => {
    return <Link key={toyObj.id} to={"/toys/" + toyObj.id}><p>{toyObj.name}</p></Link>
  }

  render(){
    return (
      <div id="toys-container">
        {this.renderToys()}
      </div>
    )
  }
}

export default ToysContainer
