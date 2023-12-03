// 引入 less
import './style/style2.less';
// 引入其他脚本
import { sum } from './js/math';

// 其他脚本
const sumRes = sum(10, 20);
console.log('other sumRes', sumRes);

console.log('other js');
