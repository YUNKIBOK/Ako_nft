import React from "react";
import {Link} from 'react-router-dom';
import styles from "./Header.module.css"

function Header(props){
    return (
        <header>
        <div style={{display:"flex",background:"midnightblue"}}>
            <Link to="/">
                    <h1 style={{color:"white",marginLeft:"30px"}}>BokSociety</h1>
            </Link>
            <div style={{display:"flex",position:"absolute",right:"0",marginRight:"20px"}}>
                <ul style={{display:"flex",listStyle:"none",marginTop:"30px"}}>
                    <li>
                        <Link to="/Market">
                            <a style={{color:"white",marginLeft:"50px"}}>Market</a>
                        </Link>
                    </li>
                    <li>
                        <Link to="/Manage">
                            <a style={{color:"white",marginLeft:"50px"}}>Manage</a>
                        </Link>
                    </li>
                    <li>
                        <Link to="/Create">
                            <a style={{color:"white",marginLeft:"50px"}}>Create</a>
                        </Link>
                    </li>
                </ul>
                <img src="./images/MetaMask_icon.png" alt="Meta" style={{height:"50px",width:"auto",marginLeft:"50px",marginTop:"20px" }}></img>
            </div>
        </div>
        </header>
    );
}

export default Header;