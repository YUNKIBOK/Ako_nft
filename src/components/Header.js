import { Link } from 'react-router-dom';
import React, { Component } from 'react';
//import styles from "./Header.module.css"
//import App from "./App";


class Header extends Component {
    render() {
        return (
            <header>
                <div style={{ display: "flex", background: "midnightblue", height: "85px" }}>
                    <Link to="/">
                        <h1 style={{ color: "white", marginLeft: "30px", marginTop: "15px" }}>BokSociety</h1>
                    </Link>
                    <div style={{ display: "flex", position: "absolute", right: "0", marginRight: "20px" }}>
                        <ul style={{ display: "flex", listStyle: "none", marginTop: "30px" }}>
                            <li>
                                {(this.props.account !== '') && <div style={{ color: "white", marginLeft: "50px" }}>welcome! {this.props.account}</div>}
                            </li>
                            <li>
                                <a style={{ color: "white", marginLeft: "50px" }} href='/Market'>Market</a>
                            </li>
                            <li>
                                <a style={{ color: "white", marginLeft: "50px" }} href='/Manage/MyCollection'>Manage</a>
                            </li>
                            <li>
                                <a style={{ color: "white", marginLeft: "50px" }} href='/Create'>Create</a>
                            </li>

                        </ul>
                        {/*<img src="./images/MetaMask_icon.png" alt="Meta" style={{height:"50px",width:"auto",marginLeft:"50px",marginTop:"20px" }}></img>*/}
                    </div>
                </div>
            </header>
        );
    }
}

export default Header;