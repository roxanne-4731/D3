import Base from '../base';
import Nodes from './nodes';
import Links from './links';
import Graph from './svgGraph';
import * as d3 from "d3";
import '../../../styles/graphStyle.css';

let rectHeight = 0;
let rectWidth = 0;

export class svgRenderer extends Base {

    graphSvg;
    simulation;
    text;

    constructor(data, height, width) {
        super(data, height, width);
    }

    renderCircleGraph(selector, radius) {

        const content = init(this, selector, 'circle');

        content[1].attr("cx", function (d) {
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
        rectWidth = width;
        rectHeight = height;

        content[1].attr('width', width)
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

    return that.graphSvg
        .append("g")
        .attr("class", "nodes")
        .selectAll(".node")
        .data(that.data.nodes)
        .enter()
        .append("g")
        .attr('class', 'nodeGroup')
        .append(type)
        .attr("class", "node")
}

function createLinks(that) {

    return that.graphSvg
        .append("g")
        .attr("class", "links")
        .selectAll(".link")
        .data(that.data.links)
        .enter()
        .append("g")
        .attr('class', 'linkGroup')
        .append("line")
        .attr("class", "link");
}

function createText(that) {
    that.text = that.graphSvg
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

function init(that, selector, type) {

    that.graphSvg = d3.select(selector).append('svg')
        .attr("width", that.width)
        .attr("height", that.height)
        .append("g");
    simulateGraph(that);
    const elements = [createLinks(that), createNodes(that, type)];
    createText(that);
    return elements;

}

function render(that, type, content) {

    that.simulation.on("tick", () => {
        tickedAction(that, content[1], content[0], type)
    });

    return {
        graph: new Graph(that.graphSvg),
        nodes: new Nodes(content[1], that.simulation),
        links: new Links(content[0], that.simulation)
    };
}

function simulateGraph(that) {
    that.simulation = d3.forceSimulation(that.data.nodes)
        .force("charge", d3.forceManyBody().strength(-20))
        .force("link", d3.forceLink(that.data.links).id(function (d) {
            return d.id
        }).distance(400))
        .force("x", d3.forceX(that.width / 2))
        .force("y", d3.forceY(that.height / 2))
        .force("collide", d3.forceCollide())
        .force('center', d3.forceCenter(that.width / 2, that.height / 2));
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

    that.text
        .attr("x", function (d) {
            return type === 'rect' ? d.x + rectWidth / 2 : d.x;
        })
        .attr("y", function (d) {
            return type === 'rect' ? d.y + rectHeight / 2 : d.y;
        });

    that.graphSvg.call(d3.zoom()
        .scaleExtent([1 / 2, 8])
        .on("zoom", () => zoomed(that)));

}

function zoomed(that) {
    that.graphSvg.attr("transform", d3.event.transform);
}