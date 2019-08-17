import * as d3 from "d3";
import {neo4jTest, neo4jTree} from "../../../../example/assets/json/data";
import {SvgTree} from './svgTreeRenderer';
import * as Graph from "../../../index";


const dragStart = Symbol('dragStart');
const drag = Symbol('drag');
const dragEnd = Symbol('dragEnd');

export default class Nodes {
    nodes;
    #nodeLabel;
    #simulation;
    graph;
    #data;
    #nodeChildren;

    constructor(nodes, simulation, graph, data) {
        this.graph = graph;
        this.nodes = nodes;
        this.#simulation = simulation;
        this.#nodeLabel = this.nodes.select('text');
        this.#data = data;
        this.nodes.call(d3.drag()
            .on('start', (d) => this[dragStart](d), {capture: true})
            .on('drag', (d) => this[drag](d)), {capture: true})
        // .on('end', (d) => this[dragEnd](d)));
    }

    [dragStart](d) {
        if (!d3.event.active) this.#simulation.alphaTarget(0.3).restart();
        d.fx = d.x;
        d.fy = d.y;
    };

    [drag](d) {
        d.fx = d3.event.x;
        d.fy = d3.event.y;
    };

    // [dragEnd](d) {
    //
    //     if (!d3.event.active) this.#simulation.alphaTarget(0);
    //     d.fx = null;
    //     d.fy = null;
    // };


    onClick(listener) {

        this.nodes.on('click', listener)
    }

    onMouseOver(listener) {
        this.nodes.on('mouseover', listener)
    }

    setStyle(styles) {
        styles.forEach((style, index) => {
            this.nodes.attr(style.name, style.value)
        })
    }

    setTextAttrStyle(styles) {
        styles.forEach((style) => {
            this.#nodeLabel.attr(style.name, style.value)
        })
    }

    setFontSize(size) {
        this.#nodeLabel.style("font-size", size + 'px')
    }

    setFontColor(color) {
        this.#nodeLabel.attr('fill', color);
    }

    setClassName(className) {
        this.nodes.attr("class", className);
    }

    fillRandomColor() {
        const colors = d3.scaleOrdinal(d3.schemeCategory10);
        this.nodes.style("fill", function (d, i) {
            return colors(i);
        })
    }

    setNodeColorBaseOnLevels() {

        const colors = d3.scaleOrdinal(d3.schemeCategory10);

        this.nodes
            .style("fill", function (d, i) {
                return colors(d.data.level);
            });

        this.nodes.select('circle')
            .style("stroke", function (d, i) {
                return colors(d.data.level);
            })
            .attr('stroke-opacity', 0.7);
    }

    findNodeChildren(nodeId, data) {
        if (data.children) {
            if (data.id === nodeId) {
                this.#nodeChildren = data;
            }
            data.children.forEach((child) => {
                this.findNodeChildren(nodeId, child);
            });
        }
    }

    mapNodeChildrenToData(data) {
        if (this.#nodeChildren) {
            const {children, id, group, label, level} = this.#nodeChildren,
                {nodes, links} = data;
            const source = {id, group, label, level};

            children.forEach((item) => {
                const node = {id: item.id, group: item.group, label: item.label, level: item.level},
                    link = {target: node, source, strength: 0.7, type: "introduction"};
                nodes.push(node);
                links.push(link);
            });
        }
    }

}