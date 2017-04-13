/**
 * Created by huangling on 13/4/2017.
 */
import { TYPE } from '../../src/flow/constants';

const STATE_INIT = [{
    id: 'start_id',
    type: TYPE.START,
    nextStep: ['end_id']
}, {
    id: 'end_id',
    type: TYPE.END,
    nextStep: [-1]
}];

const DRAW_INIT = [{
    id: 'start_id',
    type: TYPE.START,
    nextStep: ['end_id']
}, {
    type: TYPE.LINE,
    add: () => {
    },
    fromId: 'start_id',
    toId: 'end_id'
}, {
    id: 'end_id',
    type: TYPE.END,
    nextStep: [-1]
}];

const DRAW_ADD_ACTION = [{
    id: 'start_id',
    type: TYPE.START,
    nextStep: ['action_0']
}, {
    type: TYPE.LINE,
    add: () => {
    },
    fromId: 'start_id',
    toId: 'action_0'
}, {
    id: 'action_0',
    type: TYPE.ACTION,
    nextStep: ['end_id']
}, {
    type: TYPE.LINE,
    add: () => {
    },
    fromId: 'action_0',
    toId: 'end_id'
}, {
    id: 'end_id',
    type: TYPE.END,
    nextStep: [-1]
}];

const DRAW_ADD_ACTION_2 = [{
    id: 'start_id',
    type: TYPE.START,
    nextStep: ['action_0']
}, {
    type: TYPE.LINE,
    add: () => {
    },
    fromId: 'start_id',
    toId: 'action_0'
}, {
    id: 'action_0',
    type: TYPE.ACTION,
    nextStep: ['end_id']
}, {
    type: TYPE.LINE,
    add: () => {
    },
    fromId: 'action_0',
    toId: 'action_1'
}, {
    id: 'action_1',
    type: TYPE.ACTION,
    nextStep: ['end_id']
}, {
    type: TYPE.LINE,
    add: () => {
    },
    fromId: 'action_1',
    toId: 'end_id'
}, {
    id: 'end_id',
    type: TYPE.END,
    nextStep: [-1]
}];

const DRAW_ADD_COND = [{
    id: 'start_id',
    type: TYPE.START,
    nextStep: ['action_0']
}, {
    type: TYPE.LINE,
    add: () => {
    },
    fromId: 'start_id',
    toId: 'cond_0'
}, {
    id: 'cond_0',
    type: TYPE.ACTION,
    nextStep: ['action_0', 'end_id']
}, {
    type: TYPE.LINE,
    add: () => {
    },
    fromId: 'cond_0',
    toId: 'end_id'
}, {
    type: TYPE.LINE,
    add: () => {
    },
    fromId: 'cond_0',
    toId: 'end_id'
}, {
    id: 'end_id',
    type: TYPE.END,
    nextStep: [-1]
}];


const DRAW_ADD_COND_1_ACTION = [{
    id: 'start_id',
    type: TYPE.START,
    nextStep: ['action_0']
}, {
    type: TYPE.LINE,
    add: () => {
    },
    fromId: 'start_id',
    toId: 'cond_0'
}, {
    id: 'cond_0',
    type: TYPE.ACTION,
    nextStep: ['action_0', 'end_id']
}, {
    type: TYPE.LINE,
    add: () => {
    },
    fromId: 'cond_0',
    toId: 'action_0'
}, {
    type: TYPE.LINE,
    add: () => {
    },
    fromId: 'cond_0',
    toId: 'end_id'
}, {
    id: 'action_0',
    type: TYPE.ACTION,
    nextStep: ['end_id']
}, {
    type: TYPE.LINE,
    add: () => {
    },
    fromId: 'action_0',
    toId: 'end_id'
}, {
    id: 'end_id',
    type: TYPE.END,
    nextStep: [-1]
}];

const DRAW_ADD_COND_2_ACTION = [{
    id: 'start_id',
    type: TYPE.START,
    nextStep: ['action_0']
}, {
    type: TYPE.LINE,
    add: () => {
    },
    fromId: 'start_id',
    toId: 'cond_0'
}, {
    id: 'cond_0',
    type: TYPE.ACTION,
    nextStep: ['action_0', 'end_id']
}, {
    type: TYPE.LINE,
    add: () => {
    },
    fromId: 'cond_0',
    toId: 'action_0'
}, {
    type: TYPE.LINE,
    add: () => {
    },
    fromId: 'cond_0',
    toId: 'action_1'
}, {
    type: TYPE.LINE,
    add: () => {
    },
    fromId: 'cond_0',
    toId: 'end_id'
}, {
    id: 'action_0',
    type: TYPE.ACTION,
    nextStep: ['end_id']
}, {
    id: 'action_1',
    type: TYPE.ACTION,
    nextStep: ['end_id']
}, {
    type: TYPE.LINE,
    add: () => {
    },
    fromId: 'action_0',
    toId: 'end_id'
}, {
    type: TYPE.LINE,
    add: () => {
    },
    fromId: 'action_1',
    toId: 'end_id'
}, {
    id: 'end_id',
    type: TYPE.END,
    nextStep: [-1]
}];

export {
    DRAW_INIT,
    DRAW_ADD_ACTION,
    DRAW_ADD_ACTION_2,
    DRAW_ADD_COND,
    DRAW_ADD_COND_1_ACTION,
    DRAW_ADD_COND_2_ACTION,
    STATE_INIT,
}