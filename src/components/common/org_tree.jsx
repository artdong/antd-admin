import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

import TreeNode from './org_tree_node.js';

//组件
class OrgTree extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }

    componentDidMount() {
    }

    componentWillUnmount() {
    }

    render() {
        const { horizontal, collapsable, node } = this.props;
        return <div className="org-tree-container">
            <div className={classnames({
                'horizontal': horizontal,
                'collapsable': collapsable
            })}>
                <TreeNode 
                    node={node}
                    {...this.props}
                />
            </div>
        </div>;
    }
}

OrgTree.propTypes = {
    data: PropTypes.object,
    node: PropTypes.object,
    horizontal: PropTypes.bool,
    collapsable: PropTypes.bool,
    selectedKey: PropTypes.string,
    renderContent: PropTypes.func,
    labelWidth: PropTypes.oneOfType([PropTypes.string, PropTypes.func]),
    labelClassName: PropTypes.oneOfType([PropTypes.string, PropTypes.func]),
    selectedClassName: PropTypes.oneOfType([PropTypes.string, PropTypes.func])
};

OrgTree.defaultProps = {
    node: {
        label: 'label',
        expand: 'expand',
        children: 'children'
    }
};

export default OrgTree;