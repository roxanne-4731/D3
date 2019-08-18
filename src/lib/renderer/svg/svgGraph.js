import Nodes from "./nodes";
import Links from "./links";

export default class SvgGraph {

    graph;
    nodes;
    links;
    simulation;

    constructor(graph, simulation) {
        this.graph = graph;
        this.simulation = simulation;
        this.nodes = new Nodes(simulation, graph);
        this.links = new Links(graph, simulation)
    }

    setStyle(styles) {
        styles.forEach((style, index) => {
            this.graph.attr(style.name, style.value)
        })
    }

    setGraph(graph) {
        this.nodes.setNodes(graph);
        this.links.setLinks(graph);
    }
}