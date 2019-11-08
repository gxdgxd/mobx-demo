import React, { Suspense } from 'react';
import { BrowserRouter, Switch } from 'react-router-dom';
import routerConfig from './config/router';
import { basename } from './config/env';
import AdminRoute from './common/Route';
import AdminLayout from './common/AdminLayout';

export default () => {
    return (
        <BrowserRouter basename={basename}>
            <AdminLayout>
                <Suspense fallback={null}>
                    <Switch>
                        {routerConfig.map((routerItem, index) => <AdminRoute {...routerItem} key={index} />)}
                    </Switch>
                </Suspense>
            </AdminLayout>
        </BrowserRouter>
    );
};
