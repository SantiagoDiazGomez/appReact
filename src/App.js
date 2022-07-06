import React, { Component } from "react";
import './App.css';
import "bootstrap/dist/css/bootstrap.min.css";
import "@fortawesome/fontawesome-free/css/all.css";
import "@fortawesome/fontawesome-free/js/all.js";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";

import ListVehicle from "./components/listVehicle";
import Vehicle from "./components/vehicle";

class App extends Component {
  render() {
    return (
      <div className="App">
        <nav className="navbar navbar-expand-sm navbar-dark bg-black py-0 px-0">
        {' '}
        <a className="navbar-brand" href="https://www.linkedin.com/in/santiagodiazgomez/" target="_blank">
        <FontAwesomeIcon icon={["fab", "linkedin"]} />
        {' '}Santiago Díaz Gómez
        </a>
        <span className="v-line"></span>
        <button className="navbar-toggler mr-3" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav">
                <li className="nav-item active">
                <Link to={"/vehicles"} className="nav-link">
                  Listado
                </Link>
                </li>
                <li className="nav-item">
                <Link to={"/vehicles/0"} className="nav-link">
                  Nuevo vehículo
                </Link>
                </li>
            </ul>
        </div>
        </nav>        
        <div className="App-actions">
          <Routes> 
            <Route exact path="/"             element={<ListVehicle/>} /> 
            <Route exact path="/vehicles"     element={<ListVehicle/>} />    
            <Route exact path="/vehicles/:id" element={<Vehicle/>} />            
          </Routes>
        </div>
      </div>
    );
  }
  
}

export default App;
