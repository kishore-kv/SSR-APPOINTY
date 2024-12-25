import React, { Suspense } from 'react';
import './index.css'
import InnerApp from '../../layout/InnerApp.jsx';

export class App extends React.Component {
    constructor() {
        super();
    }
    render() {
        return (
             
         <InnerApp />
        );
    }
}
