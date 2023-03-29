import React, { Suspense } from 'react'
// import {
//     BrowserRouter
// } from "react-router-dom";
// import RootProvider from "../../Context/RootProvider";
import InnerApp from "../InnerApp"

export class App extends React.Component {
    constructor() {
        super();
    }
    render() {
        return (<div>
                <InnerApp />
        </div>)
    }
}