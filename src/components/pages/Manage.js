import React from "react";
import { Component } from 'react';
import './Manage.css';
import { Link,Outlet } from 'react-router-dom';

class Manage extends Component {

    

    render() {
        return (
            <div>
                <h3 style={{color:"dimgrey",marginLeft:"30px"}}>Manage your NFTs.</h3>
                  <ul style={{display:"flex",listStyle:"none",marginTop:"30px"}}>
                      <li className="manageMenu">
                          <Link to="/Manage/MyCollection" style={{color:"black"}}>MyCollection </Link>
                      </li>
                      <li className="manageMenu">
                          <Link to="/Manage/OnMarket" style={{color:"black"}}>OnMarket</Link>
                      </li>
                  </ul>
                  <Outlet />
            </div>
        );
    }
}

export default Manage;