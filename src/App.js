import React, { Component } from 'react';
import './App.scss';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";

import Menu from './Menu/Menu';
import Hero from './Hero/Hero';
import HomePage from './HomePage/HomePage';
import Footer from './Footer/Footer';
import AboutPage from './AboutPage/AboutPage';
import LoginPage from './LoginPage/LoginPage';

class App extends Component {
  state = {
    data: null
  };

  componentDidMount() {
      // Call our fetch function below once the component mounts
    this.callBackendAPI()
      .then(res => this.setState({ data: res.express }))
      .catch(err => console.log(err));
  }
    // Fetches our GET route from the Express server. (Note the route we are fetching matches the GET route from server.js
  callBackendAPI = async () => {
    const response = await fetch('/budget');
    const body = await response.json();

    if (response.status !== 200) {
      throw Error(body.message) 
    }
    return body;
  };

render() {
  return (
    <Router>
      <Menu/>
       <Hero/>
       <div className = "mainContainer">
         <Switch>
           <Route path= "/about">
           <AboutPage></AboutPage>
           </Route>
           <Route path= "/login">
           <LoginPage></LoginPage>
           </Route>
           <Route path= "/">
           <HomePage></HomePage>
           </Route>
         </Switch>
       </div>
       <Footer/>
    </Router>
  );
}
}

export default App;
