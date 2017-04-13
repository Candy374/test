/**
 * Created by huangling on 13/4/2017.
 */

import { TYPE } from './constants'


let dataMap = {};
const add = function (node, fromNode, toNode) {
    fromNode = fromNode || findNode(this.fromId);
    toNode = toNode || findNode(this.toId);
    fromNode.nextStep = fromNode.nextStep.map(n => {
        if (n === toNode.id) {
            return node.id;
        } else {
            return n;
        }
    });

    return [
        fromNode, getLine(fromNode, node),
        node, getLine(node, toNode),
        toNode
    ]
};

const findNode = (id) => {
    return dataMap[id];
};

const getLine = (from, to) => {
    return {
        type: TYPE.LINE,
        // add: (node, fromNode, toNode) => {
        //     fromNode = fromNode || findNode(from.id);
        //     toNode = toNode || findNode(to.id);
        //     fromNode.nextStep = fromNode.nextStep.map(n => {
        //         if (n === toNode.id) {
        //             return node.id;
        //         } else {
        //             return n;
        //         }
        //     });
        //
        //     return [
        //         fromNode, getLine(fromNode, node),
        //         node, getLine(node, toNode),
        //         toNode
        //     ]
        // },
        add,
        fromId: from.id,
        toId: to.id
    }
};

let actionId = 0;
let condId = 0;
const getId = (type) => {
    switch (type) {
        case TYPE.START: return 'start_id';
        case TYPE.END: return 'end_id';
        case TYPE.ACTION: return 'action_' + actionId++;
        case TYPE.COND: return 'cond_' + condId++;
    }
};

// nextStep can be
// - array of ids
// - id
// - node
// default is -1, which is means no next step
const getNode = (type, nextStep = END_NODE) => {
    let next = {...nextStep};
    if (nextStep instanceof Array) {
        next = nextStep.map(step => step instanceof Object ? step.id : step);
    } else {
        if (nextStep instanceof Object) {
            next = [nextStep.id];
        } else {
            next = [nextStep];
        }
    }

    return {
        id: getId(type),
        type,
        nextStep: next
    };
};

const START_NODE = getNode(TYPE.START, 'end_id');
const END_NODE = getNode(TYPE.END, -1);
const init = () => {
    return [{...START_NODE}, {...END_NODE}];
};


const drawBranch = (result, branch) => {
    let nextStep = -1;
    while (branch.length > 0) {
        nextStep = branch[0];
        while (nextStep !== -1) {
            const nextAction = dataMap[nextStep];
            if (nextAction) {
                result.push(getLine(result[result.length - 1], nextAction));
                result.push(nextAction);
                nextStep = drawBranch(result, nextAction.nextStep.slice());
            } else {
                console.log('can not find next steps!');
                nextStep = -1;
            }
        }
        branch.shift();
    }
    return nextStep;
};

const draw = (data) => {
    const result = [];
    let startNode;
    dataMap = {};
    data.map(datum => {
        dataMap[datum.id] = datum;
        if (datum.type === TYPE.START) {
            startNode = datum;
        }
    });

    if (startNode) {
        result.push(dataMap[startNode.id]);
        // let nextStep = result[result.length - 1].nextStep;
        // drawBranch(result, nextStep)

        const branch = startNode.nextStep.slice();
        drawBranch(result, branch)
        // while (branch.length > 0) {
        //     if (drawBranch(result, branch[0])) {
        //         branch.shift();
        //     }
        // }
    }

    return result;
};

export default {
    init,
    draw,
    getNode,
    getLine,
};