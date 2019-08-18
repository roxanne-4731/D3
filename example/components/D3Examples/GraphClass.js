import React, {Component} from 'react';
import {neo4j, neo4jTree} from '../../../example/assets/json/data';
import '../../assets/styles/D3Two.css';
import * as Graph from '../../../src';

export default class exampleTwo extends Component {

    componentDidMount() {
        const nodesStyle = {
            nodes: [
                {name: 'stroke-opacity', value: 0.7},
                {name: 'stroke-width', value: 10},
                {name: 'cursor', value: 'pointer'}
            ],
            nodeLabel: [
                {name: 'text-anchor', value: 'middle'},
                {name: 'font-style', value: 'italic'},
            ],
            fontSize: 10,
            fontColor: '#c6ffe5'
        };

        const linksStyle = {
            links: [
                {name: 'stroke', value: '#eee'},
                {name: 'stroke-opacity', value: .6},
                {name: 'stroke-width', value: 2}
            ],
            linkLabel: [
                {name: 'pointer-events', value: 'none'},
                {name: 'text-anchor', value: 'middle'}
            ],
            fontSize: 10,
            fontColor: '#ff6f00'
        };

        let graphTest = new Graph.svgGraphRenderer(neo4jTree, 504, 940);
        let getGraph = graphTest.renderCircleGraph('.second-child', 8);

        const {nodes, links} = getGraph;

        nodes.styles = nodesStyle;
        nodes.setStyle();

        links.styles = linksStyle;
        links.setStyle();
    }

    render() {
        return (
            <div className="second-child"/>
        );
    }

}