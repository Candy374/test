/**
 * Created by huangling on 6/7/2017.
 */


import assert from 'assert';
import validEmail from '../../src/email/validEmail';

describe('Email', function() {
    describe('init', () => {
        it('lingling374@qq.com is valid', function() {
            assert(validEmail('lingling374@qq.com'));
            assert(validEmail('lingling374@qq.mail.com'));
            assert.equal(validEmail('lingling.374@qq.mail.com'), true, 'name可以包含.');
            assert.equal(validEmail('lingling374@.qq.mail.com'), false, 'domain必须存在');
            assert.equal(validEmail('lingling374@asdf'), false, '顶级域名必须存在');
        });

        it('字符 .不能是第一个和最后一个，不能连续出现两次', function () {
            assert.equal(validEmail('.lingling374@qq.com'), false, '字符 .不能是第一个');
            assert.equal(validEmail('lingling374@qq.com.'), false, '字符 .不能是最后一个');
            assert.equal(validEmail('.lingling374@qq.com.'), false, '字符 .不能是第一个和最后一个');
            assert.equal(validEmail('lingling374@qq..com'), false, '不能连续出现两次');
            assert.equal(validEmail('li..ngling374@qq.com'), false, '不能连续出现两次');
            assert.equal(validEmail('..li.ngling374@qq.com'), false, '不能连续出现两次');
        });

        it('name最长64，domain最长253，总长最长256', function() {
            let name = '';
            for (let i =0; i< 65; i++) {
                name += 'l';
            }

            let domain = '';
            for (let i =0; i< 254; i++) {
                domain += 'd';
            }

            assert.equal(validEmail(name + '@qq.com'), false, 'name最长64');
            assert.equal(validEmail('asd@' + domain), false, 'domain最长253');
            assert.equal(validEmail(name.substr(5) + '@' + domain.substr(5)), false, '总长最长256');

        });

        it('顶级域名（com、cn等）长度为2到6个', function() {
            assert.equal(validEmail('lingling374@qq.comasde'), false, '顶级域名最长6');
            assert.equal(validEmail('lingling374@a.d'), false, '顶级域名最短2');
        });

        it('连词号-不能是第一个字符', function() {
            assert.equal(validEmail('-lingling374@qq.come'), false, ' 连词号-不能是第一个字符');
        });


        it(' name不可以有特殊字符', function() {
            assert.equal(validEmail('lingla-in我g374@qq.com'), false, 'name不可以有汉字');
            assert.equal(validEmail('lingla-ing*374@qq.com'), false, "name不可以有*");
            assert.equal(validEmail('lingla-ing!374@qq.com'), false, "name不可以有!");
            assert.equal(validEmail('lingla-ing#374@qq.com'), false, "name不可以有#");
            assert.equal(validEmail('lingla-ing$374@qq.com'), false, "name不可以$");
            assert.equal(validEmail('lingla-ing%374@qq.com'), false, "name不可以有%");
            assert.equal(validEmail('lingla-ing&374@qq.com'), false, "name不可以有&");
            assert.equal(validEmail('lingla-ing\'374@qq.com'), false, "name不可以有'");
            assert.equal(validEmail('lingla-ing+374@qq.com'), false, "name不可以有+");
            assert.equal(validEmail('lingla-ing-/374@qq.com'), false, "name不可以有/");
            assert.equal(validEmail('lingla-ing=374@qq.com'), false, "name不可以有=");
            assert.equal(validEmail('lingla-ing?374@qq.com'), false, "name不可以有?");
            assert.equal(validEmail('lingla-ing^374@qq.com'), false, "name不可以有^");
            assert.equal(validEmail('lingla-ing`374@qq.com'), false, "name不可以有`");
            assert.equal(validEmail('lingla-ing{374@qq.com'), false, "name不可以有{");
            assert.equal(validEmail('lingla-ing|374@qq.com'), false, "name不可以有|");
            assert.equal(validEmail('lingla-ing}374@qq.com'), false, "name不可以有}");
            assert.equal(validEmail('lingla-ing~374@qq.com'), false, "name不可以有~");
            assert.equal(validEmail('lingla-ing"374@qq.com'), false, "name不可以有\"");
        });

        it('name可以使用任意ASCII字符', function() {
            // name可以使用任意ASCII字符:
            //     大小写英文字母 a-z,A-Z
            // 数字 0-9
            // 字符 !#$%&'*+-/=?^`{|}~
            // name不可以有汉字
            // 但是有些邮件服务器会拒绝包含有特殊字符的邮件地址
            assert.equal(validEmail('lingla-ing374@qq.com'), true, 'name可以有-');
            assert.equal(validEmail('lingla_ing374@qq.com'), true, 'name可以有_');
            assert.equal(validEmail('lingla-ing37AAA4@qq.com'), true, 'name可以有大小写英文字母');
            assert.equal(validEmail('lingla-ing374@qq.com'), true, 'name可以有数字');
        });


        it('domain仅限于26个英文字母、10个数字、连词号-', function() {
            assert.equal(validEmail('lingling374@q-q.com'), true, 'domain可以有-');
            assert.equal(validEmail('lingling374@q123q.com'), true, 'domain可以有数字');
            assert.equal(validEmail('lingling374@qAAq.com'), true, 'domain可以有大小写字母');
            assert.equal(validEmail('lingling374@mail.q-q.com'), true, 'domain可以有-');
            assert.equal(validEmail('lingling374@mail.q123q.com'), true, 'domain可以有数字');
            assert.equal(validEmail('lingling374@mail.qAAq.com'), true, 'domain可以有大小写字母');

            assert.equal(validEmail('lingling374@qq.com-'), false, '顶级域名不能有-');
            assert.equal(validEmail('lingling374@qq.com-'), false, '顶级域名不能有-');
            assert.equal(validEmail('lingling374@mail.qq.co2m'), false, '顶级域名不能有数字');
            assert.equal(validEmail('lingling374@mail.qq.co2m'), false, '顶级域名不能有数字');
        });
    });
});