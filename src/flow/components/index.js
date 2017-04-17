/**
 * Created by huangling on 14/4/2017.
 */
import React, { Component } from 'react';
import flow from '../utils/flow';
import Node from './Node';
import Line from './Line';
import { TYPE } from '../constants';

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
                if (n.type === TYPE.LINE ) {
                    return <Line {...n} key={key}/>
                } else {
                    return <Node {...n} key={key}/>
                }
            })}</div>
        );
    }
}

