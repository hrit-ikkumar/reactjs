import React from 'react';
import {Navbar, NavbarBrand} from 'reactstrap';
import './App.css';
import Menu from './components/MenuComponent';
function App() {
  return (
    <div className="App">
      <Navbar dark color = "primary">
        <div class="container">
          <NavbarBrand href="/">Restaurant con Fusion</NavbarBrand>
        </div>
      </Navbar>
      <Menu/>
    </div>
  );
}

export default App;
