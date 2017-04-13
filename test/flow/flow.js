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


describe('FLOW', function() {
    beforeEach(() => {
        // flow.resetId();
    });

    describe('init flow', function() {
        it('should return only START and END', function() {
            assert.deepEqual(flow.init(), MOCK_RESULT.STATE_INIT);
        });
    });

    describe('draw init flow', () => {
        it('should return Start node, line with 1 add, and end', () => {
            const canvas = flow.draw(flow.init());
            assert(canvas.length, 3);
            assert(JSON.stringify(canvas, null, ' '), JSON.stringify(MOCK_RESULT.DRAW_INIT, null, ' '));
        })
    });

    describe('add an action', () => {
        it('should return START, LINE, ACTION, LINE, END', () => {
            const canvas = flow.draw(flow.init());
            const line = canvas[1];
            const action = flow.getNode(TYPE.ACTION);
            const newCanvas = [canvas[0], ...line.add(action), canvas[2]];
            assert(newCanvas.length, 5);
            assert(JSON.stringify(newCanvas, null, ' '), JSON.stringify(MOCK_RESULT.DRAW_ADD_ACTION, null, ' '));
        })
    });

    describe('add 2 actions ', () => {
        it('should return START, LINE, ACTION, LINE, ACTION, LINE, END', () => {
            const canvas = flow.draw(flow.init());
            const line = canvas[1];
            const action = flow.getNode(TYPE.ACTION);
            let newCanvas = [canvas[0], ...line.add(action), canvas[2]];

            assert(JSON.stringify(newCanvas, null, ' '), JSON.stringify(MOCK_RESULT.DRAW_ADD_ACTION, null, ' '));

            const action2 = flow.getNode(TYPE.ACTION);
            newCanvas = [newCanvas.slice(0, 3), ...newCanvas[3].add(action2), newCanvas.slice(4)];
            assert(newCanvas.length, 7);
            assert(JSON.stringify(newCanvas, null, ' '), JSON.stringify(MOCK_RESULT.DRAW_ADD_ACTION_2, null, ' '));
        })
    })
});