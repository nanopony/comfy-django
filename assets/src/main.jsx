'use strict';

import React from "react";
import ReactDOM from "react-dom";
import "./main.less"

const App = () => <div className="test-style">It's alive!</div>;

ReactDOM.render(
    <App/>,
    document.getElementById("demo")
);