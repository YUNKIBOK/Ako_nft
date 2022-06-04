import React from "react";
import { Component } from 'react';
import './Manage.css';
import { Link,Outlet } from 'react-router-dom';

class Manage extends Component {

    render() {
        return (
            <div style={{height:"75.5vh"}}>
                <div className="manageContainer">
                    <h2 style={{textDecoration:"underline",textDecorationColor:"midnightblue",marginLeft:"5%"}}>Manage your NFTs.</h2>
                    <ul style={{display:"flex",listStyle:"none",marginTop:"30px",marginLeft:"4%"}}>
                        <li className="manageMenu">
                            <Link to="/Manage/MyCollection" style={{color:"white"}}>My Collection</Link>
                        </li>
                        <li className="manageMenu" id = "temp">
                            <Link to="/Manage/OnMarket" style={{color:"white"}}>On Market</Link>
                        </li>
                    </ul>
                    <Outlet/>
                </div>
            </div>
        );
    }
}

export default Manage;