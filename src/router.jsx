//加载依赖
import React from 'react';
import {Provider} from 'react-redux';
import { Router, Route, IndexRoute } from 'react-router';

import {store, history} from './store';

// 国际化
import zh_CN from 'antd/lib/locale-provider/zh_CN';
import 'moment/locale/zh-cn';
import { LocaleProvider } from 'antd';

import Layout from './pages/layout.jsx'; //PC框架
import NotFound from './pages/not_found.jsx'; //404
import Demo from './pages/demo.jsx';
import User from './pages/user_list.jsx';
import CustomTableList from './pages/custom_table_list.jsx';

export default (
    <LocaleProvider locale={zh_CN}>
        <Provider store={store}>
            <Router history={history}>
                <Route path="client" component={Layout}>
                    <IndexRoute component={NotFound} />
                    <Route path="demo" component={Demo} />
                    <Route path="user" component={User} />
                    <Route path="custom-list" component={CustomTableList} />
                    <Route path="*" component={NotFound} />
                </Route>
            </Router>
        </Provider>
    </LocaleProvider>
);