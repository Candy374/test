/**
 * Created by huangling on 14/4/2017.
 */
import React, { Component } from 'react';
import flow from '../utils/flow';

export default class Flow extends Component {
    componentWillMount() {
        this.state = {
            nodes: flow.init()
        }
    }

    render() {
        const { nodes } = this.state;
        return (
            <div>{nodes.map((n, key) => {
                return (
                    <div key={key}>{n.type}</div>
                )
            })}</div>
        );
    }
}

