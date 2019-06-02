import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';

import { Modal, Alert, Spin } from 'antd';
import { modalUpdate } from '../actions/modal';

import '../style/main.less';

// 组件
import { Layout } from 'antd';
const { Content } = Layout;

function propMap(state) {
    return {
        modal: state.modal
    };
}

//封装组件
class LayoutPage extends Component {
    constructor(props) {
        super(props);
        this.handleTipClose = this.handleTipClose.bind(this);
    }
    render() {
        const {modal, children} = this.props;
        let $pageWarn = null;
        if(modal.pageWarn) {
            $pageWarn = (
                <Alert
                    className="m-b"
                    message={modal.pageWarn}
                    type="warning"
                    closable
                    onClose={() => this.handleTipClose({
                        pageWarn: ''
                    })}
                />
            );
        }
        return (
            <Spin spinning={modal.loading}>
                <div className="app-layout">
                    <Modal
                        title="提示信息"
                        visible={modal.modalTip ? true : false}
                        onCancel={() => this.handleTipClose({
                            modalTip: ''
                        })}
                        footer={null}
                    >
                        <p>{modal.modalTip}</p>
                    </Modal>
                    <Layout>
                        <Layout>
                            <Content style={{padding: 24, background: '#fff' }}>
                                {$pageWarn}
                                {children}
                            </Content>
                        </Layout>
                    </Layout>
                </div>
            </Spin>
        );
    }
    handleTipClose(data) {
        const {dispatch} = this.props;
        dispatch(modalUpdate(data));
    }
}

LayoutPage.propTypes = {
    modal: PropTypes.object.isRequired,
    children: PropTypes.object.isRequired,
    dispatch: PropTypes.func.isRequired
};

export default connect(propMap)(LayoutPage);