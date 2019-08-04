import React, {Component} from 'react';
import {custom} from '../../../example/assets/json/data';
import '../../assets/styles/D3Two.css';
import * as Graph from '../../../src';

export default class exampleTwo extends Component {

    componentDidMount() {
        let rectangle = new Graph.Svg(custom, 400, 400);
        let circle = new Graph.Svg(custom, 400, 400);
        rectangle.initRectGraph('.first-child', 10, 20);
        circle.initCircleGraph('.second-child', 8);
    }

    render() {
        return (
            <div className="container-grid">
                <div className="first-child"/>
                <div className="second-child"/>
            </div>
        );
    }

}