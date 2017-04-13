/**
 * Created by huangling on 13/4/2017.
 */

import { TYPE } from './constants'


let dataMap = {};
// const add = (node, from, to) => {
//     return [
//         from, getLine(from, node),
//         node, getLine(node, to),
//         to
//     ]
// };

const findNode = (id) => {
    return dataMap[id];
};

const getLine = (from, to) => {
    return {
        type: TYPE.LINE,
        add: (node, fromNode, toNode) => {
            fromNode = fromNode || findNode(from.id);
            toNode = toNode || findNode(to.id);
            return [
                fromNode, getLine(fromNode, node),
                node, getLine(node, toNode),
                toNode
            ]
        },
        fromId: from.id,
        toId: to.id
    }
};

let id = 0;
const resetId = () => id = 0;

const getNode = (type, nextStep = -1) => {
    return {
        id: id++,
        type,
        nextStep
    };
};

const init = () => {
    return [getNode(TYPE.START, 1), getNode(TYPE.END)];
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

        // delete dataMap[startNode.id];
        let nextStep = result[result.length - 1].nextStep;
        while (nextStep !== -1) {
            const nextAction = dataMap[nextStep];
            if (nextAction) {
                result.push(getLine(result[result.length - 1], nextAction));
                result.push(nextAction);
                nextStep = nextAction.nextStep;
            } else {
                console.log('can not find next steps!');
                nextStep = -1;
            }
        }
    }

    return result;
};

export default {
    init,
    draw,
    getNode,
    getLine,
    resetId
};