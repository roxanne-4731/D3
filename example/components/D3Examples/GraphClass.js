import React, {Component} from 'react';
import {custom, custom2} from '../../../example/assets/json/data';
import '../../assets/styles/D3Two.css';
import * as Graph from '../../../src';

export default class exampleTwo extends Component {

    componentDidMount() {
        // let rectangle = new Graph.svgRenderer(custom, 600, 500);
        let circle = new Graph.svgRenderer(custom2, 400, 600);
        // let getRect = rectangle.renderRectGraph('.first-child', 40, 100);
        let getCircle = circle.renderCircleGraph('.second-child', 20);
        // getCircle.links.setFontColor('red');
        // getCircle.nodes.setFontSize(10);
        // getCircle.nodes.setFontColor('green');
        // getCircle.nodes.setTextAttr([{name:'class', value: 'textNodes'}]);
    }

    render() {
        return (
            <div className="container-grid">
                {/*<div className="first-child"/>*/}
                <div className="second-child"/>
            </div>
        );
    }

}