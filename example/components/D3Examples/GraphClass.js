import React, {Component} from 'react';
import {neo4j} from '../../../example/assets/json/data';
import '../../assets/styles/D3Two.css';
import * as Graph from '../../../src';

export default class exampleTwo extends Component {

    componentDidMount() {
        const nodesStyle = [
            {name: 'stroke-opacity', value: 0.7},
            {name: 'stroke-width', value: 10},
            {name: 'cursor', value: 'pointer'}
        ];
        const nodeLabelStyle = [
            {name: 'text-anchor', value: 'middle'},
            {name: 'font-style', value: 'italic'},
            {name: 'overflow', value: 'hidden'},
            {name: 'white-space', value: 'nowrap'},
            {name: 'text-overflow', value: 'ellipsis'}
        ];
        const linkStyle = [
            {name: 'stroke', value: '#eee'},
            {name: 'stroke-opacity', value: .6},
            {name: 'stroke-width', value: 2}
            ];
        const linkLabelStyle = [
            {name: 'pointer-events', value: 'none'},
            {name: 'text-anchor', value: 'middle'}
        ];
        const linkMarkerStyle = [{}];
        const graphStyle = [{name: 'fill', value: 'red'}];

        let graphTest = new Graph.svgRenderer(neo4j, 640, 940);
        let getGraph = graphTest.renderCircleGraph('.second-child', 40);

        const {nodes, links} = getGraph;

        // set nodes styles
        nodes.fillRandomColor();
        nodes.setFontSize(10);
        nodes.setFontColor('#fff');
        nodes.setTextAttrStyle(nodeLabelStyle);
        nodes.setStyle(nodesStyle);

        // set links styles
        links.setFontSize(10);
        links.setFontColor('#aaa');
        links.setStyle(linkStyle);
        links.setTextAttrStyle(linkLabelStyle);

        // set graph style
        getGraph.setStyle(graphStyle);

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