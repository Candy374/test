/**
 * Created by huangling on 13/4/2017.
 */
import assert from 'assert';
import flow from '../src/flow/flow';
import CONSTANTS from '../src/flow/constants';


describe('FLOW', function() {
    describe('init flow', function() {
        it('should return only START and END', function() {
            assert.equal(flow.init()[0].type, CONSTANTS.STATE_INIT[0].type);
        });
    });
});