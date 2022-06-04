import React from "react";
import { Component } from 'react';
import './Market.css';
import { Link,Outlet } from 'react-router-dom';

class Market extends Component {

    render() {
        return (
            <div style={{height:"75.5vh"}}>
                <div className="manageContainer">
                    <h2 style={{textDecoration:"underline",textDecorationColor:"midnightblue",marginLeft:"5%"}}>Take a look at NFTs.</h2>
                    <ul style={{display:"flex",listStyle:"none",marginTop:"30px",marginLeft:"4%"}}>
                        <li className="manageMenu">
                            <Link to="/Market/OrderByLikes" style={{color:"white"}}>Order By Likes </Link>
                        </li>
                        <li className="manageMenu">
                            <Link to="/Market/OrderByCreation" style={{color:"white"}}>Order By Creation</Link>
                        </li>
                    </ul>
                    <Outlet/>
                </div>
            </div>
        );
    }
}

export default Market;