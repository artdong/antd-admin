//加载依赖
import React from 'react';
import { Provider } from 'react-redux';
import { Route, Router } from 'react-router';

import { store, history } from './store';

// 国际化
import zh_CN from 'antd/lib/locale-provider/zh_CN';
import 'moment/locale/zh-cn';
import { ConfigProvider } from 'antd';

import Layout from './pages/layout.jsx'; //PC框架
// import NotFound from './pages/not_found.jsx'; //404
import Demo from './pages/demo.jsx';
import User from './pages/user_list.jsx';
import CustomTableList from './pages/custom_table_list.jsx';
import Parent from './pages/parent.jsx';
import OrgTreeDemo from './pages/org_tree.jsx';

export default (
    <ConfigProvider locale={zh_CN}>
        <Provider store={store}>
            <Router history={history}>
                <Route component={Layout}>
                    <Route path="/demo" component={Demo} />
                    <Route path="/user" component={User} />
                    <Route path="/custom-list" component={CustomTableList} />
                    <Route path="/parent" component={Parent} />
                    <Route path="/org-tree" component={OrgTreeDemo} />
                    <Route path="*" component={User} />
                </Route>
            </Router>
        </Provider>
    </ConfigProvider>
);