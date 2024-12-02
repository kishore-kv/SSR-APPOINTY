import React, { Suspense } from 'react'
import InnerApp from '../../InnerApp';
import { Provider } from 'react-redux';
 import store from './store'
 import {BrowserRouter} from "react-router-dom";
// import RootProvider from "../../Context/RootProvider";

export class App extends React.Component {
    constructor() {
        super();
    }
    render() {
        return (<Provider store={store}>
            <BrowserRouter>
                <Suspense
                  fallback={
                    <div className="pt-3 text-center">
                      <span>Loading...</span> 
                    </div>
                  }
                >
                  <InnerApp />
                </Suspense>
            </BrowserRouter>
          </Provider>
          )
    }
}