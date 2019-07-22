import React, {Component} from 'react';
import {data} from '../../Assets/json/data';
import '../../Styles/D3Two.css';
import * as d3Functions from '../../d3';

export default class exampleTwo extends Component {
    componentDidMount() {
        d3Functions.canvasBase(data);
    }

    render() {
        return (
            <div className="container">
                <div id="graphDiv"/>
            </div>
        );
    }
}