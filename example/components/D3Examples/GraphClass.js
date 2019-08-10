import React, {Component} from 'react';
import {custom, custom2, neo4j} from '../../../example/assets/json/data';
import '../../assets/styles/D3Two.css';
import * as Graph from '../../../src';

export default class exampleTwo extends Component {

    componentDidMount() {
        // let rectangle = new Graph.svgRenderer(custom, 600, 500);
        let circle = new Graph.svgRenderer(neo4j, 640, 940);
        // let getRect = rectangle.renderRectGraph('.first-child', 40, 100);
        let getCircle = circle.renderCircleGraph('.second-child', 30);
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