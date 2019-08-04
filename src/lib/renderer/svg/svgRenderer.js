import Base from '../base';
import Nodes from './nodes';
import * as d3 from "d3";
import {custom} from "../../../../example/assets/json/data";
import '../../../styles/nodesSvgGraph.css';

export class svgRenderer extends Base {

    graphSvg;
    simulation;

    constructor(data, height, width) {
        super(data, height, width);
    }

    initCircleGraph(selector, radius) {
        let nodes, links;
        init(this, selector);
        nodes = createNodes(this, "circle");
        links = createLinks(this);
        nodes.attr("cx", function (d) {
            return d.x
        })
            .attr("cy", function (d) {
                return d.y
            })
            .attr("r", radius);

        this.simulation.on("tick", () => {
            tickedAction(this, nodes, links, 'circle')
        });

        // return new Nodes(this.node, this.simulation);
    }

    initRectGraph(selector, height, width) {
        let nodes, links;
        init(this, selector);
        nodes = createNodes(this, "rect");
        links = createLinks(this);
        nodes.attr('width', width)
            .attr('height', height)
            .attr("x", function (d) {
                return d.x
            })
            .attr("y", function (d) {
                return d.y
            });

        this.simulation.on("tick", () => {
            tickedAction(this, nodes, links, 'rect')
        });
        // return new Nodes(this.node, this.simulation);
    }
}

function init(that, selector) {
    that.graphSvg = d3.select(selector).append('svg')
        .attr("width", that.width)
        .attr("height", that.height);
    simulateGraph(that);

}

function simulateGraph(that) {
    that.simulation = d3.forceSimulation(that.data.nodes)
        .force("charge", d3.forceManyBody().strength(-20))
        .force("link", d3.forceLink(that.data.links).id(function (d) {
            return d.id
        }).distance(200))
        .force("x", d3.forceX(that.width / 2))
        .force("y", d3.forceY(that.height / 2));
}

function createNodes(that, type) {

    return that.graphSvg.selectAll(".node")
        .data(custom.nodes)
        .enter().append(type)
        .attr("class", "nodes")
}

function createLinks(that) {
    return that.graphSvg.selectAll(".link")
        .data(custom.links)
        .enter().append("line")
        .attr("class", "link")
        .attr('stroke', '#E5E5E5');
}

function tickedAction(that, node, link, type) {

    link
        .attr("x1", function (d) {
            return d.source.x;
        })
        .attr("y1", function (d) {
            return d.source.y;
        })
        .attr("x2", function (d) {
            return d.target.x;
        })
        .attr("y2", function (d) {
            return d.target.y;
        });
    node
        .attr(type === 'rect' ? "x" : "cx", function (d) {
            return d.x;
        })
        .attr(type === 'rect' ? "y" : "cy", function (d) {
            return d.y;
        });

    that.graphSvg.call(d3.zoom()
        .scaleExtent([1 / 2, 8])
        .on("zoom", () => zoomed(node, link)));
}

function zoomed(node, link) {
    node.attr("transform", d3.event.transform);
    link.attr("transform", d3.event.transform);
}
