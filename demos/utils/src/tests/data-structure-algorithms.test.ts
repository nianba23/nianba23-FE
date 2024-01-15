import { TreeNode, getKthValue } from '../data-structure-algorithms';

describe('二叉树搜索', () => {
    const root = new TreeNode(5);
    root.left = new TreeNode(3);
    root.right = new TreeNode(7);
    root.left.left = new TreeNode(2);
    root.left.right = new TreeNode(4);
    root.right.left = new TreeNode(6);
    root.right.right = new TreeNode(8);

    it('正常情况', () => {
        const res = getKthValue(root, 3);
        expect(res).toBe(4);
    });

    it('k 不再正常范围之内', () => {
        const res1 = getKthValue(root, 0)
        expect(res1).toBeNull()

        const res2 = getKthValue(root, 1000)
        expect(res2).toBeNull()
    });
});
