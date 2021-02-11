import React from 'react';
import './App.css';

import ToyHeader from './ToyHeader'
import SearchBar from './SearchBar'
import ToysContainer from './ToysContainer'
import ToyForm from './ToyForm'
import ToyShow from './ToyShow'
import { Switch, Route } from 'react-router-dom'

class App extends React.Component {

  state={search: '', toys: []}

  componentDidMount(){
    console.log("APP MOUNTED, BEFORE FETCH RUNS");
    fetch("http://localhost:3000/toys")
      .then(res => res.json())
      .then(toysObj => this.setState({toys: toysObj}))
  }

  changeStateValue = (string) => {
    this.setState({search: string})
  }

  addToy = (toyObj) => {
    fetch("http://localhost:3000/toys", {
      method: "POST",
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(toyObj)
    })
      .then(() => console.log("Fetch request complete!"))

    this.setState((pS) => {
      return {toys: [...pS.toys, toyObj]}
    }, () => console.log("Set state is done running!"))
  }

  updateToyLike = (id) => {

    fetch(`http://localhost:3000/toys/${id}`, {
      method: "PATCH",
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({likes: this.state.toys.find(toyObj => toyObj.id === id).likes + 1})
    })

    this.setState((pS) => {
      return {toys: pS.toys.map(toyObj => toyObj.id !== id ? toyObj : {...toyObj, likes: toyObj.likes + 1})}
    })
  }

  deleteToy = (id) => {

    fetch(`http://localhost:3000/toys/${id}`, {
      method: "DELETE",
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    })

    this.setState((pS) => {
      return {toys: pS.toys.filter(toyObj => toyObj.id !== id)}
    })
  }

  render(){
    return(
      <div className="App">
        <ToyHeader />
        <Switch>
          <Route exact path="/toys">
            <SearchBar changeStateValue={this.changeStateValue}/>
            <ToysContainer toys={this.state.toys} search={this.state.search}/>
          </Route>
          <Route exact path="/toys/new">
            <ToyForm addToy={this.addToy}/>
          </Route>
          {/* Render prop */}
          <Route path="/toys/:id" render={(routerProps) => <ToyShow {...routerProps} toys={this.state.toys} updateToyLike={this.updateToyLike} deleteToy={this.deleteToy}/>} />
        </Switch>
      </div>
    )
  }
}

export default App;
