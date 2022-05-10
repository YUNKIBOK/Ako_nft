import React from "react";
import { Component } from 'react';
import './Manage.css';

class Manage extends Component {

    render() {
        return (
            <div>
                <h3>관리 임시 페이지입니다.</h3>
                <div className="row text-center">
                    {this.props.images.map((uri, key) => {
                        return (
                            <div key={key} className="col-md-2 mb-3">
                                {this.props.approved[key] && (this.props.owners[key] === this.props.account) && <img className='token' src={uri} alt="token"></img>}
                                {this.props.approved[key] && (this.props.owners[key] === this.props.account) && <div>{this.props.names[key]}</div>}
                            </div>
                        )
                    })}
                </div>
            </div>
        );
    }
}

export default Manage;