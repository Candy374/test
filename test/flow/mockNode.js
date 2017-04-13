/**
 * Created by huangling on 13/4/2017.
 */
import { TYPE } from '../../src/flow/constants';

export const ACTION = {
    id: 'action_0',
    type: TYPE.ACTION,
    nextStep: ['end_id']
};

export const COND = {
    id: 'cond_0',
    type: TYPE.COND,
    nextStep: ['end_id', 'end_id']
};

export const COND_1_action = {
    id: 'cond_0',
    type: TYPE.COND,
    nextStep: ['action_0', 'end_id']
};

export const COND_2_action = {
    id: 'cond_0',
    type: TYPE.COND,
    nextStep: ['action_0', 'action_1', 'end_id']
};