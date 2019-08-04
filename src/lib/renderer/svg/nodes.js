import * as d3 from "d3";

export default class Nodes {
    nodes;
    simulation;

    constructor(nodes, simulation) {
       this.nodes = nodes;
        this.simulation = simulation;
        this.nodes.call(d3.drag()
            .on('start', (d) => dragStart(d, this))
            .on('drag', (d) => drag(d, this))
            .on('end', (d) => dragEnd(d, this)));
    }

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

    setClassName(className) {
        this.nodes.attr("class", className);
    }
}

const dragStart = (d, that) => {
    if (!d3.event.active) that.simulation.alphaTarget(0.3).restart();
    d.fx = d.x;
    d.fy = d.y;
};

const drag = (d) => {
    d.fx = d3.event.x;
    d.fy = d3.event.y;
};

const dragEnd = (d, that) => {

    if (!d3.event.active) that.simulation.alphaTarget(0);
    d.fx = null;
    d.fy = null;
};
