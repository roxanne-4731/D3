import Base from '../base';
import Graph from './svgGraph';
import {CollapseEvent} from './collapseEventOnNodes';
import * as d3 from "d3";


const createSvgElements = Symbol('createSvgElements');
const createNodes = Symbol('createNodes');
const createRectNode = Symbol('createRectNode');
const createCircleNode = Symbol('createCircleNode');
const createLinks = Symbol('createLinks');
const createLinkLabel = Symbol('createLinkLabel');
const createLinkPath = Symbol('createLinkPath');
const createMarker = Symbol('createMarker');
const cropText = Symbol('cropText');
const flattenData = Symbol('flattenData');
const mapData = Symbol('mapData');
const init = Symbol('init');
const render = Symbol('render');
const simulateGraph = Symbol('simulateGraph');
const tickedAction = Symbol('tickedAction');


export class svgGraphRenderer extends Base {

    #graphSvg;
    #nodesData;
    #linksData;
    #simulation;
    #nodes;
    #links;
    #linkLabel;
    #linkPath;
    #root;
    #i;
    #collapse;
    #selector;

    constructor(data, height, width) {
        super(data, height, width);
        this.#root = d3.hierarchy(data);
    }

    renderCircleGraph(selector) {
        this[init](selector);
        this.#selector = selector;
        this[createSvgElements]();
        return new Graph(this.#graphSvg, this.#simulation, this.#root);
    }

    renderCircleGraphWithCollapseEvent(selector) {
        this.#collapse = new CollapseEvent(this.data);
        return this.#collapse.renderCircleGraph(selector, this.width, this.height);
    }

    renderRectGraph(selector, height, width) {
        this[init](selector);
        this[createSvgElements]();
        this[createRectNode](width, height);
        return this[render]('rect')
    }

    [init](selector) {
        this[mapData]();
        this.#graphSvg = d3.select(selector).append('svg')
            .attr("width", this.width)
            .attr("height", this.height)
            .call(d3.zoom().scaleExtent([1 / 2, 8]).on('zoom', (d) => {
                this.#graphSvg.attr('transform', d3.event.transform)
            }));
        this[simulateGraph]();
    }

    [simulateGraph]() {
        this.#simulation = d3.forceSimulation(this.#nodesData)
            .force('charge', d3.forceManyBody().strength(-500).distanceMax(250))
            .force("link", d3.forceLink(this.#linksData).id(function (d) {
                return d.data.id
            }).distance(100))
            .force('center', d3.forceCenter(this.width / 2, this.height / 2))
            .on("tick", () => {
                this[tickedAction]()
            });
    }

    [createSvgElements]() {
        this[createMarker]();
        this[createLinks]();
        this[createLinkPath]();
        this[createLinkLabel]();
        this[createCircleNode]();
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
            .attr("markerWidth", 8)
            .attr("markerHeight", 8)
            .attr("orient", "auto")
            .attr('fill', '#999')
            .append("svg:path")
            .attr("d", "M0,-5L10,0L0,5")
            .style('stroke', 'none');
    }

    [createLinks]() {
        this.#links = this.#graphSvg
            .selectAll(".link")
            .data(this.#linksData, function (d) {
                return d.target.id
            })
            .enter()
            .append("line")
            .attr('class', 'link')
            .attr('stroke', '#000');
    }

    [createLinkPath]() {
        this.#linkPath = this.#graphSvg.selectAll(".edgepath")
            .data(this.#linksData, function (d) {
                return d.target.id
            })
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
            .data(this.#linksData, function (d) {
                return d.target.data.id
            })
            .enter()
            .append('text')
            .attr('class', 'edgelabel')
            .attr('id', function (d, i) {
                return 'edgelabel' + i
            });

        this.#linkLabel.append('textPath')
            .attr('xlink:href', function (d, i) {
                return '#edgepath' + i
            })
            .attr("startOffset", "50%")
            .text(function (d) {
                return d.target.data.type
            });
    }

    [createNodes]() {
        this.#nodes = this.#graphSvg
            .selectAll('.nodeGroup')
            .data(this.#nodesData, function (d) {
                return d.data.id
            })
            .enter()
            .append("g")
            .attr('class', 'nodeGroup');
    }

    [createRectNode](width, height) {

        this.#nodes
            .append('rect')
            .attr('width', width)
            .attr('height', height)
            .attr("x", function (d) {
                return d.x
            })
            .attr("y", function (d) {
                return d.y
            });

        this.#nodes.append("title")
            .text(function (d) {
                return d.data.label;
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
                return d.data.label;
            });

    }

    [createCircleNode]() {
        this[createNodes]();

        this.#nodes
            .append('circle')
            .attr("r", function (d) {
                return Math.sqrt(d.data.size) / 10 || 4.5;
            });

        this.#nodes.append("title")
            .text(function (d) {
                return d.data.id;
            });

        this.#nodes
            .append("text")
            .text(function (d) {
                return d.data.label;
            }).call(this[cropText], this.#nodes.select('circle'));
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
            .attr('transform', function (d) {
                return `translate(${d.x}, ${d.y})`
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
    }

    [cropText](text, circle) {
        let circleRadius = circle.node().getBBox().width;
        [text._groups[0]].forEach((item, index) => {
            item.forEach((innerItem) => {
                const sub = innerItem.getComputedTextLength() - circleRadius;
                if (sub > 0) {
                    const charCount = Math.ceil(sub / 15) + 5;
                    innerItem.innerHTML = innerItem.innerHTML.slice(0, charCount * -1) + "...";
                }
            })
        });
    }

    [flattenData](root) {
        const nodes = [];
        const that = this;

        function recurse(node) {
            if (node.children) node.children.forEach(recurse);
            if (!node.id) node.id = ++that.#i;
            else ++that.#i;
            nodes.push(node)
        }

        recurse(root);
        return nodes
    }


    [mapData]() {
        this.#nodesData = this[flattenData](this.#root);
        this.#linksData = this.#root.links();
    }
}