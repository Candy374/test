/**
 * Created by huangling on 14/4/2017.
 */
import React, { Component } from 'react';


export default class Line extends Component {
    render () {
        const { type, id} = this.props;
        return (
            <svg className={type} id={id}>
                <path d="M10 10 L 20 20" stroke="blue">{id}</path>
            </svg>
        )
    }
}