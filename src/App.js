import React, { Suspense } from 'react';
import { Provider } from 'mobx-react';
import { BrowserRouter, Switch } from 'react-router-dom';
import * as stores from '@/stores';
import routerConfig from './config/router';
import { basename } from './config/env';
import AdminRoute from './common/Route';
import AdminLayout from './common/AdminLayout';

export default () => {
    return (
        <Provider {...stores}>
            <BrowserRouter basename={basename}>
                <AdminLayout>
                    <Suspense fallback={null}>
                        <Switch>
                            {routerConfig.map((routerItem, index) => <AdminRoute {...routerItem} key={index} />)}
                        </Switch>
                    </Suspense>
                </AdminLayout>
            </BrowserRouter>
        </Provider>
    );
};
