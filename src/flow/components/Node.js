/**
 * Created by huangling on 14/4/2017.
 */
import React, { Component } from 'react';


export default class Node extends Component {
    render () {
        const { type, id} = this.props;
        return (
            <div data-jtk-node-id={id} className="jtk-node jtk-endpoint-anchor jtk-connected">
                <div className="name">
                    <div className="delete" title="Click to delete">
                        <i className="fa fa-times">X</i>
                    </div>
                    <span>{type}</span>
                    <div className="add" title="Add child node">
                        <i className="fa fa-plus">+</i>
                    </div>
                </div>
            </div>
        )
    }
}