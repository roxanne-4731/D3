import Nodes from "./nodes";
import Links from "./links";

export default class SvgGraph {

    graph;
    nodes;
    links;

    constructor(graph, simulation, nodes, links, linkLabel, data) {
        this.graph = graph;
        this.nodes = new Nodes(nodes, simulation, graph, data);
        this.links = new Links(links, linkLabel, simulation)
    }

    setStyle(styles) {
        styles.forEach((style, index) => {
            this.graph.attr(style.name, style.value)
        })
    }


}