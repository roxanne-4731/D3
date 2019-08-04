import React, {Component} from 'react';
import {custom, custom2} from '../../../example/assets/json/data';
import '../../assets/styles/D3Two.css';
import * as Graph from '../../../src';

export default class exampleTwo extends Component {

    componentDidMount() {
        let rectangle = new Graph.svgRenderer(custom, 400, 400);
        let circle = new Graph.svgRenderer(custom2, 400, 400);
        let getRect = rectangle.initRectGraph('.first-child', 10, 20);
        let getCircle = circle.initCircleGraph('.second-child', 8);

        console.log('Rectangle ===> ', getRect);
        console.log('Circle ====> ', getCircle);
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