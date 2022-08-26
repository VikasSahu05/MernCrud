import React from 'react';
import {Switch } from 'react-router';
import {Route} from 'react-router-dom';
import About from "./About";
import Contact from "./Contact";
const RouterApp = ()=>{
    return (
    <>
        <h1>Hello Routers</h1>
        <About/>
        
        <Contact/>
    </>
    );
};

export default RouterApp;