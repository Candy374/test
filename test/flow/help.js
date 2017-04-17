/**
 * Created by huangling on 14/4/2017.
 */
import { TYPE } from '../../src/flow/constants'

const translate = (result) => {
    const rrr = [];
    result.map(n => {
        let str = '';
        if (n.type === TYPE.LINE) {
            str = `${n.fromId}->${n.toId}`;

            rrr.push(str);
        } else {
            if (n.id === 'start_id') {
                str = `${n.id}=>start`;
            } else if (n.id === 'end_id') {
                str = `${n.id}=>end`;
            } else if (n.type === TYPE.ACTION) {
                str = `${n.id}=>operation: ${n.id}`;
            } else if (n.type === TYPE.COND) {
                const yes = n.nextStep[0];
                const no = n.nextStep[1];
                str = `${n.id}=>condition: ${yes} or ${no}`;
            }

            rrr.unshift(str);
        }
    });
    return rrr;
};

export {
    translate
}

/*
st=>start: Start:>http://www.google.com[blank]
    e=>end:>http://www.google.com
    op1=>operation: My Operation
sub1=>subroutine: My Subroutine
cond=>condition: test
io=>inputoutput: catch something...

st->op1->cond
cond(yes)->io->e
cond(no)->sub1(right)->op1*/
