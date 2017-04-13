/**
 * Created by huangling on 13/4/2017.
 */
import assert from 'assert';
import flow from '../src/flow/flow';
import { TYPE, STATE_INIT} from '../src/flow/constants';
import _ from 'lodash';

const ignoreFunc = (value, other) => {
    if (typeof value === 'function' && typeof other === 'function') {
        return true;
    }
};

describe('FLOW', function() {
    beforeEach(() => {
        flow.resetId();
    });

    describe('init flow', function() {
        it('should return only START and END', function() {
            assert.deepEqual(flow.init(), STATE_INIT);
        });
    });

    describe('draw init flow', () => {
        it('should return Start node, line with 1 add, and end', () => {
            const canvas = flow.draw(flow.init());
            assert(canvas.length, 3);
            flow.resetId();
            const start = flow.getNode(TYPE.START, 1);
            const end = flow.getNode(TYPE.END);
            assert(_.isEqualWith(canvas, [start, flow.getLine(start, end), end ], ignoreFunc), true);
        })
    });

    describe('add an action', () => {
        it('should return START, LINE, ACTION, LINE, END', () => {
            const canvas = flow.draw(flow.init());
            const line = canvas[1];
            const newCanvas = line.add(flow.getNode(TYPE.ACTION), canvas[0], canvas[1]);
            assert(newCanvas.length, 5);
            assert(newCanvas[1].type, TYPE.LINE);
            assert(newCanvas[2].type, TYPE.ACTION);
            assert(newCanvas[3].type, TYPE.LINE);
        })
    });

    describe('add an action without given from and to', () => {
        it('should return START, LINE, ACTION, LINE, END', () => {
            const canvas = flow.draw(flow.init());
            const line = canvas[1];
            const newCanvas = line.add(flow.getNode(TYPE.ACTION), canvas[0], canvas[1]);
            assert(newCanvas.length, 5);
            assert(newCanvas[1].type, TYPE.LINE);
            assert(newCanvas[2].type, TYPE.ACTION);
            assert(newCanvas[3].type, TYPE.LINE);
        })
    })
});