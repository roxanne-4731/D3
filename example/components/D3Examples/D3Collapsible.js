import React, {Component} from 'react';
import '../../assets/styles/D3Six.css'
import * as Graph from '../../../src';
import {neo4jTree} from '../../assets/json/data';


export default class Collapsible extends Component {
    componentDidMount() {
        let tree = new Graph.SvgTree(neo4jTree);
        tree.renderTree('.graph-tree');
    }


    render() {
        return (
            <div className="graph-tree"/>
            )
    }
};