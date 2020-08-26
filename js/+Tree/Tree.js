const Tree = {
  findSubNode(node, id) {
    if (node.id && node.id == id) {
      return node;
    } else if (node.children != null) {
      var result = null;
      for (let i = 0; result == null && i < node.children.length; i++) {
        result = this.findSubNode(node.children[i], id);
      }
      return result;
    }
    return null;
  },
  findNode(tree, id) {
    var result = null;
    let i = 0;
    for (; result == null && i < tree.length; i++) {
      result = this.findSubNode(tree[i], id);
    }
    return [result, tree[i - 1]];
  },
  flattenNodes(node, flat = []) {
    flat.push(node);
    if (node.children)
      for (let i = 0; i < node.children.length; i++) {
        flat.concat(this.flattenNodes(node.children[i], flat));
      }
    flat.forEach((item) => {
      if (item.children) {
        for (let i = 0; i < item.children.length; i++) {
          item.children = [];
        }
      }
    });

    return flat;
  },
  flatten(treeConst) {
    var flat = [];
    var tree = [...treeConst];
    tree.forEach((item) => {
      if (Array.isArray(item)) {
        flat.push(...flatten(item));
      } else {
        //flat.push(item);
        if (item.children)
          for (let i = 0; i < item.children.length; i++) {
            flat.concat(...this.flattenNodes(item.children[i], flat));
          }
      }
    });

    flat.forEach((item) => {
      if (item.children) {
        for (let i = 0; i < item.children.length; i++) {
          item.children = [];
        }
      }
    });

    flat.map(({ id, parent, moves, conditionals }) => ({
      id,
      parent,
      moves,
      conditionals,
      children: [],
    }));

    return flat;
  },
  findPathToNode(tree, end) {
    let queue = [end];
    let visitedNodes = new Set();
    let path = [];
    while (queue.length > 0) {
      path = queue.shift();
      let currentNode = path;
      if (currentNode === undefined) {
        return null;
      } else if (currentNode.id == end.id) {
        return path;
      } else if (!visitedNodes.has(currentNode)) {
        visitedNodes.add(currentNode);
        //route.push(currentNode.id);
      }
    }
  },
};
