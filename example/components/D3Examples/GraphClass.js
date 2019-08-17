import React, {Component} from 'react';
import {neo4j, neo4jTree} from '../../../example/assets/json/data';
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
        const graphStyle = [{name: 'background-color', value: '#1a4961'}];

        let graphTest = new Graph.svgGraphRenderer(neo4jTree, 504, 940);
        let getGraph = graphTest.renderCircleGraph('.second-child', 8);

        const {nodes, links} = getGraph;

        // set nodes styles
        nodes.setFontSize(10);
        nodes.setFontColor('#fff');
        nodes.setTextAttrStyle(nodeLabelStyle);
        nodes.setStyle(nodesStyle);
        nodes.setNodeColorBaseOnLevels();

        // set links styles
        links.setFontSize(10);
        links.setFontColor('#aaa');
        links.setStyle(linkStyle);
        links.setTextAttrStyle(linkLabelStyle);

        // set graph style
        getGraph.setStyle(graphStyle);
        // getGraph.setStyle(graphStyle);

    }

    render() {
        return (
            <div className="second-child"/>
        );
    }

}