/**
 * Created by huangling on 16/12/2017.
 */

import assert from 'assert';
import findRightPlace from '../../src/positionOfChild/index';

describe('find Right Place for child', function() {
    describe('init', () => {
        it('count = 1, position: 0.5', function() {
            assert.equal(findRightPlace(0, 1), 0.5);
        });

        it('count = 2, positions: 0, 1', function() {
            const count = 2;
            const positions = [0, 1];
            for(let i = 0; i < count; i++) {
                assert.equal(findRightPlace(i, count), positions[i]);
            }
        });

        it('count = 3, positions: 0, 0.5, 1', function() {
            const count = 3;
            const positions = [0, 0.5, 1];
            for(let i = 0; i < count; i++) {
                assert.equal(findRightPlace(i, count), positions[i]);
            }
        });

        it('count = 4, positions: 0, 1/3, 2/3, 1', function() {
            const count = 4;
            const positions = [0, 1/3, 2/3, 1];
            for(let i = 0; i < count; i++) {
                assert.equal(findRightPlace(i, count), positions[i]);
            }
        });

        it('count = 5, positions: 0, 0.25, 0.5, 0.75, 1', function() {
            const count = 5;
            const positions = [0, 0.25, 0.5, 0.75, 1];
            for(let i = 0; i < count; i++) {
                assert.equal(findRightPlace(i, count), positions[i]);
            }
        });

        it('length = 3, count = 1, position: 1.5', function() {
            assert.equal(findRightPlace(0, 1, 3), 1.5);
        });

        it('length = 3, count = 2, positions: 0, 3', function() {
            const count = 2;
            const positions = [0, 3];
            for(let i = 0; i < count; i++) {
                assert.equal(findRightPlace(i, count, 3), positions[i]);
            }
        });
    });
});