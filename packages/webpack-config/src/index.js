// 引入 css
import './style/style1.css';
// 引入 lodash
import _ from 'lodash';
// 引入其他脚本
import { sum } from './js/math';

// 其他脚本
console.log('window.ENV', ENV);
const myPrint = (info) => {
    console.log(info);
};
myPrint('hello webpack 5');

const sumRes = sum(1, 2);
myPrint('sumRes', sumRes);

// 引入图片
import imgFile1 from './img/1.png';
import imgFile2 from './img/2.jpeg';
function insertImg2Elem(imgFile) {
    const img = new Image();
    img.src = imgFile;
    document.body.appendChild(img);
}
insertImg2Elem(imgFile1);
insertImg2Elem(imgFile2);

// // 增加，开启热更新之后的代码逻辑
// if (module.hot) {
//     module.hot.accept(['./js/math'], () => {
//         const sumRes = sum(10, 30)
//         console.log('sumRes in hot', sumRes)
//     })
// }
