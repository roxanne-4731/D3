import Base from '../base-graph';
import nodes from './node';
import links from './links';
import * as d3 from "d3";
import {custom} from "../../../../example/assets/json/data";

export class Svg extends Base {

    graphSvg;
    simulation;
    node;
    link;
    svgStyle;

    constructor(data, height, width) {
        super(data, height, width);
    }

    collapsibleNode() {

    }

    dragAction() {
        super.dragAction();
    }

    getGraphSvg() {

    }

    init(selector) {
        this.graphSvg = d3.select(selector).append('svg')
            .attr("width", this.width)
            .attr("height", this.height);
        this.simulation = d3.forceSimulation(this.data.nodes)
            .force("charge", d3.forceManyBody().strength(-20))
            .force("link", d3.forceLink(this.data.links).id(function (d) {
                return d.id
            }).distance(200))
            .force("x", d3.forceX(this.width / 2))
            .force("y", d3.forceY(this.height / 2));
    }

    initCircleGraph(selector, radius) {
        this.init(selector);
        // this.simulateGraph();
         this.link = this.graphSvg.selectAll(".link")
            .data(custom.links)
            .enter().append("line")
            .attr("class", "link")
            .attr('stroke', '#E5E5E5');

        this.node = this.graphSvg.selectAll(".node")
            .data(custom.nodes)
            .enter().append("circle")
            .attr("class", "node")
            .attr("cx", function (d) {
                return d.x
            })
            .attr("cy", function (d) {
                return d.y
            })
            .attr("r", 4);

        this.simulation.on("tick", () => {
            const that = this;
            that.link
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
            that.node
                .attr("cx", function (d) {
                    return d.x;
                })
                .attr("cy", function (d) {
                    return d.y;
                });
        });
    }

    initRectGraph(height, width) {
        super.initRectGraph(height, width);
    }

    setSvgStyle() {

    }

    setLinksStyle() {
        super.setLinksStyle();
    }

    setNodesStyle() {
        super.setNodesStyle();
    }

    tickedAction() {
        this.link
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
        this.node
            .attr("cx", function (d) {
                return d.x;
            })
            .attr("cy", function (d) {
                return d.y;
            });
    }

    zoomAction() {
        super.zoomAction();
    }

    simulateGraph() {
        this.simulation = d3.forceSimulation(this.data.nodes)
            .force("charge", d3.forceManyBody().strength(-20))
            .force("link", d3.forceLink(this.data.links).id(function (d) {
                return d.id
            }).distance(200))
            .force("x", d3.forceX(this.width / 2))
            .force("y", d3.forceY(this.height / 2));
    }
}

// export default new SVG();