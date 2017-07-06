/**
 * Created by huangling on 6/7/2017.
 */

/*
 Email的规则: name@domain.com
 必须包含顶级域名

 name最长64，domain最长253，总长最长256
 name可以使用任意ASCII字符:
 大小写英文字母 a-z,A-Z
 数字 0-9
 字符 _-.

 字符 .不能是第一个和最后一个，不能连续出现两次

 name 不能包含特殊字符 !#$%&'*+-/=?^`{|}~

 domain仅限于26个英文字母、10个数字、连词号-
 连词号-不能是第一个字符
 顶级域名（com、cn等）长度为2到6个
 */
const validEmail = email => {
    // 字符 .不能连续出现两次
    if (email.indexOf('..') > -1) {
        return false;
    }

    // name最长64，domain最长253，总长最长256
    const [name, domain] = email.split('@');

    // name最长64，domain最长253，总长最长256
    if (name.length > 64 || domain.length > 253 || email.length > 256) {
        return false;
    }

   // Email的规则: name@domain
    // 字符 .不能是第一个和最后一个，不能连续出现两次
    // 顶级域名（com、cn等）长度为2到6个
    // 连词号-不能是第一个字符
    const reg = /^[^\.-][\w-\.]+@[\w-]+(\.[a-z\d-]+)*(\.[a-z]{2,6})$/i;
    if (reg.test(email) == false) {
        return false;
    }

    return true

};

export default validEmail;

