/**
 * Created by huangling on 14/4/2017.
 */
import React, { Component } from 'react';


export default class Node extends Component {
    render () {
        const { type, id} = this.props;
        return (
            <div className={"node" + type} id={id}>
                {id}
            </div>
        )
    }
}