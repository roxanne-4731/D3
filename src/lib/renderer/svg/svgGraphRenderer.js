import Base from '../base';
import Graph from './svgGraph';
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
    #i = 0;

    constructor(data, height, width) {
        super(data, height, width);
        this.#root = d3.hierarchy(data);
        this.#nodesData = this.flatten(this.#root);
        this.#linksData = this.#root.links();

    }

    renderCircleGraph(selector, radius) {
        this[init](selector);
        this.update(radius);
        return new Graph(this.#graphSvg, this.#simulation, this.#nodes, this.#links, this.#linkLabel, this.data);
    }

    renderRectGraph(selector, height, width) {
        this[init](selector);
        this[createSvgElements]();
        this[createRectNode](width, height);
        return new Graph(this.#graphSvg, this.#simulation, this.#nodes, this.#links, this.#linkLabel, this.data);
    }

    [init](selector) {
        this.#graphSvg = d3.select(selector).append('svg')
            .attr("width", this.width)
            .attr("height", this.height)
            .call(d3.zoom()
                .scaleExtent([1 / 2, 8])
                .on("zoom", () => {
                    this.#graphSvg.attr("transform", d3.event.transform)
                }));
        this[simulateGraph]();
    }

    [simulateGraph]() {
        this.#simulation = d3.forceSimulation(this.#nodesData)
            .force('charge', d3.forceManyBody().strength(-500).distanceMax(200))
            .force("link", d3.forceLink(this.#linksData).id(function (d) {
                return d.id
            }).distance(100))
            .force('center', d3.forceCenter(this.width / 2, this.height / 2))
            .on("tick", () => {
                this[tickedAction]()
            });

    }

    [createSvgElements](linksData) {
        this[createMarker]();
        this[createLinks](linksData);
        this[createLinkPath](linksData);
        this[createLinkLabel](linksData);
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

    [createLinks](linksData) {
        this.#links = this.#graphSvg
            .selectAll(".link")
            .data(linksData, function (d) {
                return d.target.id
            });

        this.#links.append("title")
            .text(function (d) {
                return d.target.data.label;
            });
    }

    [createLinkPath](linksData) {

        this.#linkPath = this.#graphSvg.selectAll(".edgepath")
            .data(linksData, function (d) {
                return d.target.id
            });
    }

    [createLinkLabel](linksData) {

        this.#linkLabel = this.#graphSvg.selectAll(".edgelabel")
            .data(linksData, function (d) {
                return d.target.id
            });
    }

    [createNodes](nodesData) {
        this.#nodes = this.#graphSvg
            .selectAll('.nodeGroup')
            .data(nodesData, function (d) {
                return d.id
            });
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

    [createCircleNode](nodesData) {
        this[createNodes](nodesData);
        this.#nodes
            .select('text');
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

    update() {
        this.#nodesData = this.flatten(this.#root);
        this.#linksData = this.#root.links();

        this[createSvgElements](this.#linksData);
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
                return d.target.data.label;
            });

        this.#linkLabel = linkLabelEnter.merge(this.#linkLabel);

        this.#links.exit().remove();

        const linkEnter = this.#links
            .enter()
            .append('line')
            .attr('class', 'link')
            .style('stroke', '#000')
            .style('opacity', '0.2')
            .style('stroke-width', 2);


        this.#links = linkEnter.merge(this.#links);

        this[createCircleNode](this.#nodesData);
        this.#nodes.exit().remove();

        const nodeEnter = this.#nodes
            .enter()
            .append('g')
            .attr('class', 'nodeGroup')
            .on('click', (d) => this.click(d));

        nodeEnter.append('circle')
            .attr("r", 10)
            .style('text-anchor', function (d) {
                return d.children ? 'end' : 'start';
            })
            .append("title")
            .text(function (d) {
                return d.data.label;
            });

        nodeEnter.append("text")
            .attr("dy", function (d) {
                    return d.y;
                }
            )
            .attr('dx', function (d) {
                return d.x;
            })
            .text(function (d) {
                return d.data.label
            });

        this.#nodes = nodeEnter.merge(this.#nodes);

        this.#simulation.nodes(this.#nodesData);
        this.#simulation.force('link').links(this.#linksData);

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

    click(d) {
        if (!d3.event.defaultPrevented) {
            if (d.children) {
                d._children = d.children;
                d.children = null;
            } else {
                d.children = d._children;
                d._children = null;
            }
            this.update()
        }
    }

    flatten(root) {

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

}