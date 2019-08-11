import Nodes from "./nodes";
import Links from "./links";

export default class SvgGraph {

    graph;
    nodes;
    links;

    constructor(graph, simulation, nodes, links, linkLabel) {
        this.graph = graph;
        this.nodes = new Nodes(nodes, simulation);
        this.links = new Links(links, linkLabel, simulation)
    }

    setStyle(styles) {
        styles.forEach((style, index) => {
            this.graph.attr(style.name, style.value)
        })
    }


}