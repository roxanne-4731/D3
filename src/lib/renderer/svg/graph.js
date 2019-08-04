import Base from '../base-graph';
import Nodes from './node';
import * as d3 from "d3";
import {custom} from "../../../../example/assets/json/data";
import '../../../styles/nodesSvgGraph.css';

export class Svg extends Base {

    graphSvg;
    simulation;
    node;
    link;

    constructor(data, height, width) {
        super(data, height, width);
    }

    dragAction() {
        super.dragAction();
    }

    init(selector) {
        this.graphSvg = d3.select(selector).append('svg')
            .attr("width", this.width)
            .attr("height", this.height);
        this.simulateGraph();
    }

    initCircleGraph(selector, radius) {

        this.init(selector);
        this.link = this.graphSvg.selectAll(".link")
            .data(custom.links)
            .enter().append("line")
            .attr("class", "link")
            .attr('stroke', '#E5E5E5');

        this.node = this.graphSvg.selectAll(".node")
            .data(custom.nodes)
            .enter().append("circle")
            .attr("class", "nodes")
            .attr("cx", function (d) {
                return d.x
            })
            .attr("cy", function (d) {
                return d.y
            })
            .attr("r", radius);

        this.simulation.on("tick", () => {
            this.tickedAction()
        });

        this.graphSvg.call(d3.zoom()
            .scaleExtent([1 / 2, 8])
            .on("zoom", () => zoomed(this)));

        return new Nodes(this.node, this.simulation);
    }

    initRectGraph(height, width) {
        super.initRectGraph(height, width);
    }

    setSvgStyle() {

    }

    tickedAction() {
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

function zoomed(that) {
    that.node.attr("transform", d3.event.transform);
    that.link.attr("transform", d3.event.transform);
}
