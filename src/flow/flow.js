/**
 * Created by huangling on 13/4/2017.
 */

import { TYPE } from './constants'


let dataMap = {};
const addNode = function (node, args = {}) {
    let {fromNode, toNode, result} = args;
    fromNode = fromNode || findNode(this.fromId);
    toNode = toNode || findNode(this.toId);
    fromNode.nextStep = fromNode.nextStep.map(n => {
        if (n === toNode.id) {
            return node.id;
        } else {
            return n;
        }
    });

    const newComps = [
        getLine(fromNode, node),
        node, getLine(node, toNode)
    ];

    if (result) {
        const index = result.findIndex(r => r === this);
        return [result.slice(0, index), ...newComps, result.slice(index + 1)];
    } else {
        return newComps;
    }
};

const deleteNode = function () {

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

    const node = {
        id: getId(type),
        type,
        nextStep: next,
        delete: () => {

        }
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

const draw = () => {
    const result = [];
    result.push(dataMap[START_NODE.id]);

    const branch = result[0].nextStep.slice();
    drawBranch(result, branch);
    return result;
};

const resetId = () => {
    actionId = 0;
    condId = 0;
};

export default {
    init,
    draw,
    getNode,
    getLine,
    resetId
};