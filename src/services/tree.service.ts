/* tslint:disable */
/**
 * 将数组转化为tree型结构, 根节点为0
 *
 * @export
 * @param {any} nodes
 * @param {any} id
 * @param {any} pId
 * @param {any} sortKey 排序字段
 * @param {any} label 转换成符合antd的treeSelect组件的数据源
 * @returns
 */
export const array2tree = (
  arr: any,
  id: any,
  pId: any,
  sortKey: any,
  label: any,
  name?: any
) => {
  const map = {};
  const roots: any[] = [];
  // 深拷贝数组
  const nodes = arr.map((v: any) => ({ ...v }));

  // 将键值对存储于map,避免通过遍历数组查找父节点
  nodes.forEach((v: any, i: any) => {
    map[v[id]] = i;
  });

  nodes.forEach((node: any) => {
    if (!Array.isArray(node.children)) {
      node.children = [];
    }

    if (node[pId] !== 0 && node[pId] !== '0') {
      // 非根节点
      let parent = nodes[map[node[pId]]];

      if (!parent) {
        return;
      }

      if (!Array.isArray(parent.children)) {
        parent.children = [];
      }

      parent.children.push(node);
    } else {
      // 根节点
      roots.push(node);
    }
  });

  if (sortKey) {
    sort(roots, sortKey);
  }

  if (label || name) {
    return [
      {
        id: 0,
        key: '0',
        value: '0',
        label: '所有',
        name: '所有',
        children: convert(roots, id, pId, label, name)
      }
    ];
  }

  return roots;
};

/**
 * 转换成符合antd的treeSelect组件的数据源
 *
 * @export
 * @param {any} nodes
 * @param {any} id
 * @param {any} pId
 * @param {any} label
 * @returns
 */
export const convert = (
  nodes: any,
  id: any,
  pId: any,
  label: any,
  name: any
) => {
  return nodes.map((node: any) => {
    node['id'] = node[id];
    node['pId'] = node[pId];
    node['value'] = node['key'] = node[id].toString();
    node['label'] = node[label];
    node['name'] = node[name];

    if (node.children && node.children.length > 0) {
      node.children = convert(node.children, id, pId, label, name);
    }

    return node;
  });
};

/**
 * 排序
 *
 * @export
 * @param {any} nodes
 * @param {any} sortKey
 * @returns
 */
export const sort = (nodes: any, sortKey: any) => {
  if (!Array.isArray(nodes) || nodes.length === 0) {
    return [];
  }

  nodes.sort((node1, node2) => {
    const a = node1[sortKey] || 9999;
    const b = node2[sortKey] || 9999;

    return a - b;
  });

  nodes.forEach(node => {
    node.children && node.children.length > 0 && sort(node.children, sortKey);
  });

  return nodes;
};

export default {
  array2tree
};
