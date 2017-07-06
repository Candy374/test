/**
 * Created by huangling on 17/4/2017.
 */
import React, { Component } from 'react';

export default class Canvas extends Component {
    render () {
        const { children } = this.props;
        return (
            <div id='canvas'>
                {children}
            </div>
        )
    }
}