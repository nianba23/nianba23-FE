/**
 * 将一个数组旋转 K 步
 */
// let arr1: number[] = [];
// for (let index = 0; index < 10 * 10000; index++) {
//     arr1.push(index);
// }
// function rotateArr1(arr: number[], k: number) {
//     for (let i = 0; i < k; i++) {
//         const temp = arr.pop();
//         arr.unshift(temp!); // 数组是有序结构，unshift 非常慢
//     }
//     return arr;
// }
// console.time('rotate1');
// console.log(rotateArr1(arr1, 9 * 10000));
// console.timeEnd('rotate1');

// const arr2 = [];
// for (let index = 0; index < 10 * 10000; index++) {
//     arr2.push(index);
// }
// function rotateArr2(arr: number[], k: number) {
//     const index = k % arr.length;
//     const arr1 = arr.slice(-index); // slice 不会动原数组
//     const arr2 = arr.slice(0, arr.length - index);
//     const res = arr1.concat(arr2);

//     return res;
// }
// console.time('rotate2');
// console.log(rotateArr2(arr2, 9 * 10000));
// console.timeEnd('rotate2');

// ---------------------------------------------------------------------------------

/**
 * 判断字符串是否括号匹配，栈
 */
// const str1 = '(aa{[bb]cc(dd)})';
// const str2 = '{a[b(c)';
// function matchBracket1(str: string) {
//     const leftStack = [];
//     const map = {
//         '(': ')',
//         '[': ']',
//         '{': '}',
//     };

//     for (let i = 0; i < str.length; i++) {
//         if (Object.keys(map).includes(str[i])) {
//             leftStack.push(str[i]);
//         } else if (Object.values(map).includes(str[i])) {
//             type AllKeys = keyof typeof map;
//             const last = leftStack[leftStack.length - 1] as AllKeys;
//             if (map[last] !== str[i]) {
//                 return false;
//             }
//             leftStack.pop();
//         }
//     }
//     if (leftStack.length > 0) {
//         return false;
//     }
//     return true;
// }
// console.log(matchBracket1(str1));
// console.log(matchBracket1(str2));

// ---------------------------------------------------------------------------------

/**
 * 两个栈实现队列
 * 最好还是通过链表实现
 */
// class MyQueue<T> {

//     private pushStack: T[];
//     private popStack: T[];

//     constructor() {
//         this.pushStack = [];
//         this.popStack = [];
//     }

//     add(data: T) {
//         this.pushStack.push(data);
//     }

//     delete(): T | null {
//         if (this.pushStack.length === 0) {
//             return null;
//         }
//         while (this.pushStack.length > 0) {
//             this.popStack.push(this.pushStack.pop()!);
//         }
//         const res = this.popStack.pop();
//         while (this.popStack.length > 0) {
//             this.pushStack.push(this.popStack.pop()!);
//         }
//         return res!;
//     }

//     get length() {
//         return this.pushStack.length;
//     }
// }
// const myQueue = new MyQueue();
// myQueue.add(1);
// myQueue.add(2);
// myQueue.add(3);
// console.log(myQueue.length);
// console.log(myQueue.delete());
// console.log(myQueue.length);

// ---------------------------------------------------------------------------------

// class LinkedNode<T> {

//     data: T;
//     next: LinkedNode<T> | null;
//     prev: LinkedNode<T> | null;

//     constructor(data: T, next: LinkedNode<T> | null = null, prev: LinkedNode<T> | null = null) {
//         this.data = data;
//         this.next = next;
//         this.prev = prev;
//     }
// }
/**
 * 单链表
 */
// class SingleLinkedList<T> {

//     private head: LinkedNode<T> | null;
//     private length: number;

//     constructor() {
//         this.head = null;
//         this.length = 0;
//     }

//     prepend(data: T) {
//         const newNode = new LinkedNode(data, this.head, null);
//         this.head = newNode;
//         this.length++;
//     }

//     append(data: T) {
//         const newNode = new LinkedNode(data);
//         if (!this.head) {
//             this.head = newNode;
//             this.length++;
//             return;
//         }
//         let current = this.head;
//         while (current.next) {
//             current = current.next;
//         }
//         current.next = newNode;
//         this.length++;
//     }

//     insertAfter(targetData: T, data: T) {
//         let current = this.head;
//         while (current) {
//             if (current.data === targetData) {
//                 const newNode = new LinkedNode(data, current.next);
//                 current.next = newNode;
//                 this.length++;
//                 return;
//             }
//             current = current.next;
//         }
//     }

//     deleteHead() {
//         if (this.head) {
//             this.head = this.head.next;
//             this.length--;
//         }
//     }

//     deleteTail() {
//         if (!this.head) {
//             return;
//         }
//         if (!this.head.next) {
//             this.head = null;
//             this.length--;
//             return;
//         }
//         let current = this.head;
//         let previous = null;
//         while (current.next) {
//             previous = current;
//             current = current.next;
//         }
//         if (previous) {
//             previous.next = current.next;
//             this.length--;
//         }
//     }

//     delete(data: T) {
//         if (!this.head) {
//             return;
//         }
//         if (this.head.data === data) {
//             this.head = this.head.next;
//             this.length--;
//             return;
//         }
//         let current: LinkedNode<T> | null = this.head;
//         let previous: LinkedNode<T> | null = null;
//         while (current && current.data !== data) {
//             previous = current;
//             current = current.next;
//         }
//         if (current && previous) {
//             previous.next = current.next;
//             this.length--;
//         }
//     }

//     getHead() {
//         return this.head;
//     }

//     setHead(node: LinkedNode<T> | null) {
//         this.head = node;
//     }

//     getLength() {
//         return this.length;
//     }

//     getAll() {
//         const nodes = [];
//         let current = this.head;
//         while (current) {
//             nodes.push(current);
//             current = current.next;
//         }
//         return nodes;
//     }
// }
// const singleLinkedList = new SingleLinkedList();
// singleLinkedList.append(1);
// singleLinkedList.append(2);
// singleLinkedList.append(4);
// singleLinkedList.prepend(0);
// singleLinkedList.insertAfter(2, 3);
// console.log(singleLinkedList.getLength());
// console.log(singleLinkedList.getAll());
// singleLinkedList.deleteHead();
// singleLinkedList.deleteTail();
// singleLinkedList.delete(2);
// console.log(singleLinkedList.getLength());
// console.log(singleLinkedList.getAll());
/**
 * 双向链表
 */
// class DoublyLinkedList<T> {

//     private head: LinkedNode<T> | null;
//     private tail: LinkedNode<T> | null;
//     private length: number;

//     constructor() {
//         this.head = null;
//         this.tail = null;
//         this.length = 0;
//     }

//     prepend(data: T) {
//         const newNode = new LinkedNode(data, this.head, null);
//         if (this.head) {
//             this.head.prev = newNode;
//         }
//         this.head = newNode;
//         if (!this.tail) {
//             this.tail = newNode;
//         }
//         this.length++;
//     }

//     append(data: T) {
//         const newNode = new LinkedNode(data, null, this.tail);
//         if (this.tail) {
//             this.tail.next = newNode;
//         }
//         this.tail = newNode
//         if (!this.head) {
//             this.head = newNode;
//         }
//         this.length++;
//     }

//     insertAfter(targetData: T, data: T) {
//         let current = this.head;
//         while (current) {
//             if (current.data === targetData) {
//                 const newNode = new LinkedNode(data, current.next, current);
//                 if (current.next) {
//                     current.next.prev = newNode;
//                 }
//                 current.next = newNode;
//                 this.length++;
//                 return;
//             }
//             current = current.next;
//         }
//     }

//     deleteHead() {
//         if (this.head) {
//             this.head = this.head.next;
//             this.head && (this.head.prev = null);
//             this.length--;
//             if (this.length === 0) {
//                 this.head = null;
//                 this.tail = null;
//             }
//             return;
//         }
//     }

//     deleteTail() {
//         if (this.tail) {
//             this.tail = this.tail.prev;
//             this.tail && (this.tail.next = null);
//             this.length--;
//             if (this.length === 0) {
//                 this.head = null;
//                 this.tail = null;
//             }
//             return;
//         }
//     }

//     delete(data: T) {
//         let current = this.head;
//         while (current) {
//             if (current.data === data) {
//                 if (current.prev) {
//                     current.prev.next = current.next;
//                 } else {
//                     this.head = current.next;
//                 }
//                 if (current.next) {
//                     current.next.prev = current.prev;
//                 } else {
//                     this.tail = current.prev;
//                 }
//                 this.length--;
//                 return;
//             }
//             current = current.next;
//         }
//     }

//     getHead() {
//         return this.head;
//     }

//     getTail() {
//         return this.tail;
//     }

//     getLength() {
//         return this.length;
//     }
    
//     getAll() {
//         const nodes = [];
//         let current = this.head;
//         while (current) {
//             nodes.push(current);
//             current = current.next;
//         }
//         return nodes;
//     }

//     find(data: T) {
//         let current = this.head;
//         while (current) {
//             if (current.data === data) {
//                 return current;
//             }
//             current = current.next;
//         }
//         return null;
//     }

//     clear() {
//         this.head = null;
//         this.tail = null;
//         this.length = 0;
//     }
// }
// const doublyLinkedList = new DoublyLinkedList();
// doublyLinkedList.append(1);
// doublyLinkedList.append(2);
// doublyLinkedList.append(4);
// doublyLinkedList.prepend(0);
// doublyLinkedList.insertAfter(2, 3);
// console.log(doublyLinkedList.getHead());
// console.log(doublyLinkedList.getTail());
// console.log(doublyLinkedList.getLength());
// console.log(doublyLinkedList.find(2));
// console.log(doublyLinkedList.getAll());
// doublyLinkedList.deleteHead();
// doublyLinkedList.deleteTail();
// doublyLinkedList.delete(2);
// console.log(doublyLinkedList.getHead());
// console.log(doublyLinkedList.getTail());
// console.log(doublyLinkedList.getLength());
// console.log(doublyLinkedList.find(2));
// console.log(doublyLinkedList.find(3));
// console.log(doublyLinkedList.getAll());
// doublyLinkedList.clear();
// console.log(doublyLinkedList.getHead());
// console.log(doublyLinkedList.getTail());
// console.log(doublyLinkedList.getLength());
// console.log(doublyLinkedList.getAll());

/**
 * 反转单链表
 */
// function revertSingleLink() {
//     const singleLinkedList = new SingleLinkedList();
//     for (let index = 0; index < 7; index++) {
//         singleLinkedList.append(index);
//     }

//     let prevNode = null;
//     let currNode = null;
//     let nextNode = singleLinkedList.getHead();
//     console.log(singleLinkedList.getAll());
//     while (nextNode) {
//         // 第一个元素删掉 next，避免后面循环中找不到 prev（节点中有 prev 属性的话没关系）
//         if (currNode && !prevNode) {
//             currNode.next = null;
//         }
//         // 反转
//         if (currNode && prevNode) {
//             currNode.next = prevNode;
//         }
//         // 整体后移
//         prevNode = currNode;
//         currNode = nextNode;
//         nextNode = nextNode ? nextNode.next : null;
//     }
//     if (currNode) {
//         // 最后一个的补充：当 nextNode 空时，此时 curNode 尚未设置 next
//         currNode.next = prevNode;
//         singleLinkedList.setHead(currNode);
//     }
//     return singleLinkedList.getAll();
// }
// console.log(revertSingleLink());

// ---------------------------------------------------------------------------------

// 二分查找
// function binarySearch1(arr: number[], target: number) {
//     let left = 0, right = arr.length - 1;
//     while (left <= right) {
//         let mid = Math.floor((left + right) / 2);
//         const midValue = arr[mid];
//         if (midValue === target) {
//             return mid;
//         }
//         if (midValue > target) {
//             right = mid - 1;
//         } else {
//             left = mid + 1;
//         }
//     }
//     return -1;
// }
// const arr1 = [1,2,3,5,7,9,11,12,14,16,17,18,20];
// const target1 = 12;
// console.log(binarySearch1(arr1, target1));
// 递归二分
// function binarySearch2(arr: number[], target: number, startIndex: number, endIndex: number) {
//     if (startIndex > endIndex) {
//         return -1;
//     }
//     if (startIndex === endIndex) {
//         return arr[startIndex] === target? startIndex : -1;
//     }
//     const midIndex = Math.floor((startIndex + endIndex) / 2);
//     if (arr[midIndex] === target) {
//         return midIndex;
//     } else if (arr[midIndex] > target) {
//         return binarySearch2(arr, target, startIndex, midIndex - 1);
//     } else {
//         return binarySearch2(arr, target, midIndex + 1, endIndex);
//     }
// }

// 找出递增数组中和为 n 的两个元素
// function findTwoSum(arr: number[], n: number) {
//     let left = 0, right = arr.length - 1;
//     const obj: Record<number, number> = {};
//     while (left < right) {
//         if (arr[left] + arr[right] === n) {
//             obj[arr[left]] = arr[right];
//             left++;
//             right--;
//         } else if (arr[left] + arr[right] > n) {
//             right--;
//         } else {
//             left++;
//         }
//     }
//     return obj;
// }
// const arr = [1,2,4,7,11,14,15,16,17];
// console.log(findTwoSum(arr, 19));

// ---------------------------------------------------------------------------------

// export class TreeNode<T> {
//     value: T;
//     left: TreeNode<T> | null;
//     right: TreeNode<T> | null;

//     constructor(value: T) {
//         this.value = value;
//         this.left = null;
//         this.right = null;
//     }
// }
/**
 * 二叉树前序遍历
 * @param node tree node 
 */
// export function preOrderTraverse<T>(node: TreeNode<T> | null): T[] {
//     const result: T[] = [];

//     function traverse(node: TreeNode<T> | null) {
//         if (node !== null) {
//             result.push(node.value);
//             traverse(node.left);
//             traverse(node.right);
//         }
//     }

//     traverse(node);
//     return result;
// }
/**
 * 二叉树中序遍历
 * @param node tree node
 */
// export function inOrderTraverse<T>(node: TreeNode<T> | null): T[] {
//     const result: T[] = [];

//     function traverse(node: TreeNode<T> | null) {
//         if (node !== null) {
//             traverse(node.left);
//             result.push(node.value);
//             traverse(node.right);
//         }
//     }

//     traverse(node);
//     return result;
// }
/**
 * 二叉树后序遍历
 * @param node tree node
 */
// export function postOrderTraverse<T>(node: TreeNode<T> | null): T[] {
//     const result: T[] = [];

//     function traverse(node: TreeNode<T> | null) {
//         if (node !== null) {
//             traverse(node.left);
//             traverse(node.right);
//             result.push(node.value);
//         }
//     }

//     traverse(node);
//     return result;
// }
/**
 * 寻找 bst 里第 k 小值
 *  bst 不平衡就相当于链表了
 */
// export function getKthValue<T>(node: TreeNode<T>, k: number) {
//     const res = inOrderTraverse(node);
//     return res[k - 1] || null;
// }

/**
 * 斐波那契函数
 * 青蛙跳台阶问题相同
 * 递归大量重复计算，时间复杂度O(2^n)
 * @param n 
 * @returns 
 */
// function fibonacci1(n: number): number {
//     if (n <= 1) {
//         return n;
//     }
//     return fibonacci1(n - 1) + fibonacci1(n - 2);
// }
// export function fibonacci2(n: number): number {
//     if (n <= 1) {
//         return n;
//     }
//     let n1 = 1, n2 = 0, res = 0;
//     for (let i = 2; i <= n; i++) {
//         res = n1 + n2;
//         n2 = n1;
//         n1 = res;
//     }
//     return res;
// }

/**
 * 将数组中的 0 移动到末尾
 * 如果不需要再原数组操作，可以遍历数组，将 0 放到另一个数组，将非 0 放到另一个数组，最后 concat
 */
// function moveZeroes1(arr: number[]): number[] {
//     const length = arr.length;
//     let zeroLength = 0;
//     for (let i = 0; i < length - zeroLength; i++) {
//         if (arr[i] === 0) {
//             arr.splice(i, 1);
//             arr.push(0);
//             i--;
//             zeroLength++;
//         }
//     }
//     return arr;
// }
// const arr = [1,0,0,3,0,11,0];
// console.log(moveZeroes1(arr));
// function moveZeroes2(arr: number[]): number[] {
//     let i, j = -1;
//     for (i = 0; i < arr.length; i++) {
//         if (arr[i] === 0 && j === -1) {
//             j = i;
//         }
//         if (arr[i] !== 0 && j !== -1) {
//             const n = arr[i];
//             arr[i] = arr[j];
//             arr[j] = n;
//             j++;
//         }
//     }
//     return arr;
// }
// console.log(moveZeroes2(arr));

/**
 * 字符串中连续最多的字符以及次数
 * 还是用双指针比较好
 */
// function maxConsecutive1(str: string): { str: string, num: number} {
//     if (str.length === 0) {
//         return { str: '', num: 0 };
//     }
//     const map: Record<string, number> = {};
//     const res = {
//         str: '',
//         num: 0,
//     };
//     for (let i = 0, j = 0; i < str.length; i++) {
//         if (map[str[i]] === undefined) {
//             map[str[i]] = 1;
//         } else {
//             map[str[i]]++;
//         }
//         if (map[str[i]] > res.num) {
//             res.str = str[i];
//             res.num = map[str[i]];
//         }
//     }
//     return res;
// }
// const str = 'abbcccddeeee1234';
// console.log(maxConsecutive1(str));
// function maxConsecutive2(str: string): { str: string, num: number} {
//     const res = {
//         str: '',
//         num: 0,
//     };
//     const length = str.length;
//     if (length === 0) {
//         return res;
//     }

//     let tempLength = 0, i = 0, j = 0;
//     for(;i < length; i++) {
//         if (str[i] === str[j]) {
//             tempLength++;
//         }

//         if (str[i] !== str[j] || i === length - 1) {
//             if (tempLength > res.num) {
//                 res.str = str[j];
//                 res.num = tempLength;
//             }
//             tempLength = 0;
//             if (i < length - 1) {
//                 j = i;
//                 i--;
//             }
//         }
//     }
//     return res;
// }


/**
 * 快排
 * 找到中间位置，遍历数组，小的放 left，大的放 right，继续递归，最后拼接
 * @param arr 
 */
// function quickSort1(arr: number[]): number[] {
//     if (arr.length <= 1) {
//         return arr;
//     }
//     let midIndex = Math.floor(arr.length / 2);
//     let midValue = arr.slice(midIndex, midIndex + 1)[0];
//     let left: number[] = [];
//     let right: number[] = [];
//     for (let i = 0; i < arr.length; i++) {
//         if (i !== midIndex) {
//             if (arr[i] < midValue) {
//                 left.push(arr[i]);
//             } else {
//                 right.push(arr[i]);
//             }
//         }
//     }
//     return quickSort1(left).concat([midValue],quickSort1(right));
// }
// const arr = [1,6,2,7,3,8,4,9,5];
// console.log(quickSort1(arr));

/**
 * 求 1- 10000 之间的所有对称数
 * 还可以通过数学求余比较
 */
// function getSymmetry1(n: number): number[] {
//     const res: number[] = [];
//     if (n <= 0) {
//         return res;
//     }
//     for (let i = 1; i <= n; i++) {
//         const str = i.toString();
//         if (str === str.split('').reverse().join('')) {
//             res.push(i);
//         }
//     }
//     return res;
// }
// function getSymmetry2(n: number): number[] {
//     const res: number[] = [];
//     if (n <= 0) {
//         return res;
//     }
//     for (let i = 1; i <= n; i++) {
//         const str = i.toString();
//         let flag = true;
//         for (let j = 0; j < str.length; j++) {
//             if (str[j] !== str[str.length - 1 - j]) {
//                 flag = false;
//                 break;
//             }
//         }
//         if (flag) {
//             res.push(i);
//         }
//     }
//     return res;
// }
// console.log(getSymmetry2(300));

/**
 * 数字千分位格式化
 */
// function formatNumber(num: number): string {
//     const str = num.toString();
//     const parts = str.split('.');
//     const integerPart = parts[0];
//     const decimalPart = parts.length > 1 ? '.' + parts[1] : '';

//     const length = integerPart.length;
//     if (length <= 3) {
//         return str + decimalPart;
//     }

//     let res = '';
//     let sign = '';
//     if (integerPart[0] === '-') {
//         sign = '-';
//         for (let i = length - 1; i >= 1; i--) {
//             res = integerPart[i] + res;
//             if ((length - i) % 3 === 0) {
//                 res = ',' + res;
//             }
//         }
//     } else {
//         for (let i = length - 1; i >= 0; i--) {
//             res = integerPart[i] + res;
//             if ((length - i) % 3 === 0 && i !== 0) {
//                 res = ',' + res;
//             }
//         }
//     }

//     return sign + res + decimalPart;
// }
// console.log(formatNumber(-10234567.89));

/**
 * 切换字母大小写
 * @param str 
 * @returns 
 */
// export function toggleCase1(str: string): string {
//     let res = '';
//     let length = str.length;
//     if (length === 0) {
//         return res;
//     }
//     const reg1 = /[a-z]/;
//     const reg2 = /[A-Z]/;
//     for (let i = 0; i < length; i++) {
//         const char = str[i];
//         if (reg1.test(char)) {
//             res += char.toUpperCase();
//         } else if (reg2.test(char)) {
//             res += char.toLowerCase();
//         } else {
//             res += char;
//         }
//     }
//     return res;
// }
// export function toggleCase2(str: string) {
//     let res = '';
//     let length = str.length;
//     if (length === 0) {
//         return res;
//     }
//     for (let i = 0; i < length; i++) {
//         const char = str[i];
//         // ASCII
//         const code = char.charCodeAt(0);
//         if (code >= 65 && code <= 90) {
//             res += char.toLowerCase();
//         } else if (code >= 97 && code <= 122) {
//             res += char.toUpperCase();
//         } else {
//             res += char;
//         }
//     }
//     return res;
// }
// console.log(toggleCase2('123AbcdEF45'));
