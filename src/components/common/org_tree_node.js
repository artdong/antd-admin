import React from 'react';

// 判断是否叶子节点
const isLeaf = (data, prop) => {
    const node = prop.node;
    return !(Array.isArray(data[node.children]) && data[node.children].length > 0);
};
  
// 创建 node 节点
export const renderNode = (data, prop) => {
    const node = prop.node;
    const cls = ['org-tree-node'];
    const childNodes = [];
  
    if (isLeaf(data, prop)) {
        cls.push('is-leaf');
    } else if (prop.collapsable && !data[node.expand]) {
        cls.push('collapsed');
    }
  
    childNodes.push(renderLabel(data, prop));
  
    if (!prop.collapsable || data[node.expand]) {
        childNodes.push(renderChildren(data.children, prop));
    }
  
    return React.createElement('div', {
        key: data.id,
        className: cls.join(' ')
    }, childNodes);
};
  
// 创建展开折叠按钮
export const renderBtn = (data, prop ) => {
    // const { listeners } = prop;
    // const expandHandler = listeners['on-expand'];
  
    let cls = ['org-tree-node-btn'];
  
    if (data[prop.expand]) {
        cls.push('expanded');
    }
  
    return React.createElement('span', {
        className: cls.join(' '),
        // on: {
        //     click: e => expandHandler && expandHandler(e, data)
        // }
    });
};
  
// 创建 label 节点
export const renderLabel = (data, prop) => {
    const node = prop.node;
    // const { listeners } = prop;
    const label = data[node.label];
    const renderContent = prop.renderContent;
    // const clickHandler = listeners['on-node-click'];
  
    const childNodes = [];
    if (typeof renderContent === 'function') {
        let vnode = renderContent(data);
  
        vnode && childNodes.push(vnode);
    } else {
        childNodes.push(label);
    }
  
    if (prop.collapsable && !isLeaf(data, prop)) {
        childNodes.push(renderBtn(data, prop));
    }
  
    const cls = ['org-tree-node-label-inner'];
    let { labelWidth, labelClassName, selectedClassName, selectedKey } = prop;
  
    if (typeof labelWidth === 'number') {
        labelWidth += 'px';
    }
  
    if (typeof labelClassName === 'function') {
        labelClassName = labelClassName(data);
    }
  
    labelClassName && cls.push(labelClassName);
  
    // add selected class and key from props
    if (typeof selectedClassName === 'function') {
        selectedClassName = selectedClassName(data);
    }
  
    selectedClassName && selectedKey && data[selectedKey] && cls.push(selectedClassName);
  
    return React.createElement('div', {
        className: 'org-tree-node-label',
    }, [React.createElement('div', {
        className: cls.join(' '),
        style: { width: labelWidth },
        // on: {
        //     click: e => clickHandler && clickHandler(e, data)
        // }
    }, childNodes)]);
};
  
// 创建 node 子节点
export const renderChildren = (list, prop) => {
    if (Array.isArray(list) && list.length) {
        const children = list.map(item => {
            return renderNode(item, prop);
        });
  
        return React.createElement('div', {
            className: 'org-tree-node-children'
        }, children);
    }
    return '';
};
  
export const render = (props) => {
    return renderNode(props.data, props);
};
  
export default render;
  