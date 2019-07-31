import React, {Component} from 'react';
import {data} from '../../assets/json/data';
import '../../assets/styles/D3Two.css';
import * as d3Functions from '../../helpers/Canvas/d3Canvas';
import Graph from '../../../src/lib/renderer/canvas/graph';
export default class exampleTwo extends Component {
    componentDidMount() {
        // d3Functions.canvasBase(data);
        let canvas = new Graph(data, ".container", 5);
        canvas.zoom();
        canvas.drag();
    }

    render() {
        return (
            <div className="container">
            </div>
        );
    }
}