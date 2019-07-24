import * as d3 from "d3";

export default class Canvas {
    radius;
    height = window.innerHeight;
    graphWidth = window.innerWidth;
    graphCanvas;
    context;
    simulation;
    transform;
    data;

    constructor(data, target, radius) {
        this.data = data;
        this.radius = radius;
        this.graphCanvas = d3.select(target).append('canvas')
            .attr('width', this.graphWidth + 'px')
            .attr('height', this.height + 'px')
            .node();
        this.context = this.graphCanvas.getContext('2d');
        this.simulation = d3.forceSimulation()
            .force("center", d3.forceCenter(this.graphWidth / 2, this.height / 2))
            .force("x", d3.forceX(this.graphWidth / 2).strength(0.1))
            .force("y", d3.forceY(this.height / 2).strength(0.1))
            .force("charge", d3.forceManyBody().strength(-50))
            .force("link", d3.forceLink().strength(1).id(function (d) {
                return d.id;
            }))
            .alphaTarget(0)
            .alphaDecay(0.05);
        this.transform = d3.zoomIdentity;
        this.init();
    }
    zoom() {
        d3.select(this.graphCanvas).call(d3.zoom().scaleExtent([1 / 10, 8]).on("zoom", () => {
            this.transform = d3.event.transform;
            this.simulationUpdate();
        }));
    }
    drag() {
        d3.select(this.graphCanvas)
            .call(d3.drag().subject(this.dragsubject())).on("start", this.dragstarted()).on("drag", this.dragged()).on("end", this.dragended());
    }
    dragsubject() {
        let i,
            x = this.transform.invertX(d3.event.x),
            y = this.transform.invertY(d3.event.y),
            dx,
            dy;
        for (i = this.data.nodes.length - 1; i >= 0; --i) {
            let node = this.data.nodes[i];
            dx = x - node.x;
            dy = y - node.y;

            if (dx * dx + dy * dy < this.radius * this.radius) {

                node.x = this.transform.applyX(node.x);
                node.y = this.transform.applyY(node.y);

                return node;
            }
        }
    }
    dragstarted() {
        if (!d3.event.active) this.simulation.alphaTarget(0.3).restart();
        d3.event.subject.fx = this.transform.invertX(d3.event.x);
        d3.event.subject.fy = this.transform.invertY(d3.event.y);
    }
    init() {
        this.simulation.nodes(this.data.nodes)
            .on("tick", this.simulationUpdate());
        this.simulation.force("link")
            .links(this.data.edges);
    }
    dragged() {
        d3.event.subject.fx = this.transform.invertX(d3.event.x);
        d3.event.subject.fy = this.transform.invertY(d3.event.y);

    }
    dragended() {
        if (!d3.event.active) this.simulation.alphaTarget(0);
        d3.event.subject.fx = null;
        d3.event.subject.fy = null;
    }
    simulationUpdate() {
        this.context.save();

        this.context.clearRect(0, 0, this.graphWidth, this.height);
        this.context.translate(this.transform.x, this.transform.y);
        this.context.scale(this.transform.k, this.transform.k);
        debugger;
        this.data.edges.forEach( (d) => {
            this.context.beginPath();
            this.context.moveTo(d.source.x, d.source.y);
            this.context.lineTo(d.target.x, d.target.y);
            this.context.stroke();
        });
        // Draw the nodes
        this.data.nodes.forEach((d, i) => {

            this.context.beginPath();
            this.context.arc(d.x, d.y, this.radius, 0, 2 * Math.PI, true);
            this.context.fillStyle = d.col ? "red" : "black";
            this.context.fill();
        });
        this.context.restore();
//        transform = d3.zoomIdentity;
    }
}