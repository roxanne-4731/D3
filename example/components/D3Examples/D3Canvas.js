import React, {Component} from 'react';
import {data} from '../../assets/json/data';
import '../../assets/styles/D3Two.css';
 // import * as d3Functions from '../../../src/Canvas/d3Canvas';
import Canvas from './../../../src/Canvas/Canvas';
export default class exampleTwo extends Component {
    componentDidMount() {
        // d3Functions.canvasBase(data);
        let canvas = new Canvas(data, "#graphDiv", 5);
    }

    render() {
        return (
            <div className="container">
                <div id="graphDiv"/>
            </div>
        );
    }
}