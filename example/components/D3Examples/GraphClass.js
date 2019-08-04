import React, {Component} from 'react';
import {custom} from '../../../example/assets/json/data';
import '../../assets/styles/D3Two.css';
import * as Svg from '../../../src';

export default class exampleTwo extends Component {

    componentDidMount() {
        let svg = new Svg.Svg(custom, 500, 700);
        const nodes = svg.initCircleGraph('.container', 5);
        // nodes.setClassName('custom-nodes');
        // nodes.setNodesStyle([{name: 'fill', value: 'red'}, {name: 'stroke', value: 'green'}])
    }

    render() {
        return (
            <div className="container">
            </div>
        );
    }

}