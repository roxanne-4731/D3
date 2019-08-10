import Base from '../base';
import Graph from './svgGraph';
import * as d3 from "d3";
import '../../../styles/graphStyle.css';


const createSvgElements = Symbol('createSvgElements');
const createNodes = Symbol('createNodes');
const createRectNode = Symbol('createRectNode');
const createCircleNode = Symbol('createCircleNode');
const createLinks = Symbol('createLinks');
const createLinkLabel = Symbol('createLinkLabel');
const createLinkPath = Symbol('createLinkPath');
const createMarker = Symbol('createMarker');
const init = Symbol('init');
const render = Symbol('render');
const simulateGraph = Symbol('simulateGraph');
const tickedAction = Symbol('tickedAction');
const zoomed = Symbol('zoomed');

export class svgRenderer extends Base {

    #graphSvg;
    #simulation;
    #nodes;
    #links;
    #linkLabel;
    #linkPath;

    constructor(data, height, width) {
        super(data, height, width);
    }

    renderCircleGraph(selector, radius) {
        const colors = d3.scaleOrdinal(d3.schemeCategory10);
        this[init](selector);
        this[createSvgElements]();
        this[createCircleNode](colors, radius);
        return this[render]('circle');
    }

    // renderRectGraph(selector, height, width) {
    //     const colors = d3.scaleOrdinal(d3.schemeCategory10);
    //     this[init](selector);
    //     this[createSvgElements]();
    //     this[createRectNode](colors, width, height);
    //     return this[render]('rect')
    // }

    [init](selector) {
        this.#graphSvg = d3.select(selector).append('svg')
            .attr("width", this.width)
            .attr("height", this.height);
        this[simulateGraph]();
    }

    [simulateGraph]() {
        this.#simulation = d3.forceSimulation(this.data.nodes)
            .force("charge", d3.forceManyBody().strength(-500))
            .force("link", d3.forceLink(this.data.links).id(function (d) {
                return d.id
            }).distance(200))
            .force('center', d3.forceCenter(this.width / 2, this.height / 2));

    }

    [createSvgElements]() {
        this[createMarker]();
        this[createLinks]();
        this[createLinkPath]();
        this[createLinkLabel]();
    }

    [createMarker]() {
        this.#graphSvg.append("defs").selectAll("marker")
            .data(["end"])
            .enter().append("marker")
            .attr("id", String)
            .attr("viewBox", "0 -5 10 10")
            .attr("refX", 13)
            .attr("refY", 0)
            .attr('xoverflow', 'visible')
            .attr("markerWidth", 13)
            .attr("markerHeight", 13)
            .attr("orient", "auto")
            .attr('fill', '#999')
            .append("svg:path")
            .attr("d", "M0,-5L10,0L0,5")
            .style('stroke', 'none');
    }

    [createLinks]() {
        this.#links = this.#graphSvg
            .selectAll(".link")
            .data(this.data.links)
            .enter()
            .append("line")
            .attr('class', 'link')
            .attr("marker-end", "url(#end)");

        this.#links.append("title")
            .text(function (d) {
                return d.type;
            });
    }

    [createLinkPath]() {

        this.#linkPath = this.#graphSvg.selectAll(".edgepath")
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
        this.#linkLabel = this.#graphSvg.selectAll(".edgelabel")
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

        this.#linkLabel.append('textPath')
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

    [createNodes]() {
        this.#nodes = this.#graphSvg
            .selectAll('.nodeGroup')
            .data(this.data.nodes)
            .enter()
            .append("g")
            .attr('class', 'nodeGroup');
    }

    [createRectNode](colors, width, height) {

        this.#nodes
            .append('rect')
            .style("fill", function (d, i) {
                return colors(i);
            }).attr('width', width)
            .attr('height', height)
            .attr("x", function (d) {
                return d.x
            })
            .attr("y", function (d) {
                return d.y
            });

        this.#nodes.append("title")
            .text(function (d) {
                return d.id;
            });

        this.#nodes.append("text")
            .attr("dy", function (d) {
                    return d.y + (height / 2);
                }
            )
            .attr('dx', function (d) {
                return d.x + (width / 2);
            })
            .text(function (d) {
                return d.label;
            })
            .attr('text-anchor', 'middle');
    }

    [createCircleNode](colors, radius) {
        this[createNodes]();

        this.#nodes
            .append('circle')
            .attr("cx", function (d) {
                return d.x;
            })
            .attr("cy", function (d) {
                return d.y;
            })
            .attr("r", radius)
            .style("fill", function (d, i) {
                return colors(i);
            })
            .style("stroke", function (d, i) {
                return colors(i);
            })
            .attr('stroke-opacity', 0.7)

            .style("stroke-width", 10);

        this.#nodes.append("title")
            .text(function (d) {
                return d.id;
            });

        this.#nodes
            .append("text")
            .attr("dy", function (d) {
                    return d.y;
                }
            )
            .attr('dx', function (d) {
                return d.x;
            })
            .text(function (d) {
                return d.label;
            })
            .attr('class', 'text')
            .attr('text-anchor', 'middle');

        this.#nodes
            .select('text')
            .call(this.crop, this.#nodes.select('circle'));

    }

    [render](type) {

        this.#simulation.on("tick", () => {
            this[tickedAction](type)
        });

        return new Graph(this.#graphSvg, this.#simulation, this.#nodes, this.#links, this.#linkLabel);
    }

    [tickedAction]() {
        this.#links
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

        this.#nodes
            .attr("transform", function (d) {
                return "translate(" + d.x + ", " + d.y + ")";
            });


        this.#linkPath.attr('d', function (d) {
            return 'M ' + d.source.x + ' ' + d.source.y + ' L ' + d.target.x + ' ' + d.target.y;
        });

        this.#linkLabel.attr('transform', function (d) {
            if (d.target.x < d.source.x) {
                const bbox = this.getBBox();
                const rx = bbox.x + bbox.width / 2;
                const ry = bbox.y + bbox.height / 2;
                return 'rotate(180 ' + rx + ' ' + ry + ')';
            } else {
                return 'rotate(0)';
            }
        });

        this.#graphSvg.call(d3.zoom()
            .scaleExtent([1 / 2, 8])
            .on("zoom", () => this[zoomed]()));
    }

    [zoomed]() {
        this.#graphSvg.attr("transform", d3.event.transform);
    }

    crop(text, circle) {
        const allTexts = [...text._groups[0]];
        let circleRadius = circle.node().getBBox().width;
        [text._groups[0]].forEach((item, index) => {
            item.forEach((innerItem) => {
                console.log(innerItem.getComputedTextLength(), circleRadius);
                if (innerItem.getComputedTextLength() > circleRadius) {
                    innerItem.innerHTML = innerItem.innerHTML.slice(0, -4) + "...";
                }
            })
        });
    };
}