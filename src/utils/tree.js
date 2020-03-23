export const traverse = (treeData, handler, childrenName = 'children') => {
    if (!treeData) {
        return;
    }
    if (typeof handler !== 'function') {
        return;
    }
    const queue = [];
    const makeQueueData = (node, level) => ({ node, level });

    if (treeData instanceof Array) {
        const queueDataList = treeData.map(node => makeQueueData(node, 1));

        queue.push(...queueDataList);
    } else {
        const queueData = makeQueueData(treeData, 1);

        queue.push(queueData);
    }

    while(queue.length) {
        const { node, level } = queue.shift();

        // 明确返回false时，中断遍历
        if (handler(node, level) === false) {
            return;
        }

        const childList = node[childrenName];

        if (childList && childList.length) {
            childList.forEach(child => queue.push(makeQueueData(child, level + 1)));
        }
    }
};

// 获取符合条件的第一个树节点
export const getTreeNode = (tree, predicate) => {
    let treeNode = null;

    traverse(tree, (node) => {
        if (predicate(node)) {
            treeNode = node;
            return false;
        }
    }, 'children');

    return treeNode;
};