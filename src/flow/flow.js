/**
 * Created by huangling on 13/4/2017.
 */

import { TYPE } from './constants'


let dataMap = {};
const addNode = function (node, args = {}) {
    let {fromNode, toNode, result} = args;
    fromNode = fromNode || findNode(this.fromId);
    toNode = toNode || findNode(this.toId);

    const needUpdateIndex = fromNode.nextStep.findIndex(n => n === toNode.id);
    fromNode.nextStep.splice(needUpdateIndex, 1, node.id);

    const nextLines = node.nextStep.map(s => getLine(node, toNode));

    const newComps = [
        getLine(fromNode, node),
        node, ...nextLines
    ];

    if (result) {
        const index = result.findIndex(r => r === this);
        if (index === -1) {
            throw new Error('the result array is wrong!')
        }
        return [...result.slice(0, index), ...newComps, ...result.slice(index + 1)];
    } else {
        return newComps;
    }
};

const deleteNode = function (result, node) {
    if (node.type === TYPE.ACTION) {
        let fromLineIndex = 0, toLineIndex = 0, fromNodeId = 0, nextNodeId = 0, nodeIndex = 0;

        result.forEach((n, index) => {
            if (n.type === TYPE.LINE) {
                if (n.toId === node.id) {
                    fromLineIndex = index;
                    fromNodeId = n.fromId;
                } else if (n.fromId === node.id) {
                    toLineIndex = index;
                    nextNodeId = n.toId;
                }
            } else if (n === node) {
                nodeIndex = index;
            }
        });

        if (!fromLineIndex || !toLineIndex || !nodeIndex || !nextNodeId) {
            console.log('some data is missing! something wrong with the result array')
        } else {
            return result
                .filter((r, index) => index !== nodeIndex && index !== toLineIndex)
                .map((r, index) => {
                    if (index === fromLineIndex) {
                        r.toId = nextNodeId;
                    } else if (r.id === fromNodeId) {
                        const needUpdateIndex = r.nextStep.findIndex(s => s === node.id);
                        r.nextStep.splice(needUpdateIndex, 1, nextNodeId);
                    }
                    return r;
                });
        }
    }
};

const findNode = (id) => {
    return dataMap[id];
};

const getLine = (from, to) => {
    return {
        type: TYPE.LINE,
        add: addNode,
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
    // get next steps
    let next = {...nextStep};
    if (nextStep instanceof Array) {
        if (nextStep.filter(r => r).length !== nextStep.length) {
            throw new Error('next step is invalid!');
        }
        next = nextStep.map(step => step instanceof Object ? step.id : step);
    } else {
        if (nextStep instanceof Object) {
            next = [nextStep.id];
        } else {
            next = [nextStep];
        }
    }

    if (type === TYPE.COND && next.length === 1) {
        next.push(END_NODE.id);
    }

    const node = {
        id: getId(type),
        type,
        nextStep: next
    };

    dataMap[node.id] = node;
    return node;
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
                if (nextAction.id !== END_NODE.id) {
                    result.push(nextAction);
                }
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

const draw = () => {
    const result = [];
    result.push(dataMap[START_NODE.id]);

    const branch = result[0].nextStep.slice();
    drawBranch(result, branch);
    result.push(dataMap[END_NODE.id]);
    return result;
};

const reset = () => {
    actionId = 0;
    condId = 0;
    dataMap = {
        [START_NODE.id]: ({...START_NODE, nextStep: [END_NODE.id]}),
        [END_NODE.id]: ({...END_NODE}),
    }
};

export default {
    init,
    draw,
    getNode,
    getLine,
    reset,
    deleteNode
};