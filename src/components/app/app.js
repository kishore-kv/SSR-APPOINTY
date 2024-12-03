import React, { Suspense } from 'react';
import InnerApp from '../../InnerApp';
import { Provider } from 'react-redux';
import store from './store';

export class App extends React.Component {
    constructor() {
        super();
    }
    render() {
        return (
            <Provider store={store}>     
                        <InnerApp />
            </Provider>
        );
    }
}
