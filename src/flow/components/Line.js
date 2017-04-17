/**
 * Created by huangling on 14/4/2017.
 */
import React, { Component } from 'react';


export default class Line extends Component {
    render () {
        const { type, id} = this.props;
        return (
            <div className={"line " + type} id={id}>
                {id}
            </div>
        )
    }
}