import Nodes from "./nodes";
import Links from "./links";

export default class SvgGraph {

    svgGraph;
    nodes;
    links;

    constructor(svgGraph, simulation, nodes, links, linkLabel) {
        this.svgGraph = svgGraph;
        this.nodes = new Nodes(nodes, simulation);
        this.links = new Links(links, linkLabel, simulation)
    }

    setStyle() {
        console.log(this.svgGraph);
    }


}