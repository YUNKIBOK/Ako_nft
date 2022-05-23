import React from "react";
import { Component } from 'react';
import './Manage.css';
import { Link,Outlet } from 'react-router-dom';

class Market extends Component {

    

    render() {
        return (
            <div>
                <h3 style={{color:"dimgrey",marginLeft:"30px"}}>Market</h3>
                  <ul style={{display:"flex",listStyle:"none",marginTop:"30px"}}>
                      <li className="manageMenu">
                          <Link to="/Market/OrderByLikes" style={{color:"black"}}>OrderByLikes </Link>
                      </li>
                      <li className="manageMenu">
                          <Link to="/Market/OrderByCreation" style={{color:"black"}}>OrderByCreation</Link>
                      </li>
                  </ul>
                  <Outlet />
            </div>
        );
    }
}

export default Market;