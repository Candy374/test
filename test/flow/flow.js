/**
 * Created by huangling on 13/4/2017.
 */
import assert from 'assert';
import flow from '../../src/flow/flow';
import { TYPE } from '../../src/flow/constants';
import * as MOCK_DATA from './mockData';
import * as MOCK_NODE from './mockNode';

const ignoreFunc = (value, other) => {
    if (typeof value === 'function' && typeof other === 'function') {
        return true;
    }
};

const jsonEqual = (obj, other) => {
    assert(JSON.stringify(obj, null, ' '), JSON.stringify(other, null, ' '));
};

let RESULT;
describe('FLOW', function() {
    beforeEach(() => {
        flow.resetId();
    });

    describe('init', () => {
        it('should return only START and END', function() {
            jsonEqual(flow.init(), MOCK_DATA.STATE_INIT);
        });

        it('draw init flow', () => {
            const canvas = flow.draw(flow.init());
            assert(canvas.length, 3);
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
        it('add 1 action, should return DRAW_ADD_ACTION', () => {
            const canvas = flow.draw(flow.init());
            const line = canvas[1];
            const action = flow.getNode(TYPE.ACTION);
            const newCanvas = line.add(action, {result: canvas});
            RESULT = newCanvas;
            assert(newCanvas.length, 5);
            jsonEqual(newCanvas, MOCK_DATA.DRAW_ADD_ACTION);
        });

        it('add 2 actions, should return DRAW_ADD_ACTION_2', () => {
            let newCanvas = RESULT;
            const action2 = flow.getNode(TYPE.ACTION);
            newCanvas = newCanvas[3].add(action2, {result: newCanvas});
            assert(newCanvas.length, 7);
            jsonEqual(newCanvas, MOCK_DATA.DRAW_ADD_ACTION_2);
        });
    });

    describe('delete action', () => {
        it('DRAW_ADD_ACTION delete action should return DRAW_INIT', () => {
            const result = [...RESULT];
            flow.deleteNode(result, result[2]);
            jsonEqual(result, MOCK_DATA.DRAW_INIT);
        });

        it('DRAW_ADD_ACTION_2 delete action should return DRAW_ADD_ACTION', () => {
            const result = MOCK_DATA.DRAW_ADD_ACTION_2;
            flow.deleteNode(result, result[4]);
            jsonEqual(result, MOCK_DATA.DRAW_ADD_ACTION);
        });

        it('DRAW_ADD_COND delete action should return DRAW_ADD_ACTION', () => {
            const result = MOCK_DATA.DRAW_ADD_ACTION_2;
            flow.deleteNode(result, result[4]);
            jsonEqual(result, MOCK_DATA.DRAW_ADD_ACTION);
        })
    });

    describe.only('add conditions', () => {
        it('COND, should return DRAW_ADD_COND', () => {
            const canvas = flow.draw(flow.init());
            const line = canvas[1];
            const action = flow.getNode(TYPE.ACTION);
            const cond = flow.getNode(TYPE.COND);
            let newCanvas = line.add(cond, {result: canvas});
            newCanvas = newCanvas[3].add(action, {result: canvas});
            assert(newCanvas.length, 7);
            jsonEqual(newCanvas, MOCK_DATA.DRAW_ADD_COND);
        });

        it('COND_1_action, should return DRAW_ADD_COND_1_ACTION', () => {
            const canvas = flow.draw(flow.init());
            const line = canvas[1];
            const action = flow.getNode(TYPE.ACTION);
            const cond = flow.getNode(TYPE.COND);
            let newCanvas = line.add(cond, {result: canvas});
            newCanvas = newCanvas[3].add(action, {result: canvas});
            assert(newCanvas.length, 7);
            jsonEqual(newCanvas, MOCK_DATA.DRAW_ADD_COND);
        });

        it('COND_2_action, should return DRAW_ADD_COND_2_ACTION', () => {
            const canvas = flow.draw(flow.init());
            const line = canvas[1];
            const action = flow.getNode(TYPE.ACTION);
            const action2 = flow.getNode(TYPE.ACTION);
            const cond = flow.getNode(TYPE.COND, [action.id, action2.id, 'end_id']);
            let newCanvas = line.add(cond, {result: canvas});
            newCanvas = newCanvas[3].add(action, {result: canvas});
            jsonEqual(newCanvas, MOCK_DATA.DRAW_ADD_COND_2_ACTION);
        });
    });
});