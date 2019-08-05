import Base from '../base';
import Nodes from './nodes';
import Links from './links';
import Graph from './svgGraph';
import * as d3 from "d3";
import '../../../styles/graphStyle.css';

export class svgRenderer extends Base {

    graphSvg;
    simulation;

    constructor(data, height, width) {
        super(data, height, width);
    }

    renderCircleGraph(selector, radius) {
        const content = init(this, selector, 'circle');

        content[0].attr("cx", function (d) {
            return d.x
        })
            .attr("cy", function (d) {
                return d.y
            })
            .attr("r", radius);

        return render(this, 'circle', content)
    }

    renderRectGraph(selector, height, width) {
        const content = init(this, selector, 'rect');

        content[0].attr('width', width)
            .attr('height', height)
            .attr("x", function (d) {
                return d.x
            })
            .attr("y", function (d) {
                return d.y
            });

        return render(this, 'rect', content)
    }
}

function createNodes(that, type) {

    return that.graphSvg.selectAll(".node")
        .data(that.data.nodes)
        .enter().append(type)
        .attr("class", "nodes")
}

function createLinks(that) {
    return that.graphSvg.selectAll(".link")
        .data(that.data.links)
        .enter().append("line")
        .attr("class", "link");
}

function init(that, selector, type) {

    that.graphSvg = d3.select(selector).append('svg')
        .attr("width", that.width)
        .attr("height", that.height);
    simulateGraph(that);
    return [createNodes(that, type), createLinks(that)];
}

function render(that, type, content) {

    that.simulation.on("tick", () => {
        tickedAction(that, content[0], content[1], type)
    });

    return {
        graph: new Graph(that.graphSvg),
        nodes: new Nodes(content[0], that.simulation),
        links: new Links(content[1], that.simulation)
    };
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