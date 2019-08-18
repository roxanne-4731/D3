import Base from '../base';
import Graph from './svgGraph';
import * as d3 from "d3";


const createSvgElements = Symbol('createSvgElements');
const updatingNodes = Symbol('updatingNodes');
const createRectNode = Symbol('createRectNode');
const createCircleNode = Symbol('createCircleNode');
const updatingLinks = Symbol('updatingLinks');
const updatingLinkLabel = Symbol('updatingLinkLabel');
const updatingLinkPath = Symbol('updatingLinkPath');
const createMarker = Symbol('createMarker');
const clickOnNodes = Symbol('clickOnNodes');
const cropText = Symbol('cropText');
const flattenData = Symbol('flattenData');
const updateData = Symbol('updateData');
const updateSimulation = Symbol('updateSimulation');
const init = Symbol('init');
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
    graphObject;
    #i = 0;

    constructor(data, height, width) {
        super(data, height, width);
        this.#root = d3.hierarchy(data);
    }

    renderCircleGraph(selector) {
        this[init](selector);
        this[updateSimulation]();
        this.graphObject = new Graph(this.#graphSvg, this.#simulation);
        this.graphObject.setGraph(this.#graphSvg);
        return this.graphObject;
    }

    renderRectGraph(selector, height, width) {
        this[init](selector);
        this[createSvgElements]();
        this[createRectNode](width, height);
        return new Graph(this.#graphSvg, this.#simulation);
    }

    [init](selector) {
        this.#graphSvg = d3.select(selector).append('svg')
            .attr("width", this.width)
            .attr("height", this.height)
            .call(d3.zoom().scaleExtent([1 / 2, 8]).on('zoom', (d) => {
                this.#graphSvg.attr('transform', d3.event.transform)
            }));
        this[simulateGraph]();
    }

    [updateSimulation]() {

        this[updateData]();

        this[createSvgElements]();

        this.#simulation.nodes(this.#nodesData);
        this.#simulation.force('link').links(this.#linksData);

        this.graphObject ? this.graphObject.setGraph(this.#graphSvg) : console.log('fist initial');
    }

    [simulateGraph]() {
        this.#simulation = d3.forceSimulation(this.#nodesData)
            .force('charge', d3.forceManyBody().strength(-500).distanceMax(250))
            .force("link", d3.forceLink(this.#linksData).id(function (d) {
                return d.id
            }).distance(100))
            .force('center', d3.forceCenter(this.width / 2, this.height / 2))
            .on("tick", () => {
                this[tickedAction]()
            });

    }

    [createSvgElements]() {
        this[updatingLinks]();
        this[updatingLinkPath]();
        this[updatingLinkLabel]();
        this[updatingNodes]();
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
            .attr("markerWidth", 5)
            .attr("markerHeight", 5)
            .attr("orient", "auto")
            .attr('fill', '#999')
            .append("svg:path")
            .attr("d", "M0,-5L10,0L0,5")
            .style('stroke', 'none');
    }

    [updatingLinks]() {
        this.#links = this.#graphSvg
            .selectAll(".link")
            .data(this.#linksData, function (d) {
                return d.target.id
            });

        this.#links.exit().remove();

        const linkEnter = this.#links
            .enter()
            .append('line')
            .attr('class', 'link')
            .attr('stroke', '#e5e5e5');

        this.#links = linkEnter.merge(this.#links);

    }

    [updatingLinkPath]() {

        this.#linkPath = this.#graphSvg.selectAll(".edgepath")
            .data(this.#linksData, function (d) {
                return d.target.id
            });

        this.#linkPath.exit().remove();

        const linkPathEnter = this.#linkPath
            .enter()
            .append('path')
            .attr('class', 'edgepath')
            .attr('id', function (d, i) {
                return 'edgepath' + i
            })
            .attr('fill-opacity', 0)
            .attr('stroke-opacity', 0)
            .attr('pointer-events', 'none');

        this.#linkPath = linkPathEnter.merge(this.#linkPath);
    }

    [updatingLinkLabel]() {

        this.#linkLabel = this.#graphSvg.selectAll(".edgelabel")
            .data(this.#linksData, function (d) {
                return d.target.id
            });
        this.#linkLabel.exit().remove();

        const linkLabelEnter = this.#linkLabel
            .enter()
            .append('text')
            .attr('class', 'edgelabel')
            .attr('id', function (d, i) {
                return 'edgelabel' + i
            });

        linkLabelEnter.append('textPath')
            .attr('xlink:href', function (d, i) {
                return '#edgepath' + i
            })
            .attr("startOffset", "50%")
            .text(function (d) {
                return d.target.data.type;
            });

        this.#linkLabel = linkLabelEnter.merge(this.#linkLabel);
    }

    [updatingNodes]() {
        this.#nodes = this.#graphSvg
            .selectAll('.nodeGroup')
            .data(this.#nodesData, function (d) {
                return d.id
            });

        this.#nodes.exit().remove();

        const nodeEnter = this.#nodes
            .enter()
            .append('g')
            .attr('class', 'nodeGroup')
            .on('click', (d) => this[clickOnNodes](d));


        nodeEnter.append('circle')
            .attr("r", function (d) {
                return Math.sqrt(d.data.size) / 10 || 4.5;
            })
            .append("title")
            .text(function (d) {
                return d.data.label;
            });

        nodeEnter.append("text")
            .attr('text-anchor', 'middle')
            .text(function (d) {
                return d.data.label
            });

        this.#nodes = nodeEnter.merge(this.#nodes);
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

    // [createCircleNode](nodesData) {
    //     this[updatingNodes](nodesData);
    //     this.#nodes
    //         .select('text');
    // }

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

    [clickOnNodes](d) {
        if (!d3.event.defaultPrevented) {
            if (d.children) {
                d._children = d.children;
                d.children = null;
            } else {
                d.children = d._children;
                d._children = null;
            }
            this[updateSimulation]()
        }
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


    [updateData]() {
        this.#nodesData = this[flattenData](this.#root);
        this.#linksData = this.#root.links();
    }

}