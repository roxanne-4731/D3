import Base from '../base';
import Nodes from './nodes';
import Links from './links';
import Graph from './svgGraph';
import * as d3 from "d3";
import '../../../styles/graphStyle.css';

let rectHeight = 0;
let rectWidth = 0;

const createElements = Symbol('createElements');
const createNodes = Symbol('createNodes');
const createLinks = Symbol('createLinks');
const createLinkLabel = Symbol('createLinkLabel');
const createLinkPath = Symbol('createLinkPath');
const createNodeLabel = Symbol('createNodeLabel');
const createMarker = Symbol('createMarker');
const init = Symbol('init');
const render = Symbol('render');
const simulateGraph = Symbol('simulateGraph');
const tickedAction = Symbol('tickedAction');
const zoomed = Symbol('zoomed');

export class svgRenderer extends Base {

    graphSvg;
    simulation;
    nodes;
    links;
    nodeLabel;
    linkLabel;
    linkPath;

    constructor(data, height, width) {
        super(data, height, width);
    }

    [createElements](type) {
        this[createNodes](type);
        this[createNodeLabel]();
        this[createMarker]();
        this[createLinks]();
        this[createLinkLabel]();
        this[createLinkPath]();
    }

    [createNodes](type) {
        this.nodes = this.graphSvg
            .append("g")
            .attr("class", "nodes")
            .selectAll(".node")
            .data(this.data.nodes)
            .enter()
            .append("g")
            .attr('class', 'nodeGroup')
            .append(type)
            .attr("class", "node")
    }

    [createLinks]() {
        this.links = this.graphSvg
            .append("g")
            .attr("class", "links")
            .selectAll(".link")
            .data(this.data.links)
            .enter()
            .append("g")
            .attr('class', 'linkGroup')
            .append("line")
            .attr("class", "link")
            .attr("marker-end", "url(#end)");
    }

    [createLinkPath]() {
        this.linkPath = this.graphSvg.selectAll(".edgepath")
            .data(this.data.links)
            .enter()
            .append('path')
            .attr('class', 'edgepath')
            .attr('id', function (d, i) {
                return 'edgepath' + i
            })
            .attr('fill-opacity', 0)
            .attr('stroke-opacity', 0)
            .attr('pointer-events', 'none');
    }

    [createLinkLabel]() {
        this.linkLabel = this.graphSvg.selectAll(".edgelabel")
            .data(this.data.links)
            .enter()
            .append('text')
            .attr('class', 'edgelabel')
            .attr('id', function (d, i) {
                return 'edgelabel' + i
            })
            .attr('font-size', 10)
            .attr('fill', '#aaa')
            .attr('pointer-events', 'none');

        this.linkLabel.append('textPath')
            .attr('xlink:href', function (d, i) {
                return '#edgepath' + i
            })
            .attr("text-anchor", "middle")
            .attr("pointer-events", "none")
            .attr("startOffset", "50%")
            .text(function (d) {
                return d.type
            });
    }

    [createNodeLabel]() {
        this.nodeLabel = this.graphSvg
            .selectAll('.nodeGroup')
            .append('text')
            .attr('class', 'text')
            .attr("x", function (d) {
                return d.x
            })
            .attr("y", function (d) {
                return d.y
            })
            .text(function (d) {
                return d.label
            });
    }

    [createMarker]() {
        this.graphSvg.append("svg:defs").selectAll("marker")
            .data(["end"])      // Different link/path types can be defined here
            .enter().append("svg:marker")    // This section adds in the arrows
            .attr("id", String)
            .attr("viewBox", "0 -5 10 10")
            .attr("refX", 15)
            .attr("refY", 0.5)
            .attr("markerWidth", 10)
            .attr("markerHeight", 10)
            .attr("orient", "auto")
            .attr('fill', 'red')
            .append("svg:path")
            .attr("d", "M0,-5L10,0L0,5");
    }

    [init](selector) {
        this.graphSvg = d3.select(selector).append('svg')
            .attr("width", this.width)
            .attr("height", this.height)
            .append("g");
        this[simulateGraph]();
    }

    [render](type) {
        this.simulation.on("tick", () => {
            this[tickedAction](type)
        });

        return {
            graph: new Graph(this.graphSvg),
            nodes: new Nodes(this.nodes, this.nodeLabel, this.simulation),
            links: new Links(this.links, this.simulation)
        };
    }

    [simulateGraph]() {
        this.simulation = d3.forceSimulation(this.data.nodes)
            .force("charge", d3.forceManyBody().strength(-20))
            .force("link", d3.forceLink(this.data.links).id(function (d) {
                return d.id
            }).distance(400))
            .force("x", d3.forceX(this.width / 2))
            .force("y", d3.forceY(this.height / 2))
            .force("collide", d3.forceCollide())
            .force('center', d3.forceCenter(this.width / 2, this.height / 2));

    }

    [tickedAction](type) {
        this.links
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

        this.nodes
            .attr(type === 'rect' ? "x" : "cx", function (d) {
                return d.x;
            })
            .attr(type === 'rect' ? "y" : "cy", function (d) {
                return d.y;
            });

        this.nodeLabel
            .attr("x", function (d) {
                return type === 'rect' ? d.x + rectWidth / 2 : d.x;
            })
            .attr("y", function (d) {
                return type === 'rect' ? d.y + rectHeight / 2 : d.y;
            });

        this.linkPath.attr('d', function (d) {
            return 'M ' + d.source.x + ' ' + d.source.y + ' L ' + d.target.x + ' ' + d.target.y;
        });

        this.linkLabel.attr('transform', function (d) {
            if (d.target.x < d.source.x) {
                const bbox = this.getBBox();
                const rx = bbox.x + bbox.width / 2;
                const ry = bbox.y + bbox.height / 2;
                return 'rotate(180 ' + rx + ' ' + ry + ')';
            } else {
                return 'rotate(0)';
            }
        });

        this.graphSvg.call(d3.zoom()
            .scaleExtent([1 / 2, 8])
            .on("zoom", () => this[zoomed]()));
    }

    [zoomed]() {
        this.graphSvg.attr("transform", d3.event.transform);
    }

    renderCircleGraph(selector, radius) {
        this[init](selector);
        this[createElements]('circle');
        this.nodes.attr("cx", function (d) {
            return d.x
        })
            .attr("cy", function (d) {
                return d.y
            })
            .attr("r", radius);
        return this[render]('circle');
    }

    renderRectGraph(selector, height, width) {

        this[init](selector);
        this[createElements]('rect');
        rectWidth = width;
        rectHeight = height;

        this.nodes.attr('width', width)
            .attr('height', height)
            .attr("x", function (d) {
                return d.x
            })
            .attr("y", function (d) {
                return d.y
            });

        return this[render]('rect')
    }
}