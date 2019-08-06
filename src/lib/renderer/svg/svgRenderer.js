import Base from '../base';
import Nodes from './nodes';
import Links from './links';
import Graph from './svgGraph';
import * as d3 from "d3";
import '../../../styles/graphStyle.css';

let rectHeight = 0;
let rectWidth = 0;

// const privateMethod = Symbol('createElements');

export class svgRenderer extends Base {

    graphSvg;
    simulation;

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

// function createElements(that, type) {
//     createNodes(that, type);
//     createNodeLabel(that);
//     createMarker(that);
//     createLinks(that);
//     createLinkLabal(that);
//     createLinkPath(that);
// }

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

    createMarker(that);
    return that.graphSvg
        .append("g")
        .attr("class", "links")
        .selectAll(".link")
        .data(that.data.links)
        .enter()
        .append("g")
        .attr('class', 'linkGroup')
        .append("line")
        .attr("class", "link")
        .attr("marker-end", "url(#end)");
}

function createLinkLabel(that) {
    return that.graphSvg.selectAll(".edgepath")
        .data(that.data.links)
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

function createLinkPath(that) {

    const linkLabels = that.graphSvg.selectAll(".edgelabel")
        .data(that.data.links)
        .enter()
        .append('text')
        .attr('class', 'edgelabel')
        .attr('id', function (d, i) {
            return 'edgelabel' + i
        })
        .attr('font-size', 10)
        .attr('fill', '#aaa')
        .attr('pointer-events', 'none');

    linkLabels.append('textPath')
        .attr('xlink:href', function (d, i) {
            return '#edgepath' + i
        })
        .attr("text-anchor", "middle")
        .attr("pointer-events", "none")
        .attr("startOffset", "50%")
        .text(function (d) {
            return d.type
        });

    return linkLabels;

}

function createNodeLabel(that) {
    return that.graphSvg
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

function createMarker(that) {
    that.graphSvg.append("svg:defs").selectAll("marker")
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

function init(that, selector, type) {

    that.graphSvg = d3.select(selector).append('svg')
        .attr("width", that.width)
        .attr("height", that.height)
        .append("g");
    simulateGraph(that);

    return [createLinks(that), createNodes(that, type), createNodeLabel(that), createLinkLabel(that), createLinkPath(that)];

}

function render(that, type, content) {

    that.simulation.on("tick", () => {
        tickedAction(that, type, content[1], content[0], content[2], content[3], content[4])
    });

    return {
        graph: new Graph(that.graphSvg),
        nodes: new Nodes(content[1], content, that.simulation),
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

function tickedAction(that, type, node, link, nodeLabel, linkPaths, linkLabels) {

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

    nodeLabel
        .attr("x", function (d) {
            return type === 'rect' ? d.x + rectWidth / 2 : d.x;
        })
        .attr("y", function (d) {
            return type === 'rect' ? d.y + rectHeight / 2 : d.y;
        });

    linkPaths.attr('d', function (d) {
        return 'M ' + d.source.x + ' ' + d.source.y + ' L ' + d.target.x + ' ' + d.target.y;
    });

    linkLabels.attr('transform', function (d) {
        if (d.target.x < d.source.x) {
            const bbox = this.getBBox();
            const rx = bbox.x + bbox.width / 2;
            const ry = bbox.y + bbox.height / 2;
            return 'rotate(180 ' + rx + ' ' + ry + ')';
        } else {
            return 'rotate(0)';
        }
    });

    that.graphSvg.call(d3.zoom()
        .scaleExtent([1 / 2, 8])
        .on("zoom", () => zoomed(that)));

}

function zoomed(that) {
    that.graphSvg.attr("transform", d3.event.transform);
}