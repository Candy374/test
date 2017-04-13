/**
 * Created by huangling on 13/4/2017.
 */
import assert from 'assert';
import flow from '../../src/flow/flow';
import { TYPE } from '../../src/flow/constants';
import * as MOCK_RESULT from './mockData';

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

    describe('init flow', function() {
        it('should return only START and END', function() {
            jsonEqual(flow.init(), MOCK_RESULT.STATE_INIT);
        });
    });

    describe('draw init flow', () => {
        it('should return Start node, line with 1 add, and end', () => {
            const canvas = flow.draw(flow.init());
            assert(canvas.length, 3);
            jsonEqual(canvas, MOCK_RESULT.DRAW_INIT);
        })
    });

    describe('add actions', () => {
        it('add 1 action, should return START, LINE, ACTION, LINE, END', () => {
            const canvas = flow.draw(flow.init());
            const line = canvas[1];
            const action = flow.getNode(TYPE.ACTION);
            const newCanvas = line.add(action, {result: canvas});
            RESULT = newCanvas;
            assert(newCanvas.length, 5);
            jsonEqual(newCanvas, MOCK_RESULT.DRAW_ADD_ACTION);
        });

        it('add 2 actions, should return START, LINE, ACTION, LINE, ACTION, LINE, END', () => {
            let newCanvas = RESULT;
            const action2 = flow.getNode(TYPE.ACTION);
            newCanvas = newCanvas[3].add(action2, {result: newCanvas});
            assert(newCanvas.length, 7);
            jsonEqual(newCanvas, MOCK_RESULT.DRAW_ADD_ACTION_2);
        });
    });

    describe('delete action', () => {
        it('should return DRAW_INIT', () => {
            const result = [...RESULT];
            flow.deleteNode(result, result[2]);
            jsonEqual(result, MOCK_RESULT.DRAW_INIT);
        });

        it('should return DRAW_ADD_ACTION', () => {
            const result = MOCK_RESULT.DRAW_ADD_ACTION_2;
            flow.deleteNode(result, result[4]);
            jsonEqual(result, MOCK_RESULT.DRAW_ADD_ACTION);
        })
    })
});