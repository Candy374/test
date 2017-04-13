/**
 * Created by huangling on 13/4/2017.
 */

const TYPE = {
    START: 'START',
    ACTION: 'ACTION',
    CLOCK: 'CLOCK',
    COND: 'COND',
    END: 'END',

    LINE: 'LINE'
};

const STATE_INIT = [{
    id: 0,
    type: TYPE.START,
    nextStep: 1
}, {
    id: 1,
    type: TYPE.END,
    nextStep: -1
}];

export {
    TYPE,
    STATE_INIT
}