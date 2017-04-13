/**
 * Created by huangling on 13/4/2017.
 */
import assert from 'assert';
import flow from '../../src/flow/flow';
import { TYPE } from '../../src/flow/constants';
import * as MOCK_DATA from './mockData';
import * as MOCK_NODE from './mockNode';
import _ from 'lodash';

const ignoreFunc = (value, other) => {
    if (typeof value === 'function' && typeof other === 'function') {
        return true;
    }
};

const jsonEqual = (obj, other) => {
    assert.equal(JSON.stringify(obj, null, ' '), JSON.stringify(other, null, ' '));
};

const jsonEqualArray = (obj, other) => {
    const objData = obj.filter(o => o.type !== TYPE.LINE);
    const otherData = other.filter(o => o.type !== TYPE.LINE);
    assert.equal(JSON.stringify(objData, null, ' '), JSON.stringify(otherData, null, ' '));

    const objLine = obj.filter(o => o.type === TYPE.LINE).map(l => `${l.fromId} ${l.toId}`).sort();
    const otherLine = other.filter(o => o.type === TYPE.LINE).map(l => `${l.fromId} ${l.toId}`).sort();
    assert.deepEqual(objLine, otherLine);
};

const findLine = (resultArray, fromId, toId) => {
    return resultArray.find(n => n.type === TYPE.LINE && n.fromId === fromId && n.toId === toId);
};

const findNode = (resultArray, id) => resultArray.find(n => n.id === id);

describe('FLOW', function() {
    describe('init', () => {
        beforeEach(() => {
            flow.reset();
        });

        it('should return only START and END', function() {
            jsonEqual(flow.init(), MOCK_DATA.STATE_INIT);
        });

        it('draw init flow', () => {
            const canvas = flow.draw(flow.init());
            jsonEqual(canvas, MOCK_DATA.DRAW_INIT);
        });

        it('get action', () => {
            const action = flow.getNode(TYPE.ACTION);
            jsonEqual(action, MOCK_NODE.ACTION);
        });

        it('get cond', () => {
            const node = flow.getNode(TYPE.COND);
            jsonEqual(node, MOCK_NODE.COND);
        });

        it('get COND_1_action', () => {
            const action = flow.getNode(TYPE.ACTION);
            const node = flow.getNode(TYPE.COND, action);
            jsonEqual(node, MOCK_NODE.COND_1_action);
        });

        it('get COND_2_action', () => {
            const action = flow.getNode(TYPE.ACTION);
            const action2 = flow.getNode(TYPE.ACTION);
            const node = flow.getNode(TYPE.COND, [action.id, action2.id, 'end_id']);
            jsonEqual(node, MOCK_NODE.COND_2_action);
        });
    });


    describe('add actions', () => {
        let RESULT;

        before(() => {
            flow.reset();
        });

        it('add 1 action, should return DRAW_ADD_ACTION', () => {
            const canvas = flow.draw(flow.init());
            const line = canvas[1];
            const action = flow.getNode(TYPE.ACTION);
            const newCanvas = line.add(action, {result: canvas});
            RESULT = newCanvas;
            assert(newCanvas.length, 5);
            jsonEqualArray(newCanvas, MOCK_DATA.DRAW_ADD_ACTION);
        });

        it('add 2 actions, should return DRAW_ADD_ACTION_2', () => {
            let newCanvas = RESULT;
            const action2 = flow.getNode(TYPE.ACTION);
            newCanvas = newCanvas[3].add(action2, {result: newCanvas});
            jsonEqualArray(newCanvas, MOCK_DATA.DRAW_ADD_ACTION_2);
        });
    });

    describe('delete action', () => {
        beforeEach(() => {
            flow.reset();
        });

        it('DRAW_ADD_ACTION delete action should return DRAW_INIT', () => {
            let result = _.cloneDeep(MOCK_DATA.DRAW_ADD_ACTION);
            result = flow.deleteNode(result, findNode(result, 'action_0'));
            jsonEqual(result, MOCK_DATA.DRAW_INIT);
        });

        it('DRAW_ADD_ACTION_2 delete action should return DRAW_ADD_ACTION', () => {
            let result = _.cloneDeep(MOCK_DATA.DRAW_ADD_ACTION_2);
            result = flow.deleteNode(result, findNode(result, 'action_1'));
            jsonEqual(result, MOCK_DATA.DRAW_ADD_ACTION);
        });

        it('DRAW_ADD_COND delete action should return DRAW_ADD_ACTION', () => {
            let result = _.cloneDeep(MOCK_DATA.DRAW_ADD_COND_1_ACTION);
            result = flow.deleteNode(result, findNode(result, 'action_0'));
            jsonEqual(result, MOCK_DATA.DRAW_ADD_COND);
        })
    });

    describe('add conditions', () => {
        beforeEach(() => {
            flow.reset();
        });


        it('COND, should return DRAW_ADD_COND', () => {
            const canvas = flow.draw(flow.init());
            const line = canvas[1];
            const cond = flow.getNode(TYPE.COND);
            let RESULT = line.add(cond, {result: canvas});

            jsonEqualArray(RESULT, MOCK_DATA.DRAW_ADD_COND);
        });

        it('COND_1_action, should return DRAW_ADD_COND_1_ACTION', () => {
            const canvas = flow.draw(flow.init());
            const line = canvas[1];
            const cond = flow.getNode(TYPE.COND);
            let newCanvas = line.add(cond, {result: canvas});

            const action = flow.getNode(TYPE.ACTION);
            newCanvas = newCanvas[3].add(action, {result: newCanvas});
            jsonEqualArray(newCanvas, MOCK_DATA.DRAW_ADD_COND_1_ACTION);
        });

        it('COND_2_action, should return DRAW_ADD_COND_2_ACTION', () => {
            const canvas = flow.draw(flow.init());
            let line = findLine(canvas, 'start_id', 'end_id');
            const action = flow.getNode(TYPE.ACTION);
            const action2 = flow.getNode(TYPE.ACTION);
            const cond = flow.getNode(TYPE.COND, ['end_id', 'end_id', 'end_id']);


            let newCanvas = line.add(cond, {result: canvas});
            line = findLine(newCanvas, 'cond_0', 'end_id');
            newCanvas = line.add(action, {result: newCanvas});
            jsonEqualArray(newCanvas, MOCK_DATA.DRAW_ADD_COND_2_ACTION_STEP1);

            line = findLine(newCanvas, 'cond_0', 'end_id');
            newCanvas = line.add(action2, {result: newCanvas});

            jsonEqualArray(newCanvas, MOCK_DATA.DRAW_ADD_COND_2_ACTION);
        });
    });
});