import * as d3 from "d3";


const dragStart = Symbol('dragStart');
const drag = Symbol('drag');
const dragEnd = Symbol('dragEnd');
const nodesDragAction = Symbol('nodesDragAction');
// const setStyle = Symbol('setStyle');

export default class Nodes {
    nodes;
    #nodeLabel;
    #simulation;
    #graph;
    styles = {
        nodes: [],
        nodeLabel: [],
        fontSize: 10,
        fontColor: '#000',
    };

    constructor(simulation, graph) {
        this.#graph = graph;
        this.nodes = graph
            .selectAll('.nodeGroup');
        this.#simulation = simulation;
        this.#nodeLabel = this.nodes.select('text');
        this[nodesDragAction]();
    }

    [nodesDragAction]() {
        this.nodes.call(d3.drag()
            .on('start', (d) => this[dragStart](d), {capture: true})
            .on('drag', (d) => this[drag](d)), {capture: true});
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

    setNodes(graph) {
        this.nodes = graph
            .selectAll('.nodeGroup');
        this.#nodeLabel = this.nodes.select('text');
        this[nodesDragAction]();
        this.setStyle();
    }

    onClick(listener) {
        this.nodes.on('click', listener)
    }


    onMouseOver(listener) {
        this.nodes.on('mouseover', listener)
    }

    setStyle() {
        const {nodes, nodeLabel, fontSize, fontColor} = this.styles;
        nodes.forEach((nodeStyle, index) => {
            this.nodes.attr(nodeStyle.name, nodeStyle.value)
        });

        nodeLabel.forEach((nodeLabelStyle) => {
            this.#nodeLabel.attr(nodeLabelStyle.name, nodeLabelStyle.value)
        });

        this.#nodeLabel.style("font-size", fontSize + 'px');

        this.#nodeLabel.attr('fill', fontColor);

        this.setNodeColorBaseOnLevels();
    }

    // setClassName(className) {
    //     this.nodes.attr("class", className);
    // }
    //
    // fillRandomColor() {
    //     const colors = d3.scaleOrdinal(d3.schemeCategory10);
    //     this.nodes.style("fill", function (d, i) {
    //         return colors(i);
    //     })
    // }

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

}