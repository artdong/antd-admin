import React, {Component} from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { goBack } from 'react-router-redux';

import { Button, Icon } from 'antd';

//封装组件
class NotFound extends Component {
    constructor(props) {
        super(props);
        this.handleBackClick = this.handleBackClick.bind(this);
    }
    render() {
        return (
            <div className="app-info">
                <h1 className="app-info-title"><Icon type="frown" style={{'marginRight': 5}} />我们找不到这个页面</h1>
                <div className="app-info-msg">非常抱歉,我们暂时无法提供这个页面的访问.</div>
                <div className="app-info-btn">
                    <Button type="primary" size="large" icon="left-circle-o" onClick={this.handleBackClick}>
                        返回
                    </Button>
                </div>
            </div>
        );
    }
    handleBackClick() {
        const {dispatch} = this.props;
        dispatch(goBack());
    }
}

NotFound.propTypes = {
    dispatch: PropTypes.func.isRequired
};

export default connect()(NotFound);