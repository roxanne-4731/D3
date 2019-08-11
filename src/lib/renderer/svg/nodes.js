import * as d3 from "d3";


const dragStart = Symbol('dragStart');
const drag = Symbol('drag');
const dragEnd = Symbol('dragEnd');

export default class Nodes {
    nodes;
    #nodeLabel;
    #simulation;

    constructor(nodes, simulation) {
        this.nodes = nodes;
        this.#simulation = simulation;
        this.#nodeLabel = this.nodes.select('text');
        this.nodes.call(d3.drag()
            .on('start', (d) => this[dragStart](d))
            .on('drag', (d) => this[drag](d)));
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
}