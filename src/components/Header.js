import { Link } from 'react-router-dom';
import React, { Component } from 'react';
import './Header.css'


class Header extends Component {
    render() {
        return (
            <header style={{ display: "flex", background: "midnightblue",height:"9vh",position:"relative"}}>
                    <Link to="/">
                        <h2 className='bokLogo'>BokSociety</h2>
                    </Link>
                    <ul className='headerUl'>
                            <li>
                                {(this.props.account !== '') && <div style={{ color: "white", marginLeft: "50px" }}>welcome! {this.props.account}</div>}
                            </li>
                            <li>
                                <a style={{ color: "white", marginLeft: "50px"}} href='/Market/OrderByCreation'>Market</a>
                                {/*<a style={{ color: "white", marginLeft: "50px"}} href='/Market'>Market</a>*/}
                            </li>
                            <li>
                                <a style={{ color: "white", marginLeft: "50px"}} href='/Manage/MyCollection'>Manage</a>
                            </li>
                            <li>
                                <a style={{ color: "white", marginLeft: "50px"}} href='/Create'>Create</a>
                            </li>

                    </ul>
            </header>
        );
    }
}

export default Header;